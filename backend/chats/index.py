import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для получения списка чатов пользователя
    Args: event - dict с httpMethod, queryStringParameters
          context - объект с request_id
    Returns: HTTP response со списком чатов
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'DATABASE_URL not configured'})
        }
    
    params = event.get('queryStringParameters', {})
    user_id = params.get('user_id', '1')
    
    conn = psycopg2.connect(dsn)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    cursor.execute('''
        SELECT DISTINCT c.id, c.name, c.avatar, c.is_group, c.encrypted,
               (SELECT m.text FROM messages m WHERE m.chat_id = c.id ORDER BY m.created_at DESC LIMIT 1) as last_message,
               (SELECT m.created_at FROM messages m WHERE m.chat_id = c.id ORDER BY m.created_at DESC LIMIT 1) as last_message_time,
               (SELECT COUNT(*) FROM messages m WHERE m.chat_id = c.id AND m.read = false AND m.sender_id != %s) as unread_count
        FROM chats c
        JOIN chat_participants cp ON c.id = cp.chat_id
        WHERE cp.user_id = %s
        ORDER BY last_message_time DESC NULLS LAST
    ''', (user_id, user_id))
    
    chats = cursor.fetchall()
    cursor.close()
    conn.close()
    
    result = []
    for chat in chats:
        time_str = 'Никогда'
        if chat['last_message_time']:
            time_str = chat['last_message_time'].strftime('%H:%M')
        
        result.append({
            'id': chat['id'],
            'name': chat['name'],
            'avatar': chat['avatar'],
            'lastMessage': chat['last_message'] or 'Нет сообщений',
            'time': time_str,
            'unread': chat['unread_count'],
            'encrypted': chat['encrypted'],
            'pinned': False,
            'online': False
        })
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({'chats': result})
    }
