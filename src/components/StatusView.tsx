import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Status {
  id: number;
  name: string;
  avatar: string;
  time: string;
  viewed?: boolean;
}

interface StatusViewProps {
  statuses: Status[];
}

export default function StatusView({ statuses }: StatusViewProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-semibold mb-4">Статусы</h2>
        <div className="flex items-center gap-3 p-3 bg-accent rounded-lg cursor-pointer hover:bg-accent/80 transition-colors">
          <div className="relative">
            <Avatar className="w-12 h-12">
              <AvatarFallback>Я</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-background">
              <Icon name="Plus" size={14} className="text-primary-foreground" />
            </div>
          </div>
          <div>
            <p className="font-semibold">Мой статус</p>
            <p className="text-xs text-muted-foreground">Нажмите, чтобы добавить</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">НЕДАВНИЕ ОБНОВЛЕНИЯ</h3>
          <div className="space-y-3">
            {statuses.map((status) => (
              <div
                key={status.id}
                className="flex items-center gap-3 p-2 hover:bg-accent rounded-lg cursor-pointer transition-colors"
              >
                <div className="relative">
                  <Avatar className="w-12 h-12 ring-2 ring-primary ring-offset-2 ring-offset-background">
                    <AvatarImage src={status.avatar} alt={status.name} />
                    <AvatarFallback>{status.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{status.name}</p>
                  <p className="text-xs text-muted-foreground">{status.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
