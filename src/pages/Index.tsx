import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import SearchBar from '@/components/SearchBar';
import ChatList from '@/components/ChatList';
import ChatWindow from '@/components/ChatWindow';
import StatusView from '@/components/StatusView';
import CallsView from '@/components/CallsView';
import GroupsView from '@/components/GroupsView';
import SettingsView from '@/components/SettingsView';
import ProfileView from '@/components/ProfileView';
import { getChats, getMessages, sendMessage, Chat, Message } from '@/lib/api';

const Index = () => {
  const [activeTab, setActiveTab] = useState('chats');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChatId, setSelectedChatId] = useState<number | undefined>(1);
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChats();
  }, []);

  useEffect(() => {
    if (selectedChatId) {
      loadMessages(selectedChatId);
    }
  }, [selectedChatId]);

  const loadChats = async () => {
    try {
      const data = await getChats(1);
      setChats(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading chats:', error);
      setLoading(false);
    }
  };

  const loadMessages = async (chatId: number) => {
    try {
      const data = await getMessages(chatId);
      const formattedMessages = data.map((msg) => ({
        ...msg,
        sent: msg.sender_id === 2,
      }));
      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!selectedChatId) return;

    try {
      await sendMessage(selectedChatId, text, 2);
      await loadMessages(selectedChatId);
      await loadChats();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const mockChats = [
    {
      id: 1,
      name: 'Анна Смирнова',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
      lastMessage: 'Привет! Как дела?',
      time: '10:30',
      unread: 2,
      online: true,
      encrypted: true,
    },
    {
      id: 2,
      name: 'Команда разработки',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Team',
      lastMessage: 'Встреча в 15:00',
      time: '09:45',
      pinned: true,
      encrypted: true,
    },
    {
      id: 3,
      name: 'Михаил Петров',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mikhail',
      lastMessage: 'Отправил файлы',
      time: 'Вчера',
      encrypted: true,
    },
    {
      id: 4,
      name: 'Елена Васильева',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
      lastMessage: 'Спасибо!',
      time: 'Вчера',
      online: true,
      encrypted: true,
    },
  ];

  const mockMessages = [
    { id: 1, text: 'Привет! Как дела?', time: '10:25', sent: false },
    { id: 2, text: 'Отлично, спасибо! А у тебя?', time: '10:26', sent: true, delivered: true, read: true },
    { id: 3, text: 'Все хорошо! Работаю над проектом', time: '10:28', sent: false },
    { id: 4, text: 'Звучит интересно! Расскажешь подробнее?', time: '10:30', sent: true, delivered: true },
  ];

  const mockStatuses = [
    {
      id: 1,
      name: 'Мария Иванова',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
      time: '5 минут назад',
    },
    {
      id: 2,
      name: 'Дмитрий Козлов',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry',
      time: '30 минут назад',
    },
  ];

  const mockCalls = [
    {
      id: 1,
      name: 'Анна Смирнова',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
      time: 'Сегодня, 14:20',
      type: 'incoming' as const,
      callType: 'video' as const,
    },
    {
      id: 2,
      name: 'Михаил Петров',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mikhail',
      time: 'Вчера, 18:45',
      type: 'outgoing' as const,
      callType: 'voice' as const,
    },
    {
      id: 3,
      name: 'Елена Васильева',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
      time: 'Вчера, 12:10',
      type: 'missed' as const,
      callType: 'video' as const,
    },
  ];

  const mockGroups = [
    {
      id: 1,
      name: 'Команда разработки',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DevTeam',
      members: 12,
      lastMessage: 'Михаил: Встреча перенесена',
      time: '11:30',
      unread: 5,
    },
    {
      id: 2,
      name: 'Семья',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Family',
      members: 6,
      lastMessage: 'Мама: Не забудьте про ужин',
      time: 'Вчера',
    },
  ];

  const displayChats = chats.length > 0 ? chats : mockChats;
  const selectedChat = displayChats.find((chat) => chat.id === selectedChatId);

  const renderContent = () => {
    switch (activeTab) {
      case 'chats':
        return (
          <div className="flex h-full">
            <div className="w-[380px] border-r border-border flex flex-col">
              <div className="p-4 border-b border-border">
                <h2 className="text-2xl font-bold">Чаты</h2>
              </div>
              <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Поиск чатов" />
              <ChatList
                chats={displayChats}
                onChatSelect={setSelectedChatId}
                selectedChatId={selectedChatId}
              />
            </div>
            <div className="flex-1">
              <ChatWindow 
                chat={selectedChat} 
                messages={messages.length > 0 ? messages : mockMessages}
                onSendMessage={handleSendMessage}
              />
            </div>
          </div>
        );
      case 'status':
        return (
          <div className="w-[380px] border-r border-border">
            <StatusView statuses={mockStatuses} />
          </div>
        );
      case 'calls':
        return (
          <div className="w-[380px] border-r border-border">
            <CallsView calls={mockCalls} />
          </div>
        );
      case 'groups':
        return (
          <div className="w-[380px] border-r border-border">
            <GroupsView groups={mockGroups} />
          </div>
        );
      case 'settings':
        return (
          <div className="w-[480px] border-r border-border">
            <SettingsView />
          </div>
        );
      case 'profile':
        return (
          <div className="w-[480px] border-r border-border">
            <ProfileView />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  );
};

export default Index;