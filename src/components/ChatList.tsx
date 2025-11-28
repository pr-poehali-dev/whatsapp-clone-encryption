import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: number;
  online?: boolean;
  pinned?: boolean;
  encrypted?: boolean;
}

interface ChatListProps {
  chats: Chat[];
  onChatSelect: (chatId: number) => void;
  selectedChatId?: number;
}

export default function ChatList({ chats, onChatSelect, selectedChatId }: ChatListProps) {
  return (
    <ScrollArea className="h-full">
      <div className="divide-y divide-border">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat.id)}
            className={`flex items-center gap-3 p-3 hover:bg-accent cursor-pointer transition-colors ${
              selectedChatId === chat.id ? 'bg-accent' : ''
            }`}
          >
            <div className="relative">
              <Avatar>
                <AvatarImage src={chat.avatar} alt={chat.name} />
                <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {chat.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-background" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm truncate">{chat.name}</span>
                  {chat.encrypted && (
                    <Icon name="Lock" size={12} className="text-muted-foreground flex-shrink-0" />
                  )}
                  {chat.pinned && (
                    <Icon name="Pin" size={12} className="text-muted-foreground flex-shrink-0" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{chat.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                {chat.unread && chat.unread > 0 && (
                  <Badge className="bg-primary text-primary-foreground ml-2 rounded-full min-w-5 h-5 flex items-center justify-center text-xs">
                    {chat.unread}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
