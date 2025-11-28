import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для работы с сообщениями мессенджера
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с request_id
    Returns: HTTP response с сообщениями или статусом отправки
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'DATABASE_URL not configured'})
        }
    
    conn = psycopg2.connect(dsn)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    if method == 'GET':
        params = event.get('queryStringParameters', {})
        chat_id = params.get('chat_id')
        
        if not chat_id:
            cursor.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'chat_id is required'})
            }
        
        cursor.execute('''
            SELECT m.id, m.text, m.delivered, m.read, m.created_at,
                   u.id as sender_id, u.name as sender_name
            FROM messages m
            JOIN users u ON m.sender_id = u.id
            WHERE m.chat_id = %s
            ORDER BY m.created_at ASC
        ''', (chat_id,))
        
        messages = cursor.fetchall()
        cursor.close()
        conn.close()
        
        result = []
        for msg in messages:
            result.append({
                'id': msg['id'],
                'text': msg['text'],
                'time': msg['created_at'].strftime('%H:%M'),
                'sent': True,
                'delivered': msg['delivered'],
                'read': msg['read'],
                'sender_id': msg['sender_id'],
                'sender_name': msg['sender_name']
            })
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'messages': result})
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        chat_id = body_data.get('chat_id')
        sender_id = body_data.get('sender_id', 2)
        text = body_data.get('text', '')
        
        if not chat_id or not text:
            cursor.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'chat_id and text are required'})
            }
        
        cursor.execute('''
            INSERT INTO messages (chat_id, sender_id, text, delivered, read)
            VALUES (%s, %s, %s, true, false)
            RETURNING id, created_at
        ''', (chat_id, sender_id, text))
        
        result = cursor.fetchone()
        conn.commit()
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'id': result['id'],
                'created_at': result['created_at'].isoformat()
            })
        }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({'error': 'Method not allowed'})
    }
