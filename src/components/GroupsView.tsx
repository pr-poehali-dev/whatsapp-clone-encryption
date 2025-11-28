import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Group {
  id: number;
  name: string;
  avatar: string;
  members: number;
  lastMessage: string;
  time: string;
  unread?: number;
}

interface GroupsViewProps {
  groups: Group[];
}

export default function GroupsView({ groups }: GroupsViewProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="text-xl font-semibold">Группы</h2>
        <Button size="icon" className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Icon name="Plus" size={20} />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="divide-y divide-border">
          {groups.map((group) => (
            <div
              key={group.id}
              className="flex items-center gap-3 p-3 hover:bg-accent cursor-pointer transition-colors"
            >
              <Avatar className="w-12 h-12">
                <AvatarImage src={group.avatar} alt={group.name} />
                <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm truncate">{group.name}</span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{group.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">
                      <Icon name="Users" size={12} className="inline mr-1" />
                      {group.members} участников
                    </p>
                    <p className="text-sm text-muted-foreground truncate">{group.lastMessage}</p>
                  </div>
                  {group.unread && group.unread > 0 && (
                    <Badge className="bg-primary text-primary-foreground ml-2 rounded-full min-w-5 h-5 flex items-center justify-center text-xs">
                      {group.unread}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
