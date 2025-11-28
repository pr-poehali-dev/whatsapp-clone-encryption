import funcUrls from '../../backend/func2url.json';

const CHATS_URL = funcUrls.chats;
const MESSAGES_URL = funcUrls.messages;

export interface Message {
  id: number;
  text: string;
  time: string;
  sent: boolean;
  delivered?: boolean;
  read?: boolean;
  sender_id: number;
  sender_name: string;
}

export interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: number;
  encrypted?: boolean;
  pinned?: boolean;
  online?: boolean;
}

export async function getChats(userId: number = 1): Promise<Chat[]> {
  const response = await fetch(`${CHATS_URL}?user_id=${userId}`);
  const data = await response.json();
  return data.chats || [];
}

export async function getMessages(chatId: number): Promise<Message[]> {
  const response = await fetch(`${MESSAGES_URL}?chat_id=${chatId}`);
  const data = await response.json();
  return data.messages || [];
}

export async function sendMessage(
  chatId: number,
  text: string,
  senderId: number = 2
): Promise<{ id: number; created_at: string }> {
  const response = await fetch(MESSAGES_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      sender_id: senderId,
      text,
    }),
  });
  return response.json();
}
