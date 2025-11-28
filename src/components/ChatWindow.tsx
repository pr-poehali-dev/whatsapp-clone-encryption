import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  text: string;
  time: string;
  sent: boolean;
  delivered?: boolean;
  read?: boolean;
}

interface ChatWindowProps {
  chat?: {
    id: number;
    name: string;
    avatar: string;
    online?: boolean;
  };
  messages: Message[];
}

export default function ChatWindow({ chat, messages }: ChatWindowProps) {
  const [messageText, setMessageText] = useState('');

  if (!chat) {
    return (
      <div className="flex items-center justify-center h-full bg-muted/20">
        <div className="text-center">
          <Icon name="MessageCircle" size={64} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">Выберите чат</h3>
          <p className="text-muted-foreground">Начните общение с друзьями и коллегами</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-3 bg-background border-b border-border">
        <Avatar>
          <AvatarImage src={chat.avatar} alt={chat.name} />
          <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold">{chat.name}</h3>
          <p className="text-xs text-muted-foreground">
            {chat.online ? 'в сети' : 'был(а) недавно'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Icon name="Video" size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="Phone" size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="MoreVertical" size={20} />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4 bg-[hsl(var(--whatsapp-bg))]">
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  message.sent
                    ? 'bg-[hsl(var(--whatsapp-light-green))] text-foreground'
                    : 'bg-background text-foreground'
                }`}
              >
                <p className="text-sm break-words">{message.text}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-xs text-muted-foreground">{message.time}</span>
                  {message.sent && (
                    <Icon
                      name={message.read ? 'CheckCheck' : 'Check'}
                      size={14}
                      className={message.read ? 'text-primary' : 'text-muted-foreground'}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-3 bg-background border-t border-border">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Icon name="Smile" size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="Paperclip" size={20} />
          </Button>
          <Input
            placeholder="Введите сообщение"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="flex-1"
          />
          <Button size="icon" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Icon name="Send" size={20} />
          </Button>
        </div>
        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
          <Icon name="Lock" size={12} />
          <span>Сообщения защищены сквозным шифрованием</span>
        </div>
      </div>
    </div>
  );
}
