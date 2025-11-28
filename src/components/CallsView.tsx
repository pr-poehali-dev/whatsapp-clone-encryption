import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Call {
  id: number;
  name: string;
  avatar: string;
  time: string;
  type: 'incoming' | 'outgoing' | 'missed';
  callType: 'voice' | 'video';
}

interface CallsViewProps {
  calls: Call[];
}

export default function CallsView({ calls }: CallsViewProps) {
  const getCallIcon = (type: string) => {
    switch (type) {
      case 'incoming':
        return <Icon name="PhoneIncoming" size={16} className="text-primary" />;
      case 'outgoing':
        return <Icon name="PhoneOutgoing" size={16} className="text-muted-foreground" />;
      case 'missed':
        return <Icon name="PhoneMissed" size={16} className="text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-semibold">Звонки</h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="divide-y divide-border">
          {calls.map((call) => (
            <div
              key={call.id}
              className="flex items-center gap-3 p-3 hover:bg-accent cursor-pointer transition-colors"
            >
              <Avatar>
                <AvatarImage src={call.avatar} alt={call.name} />
                <AvatarFallback>{call.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-sm truncate ${call.type === 'missed' ? 'text-destructive' : ''}`}>
                  {call.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {getCallIcon(call.type)}
                  <span>{call.time}</span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="text-primary hover:text-primary hover:bg-accent"
              >
                <Icon name={call.callType === 'video' ? 'Video' : 'Phone'} size={20} />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
