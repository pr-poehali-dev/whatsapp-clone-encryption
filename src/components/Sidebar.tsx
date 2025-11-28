import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userAvatar?: string;
}

export default function Sidebar({ activeTab, onTabChange, userAvatar }: SidebarProps) {
  const menuItems = [
    { id: 'chats', icon: 'MessageCircle', label: 'Чаты' },
    { id: 'status', icon: 'Circle', label: 'Статусы' },
    { id: 'calls', icon: 'Phone', label: 'Звонки' },
    { id: 'groups', icon: 'Users', label: 'Группы' },
    { id: 'settings', icon: 'Settings', label: 'Настройки' },
  ];

  return (
    <div className="w-16 bg-secondary flex flex-col items-center py-4 border-r border-border">
      <div className="mb-6">
        <Avatar className="w-10 h-10 cursor-pointer hover:ring-2 ring-primary transition-all" onClick={() => onTabChange('profile')}>
          <AvatarImage src={userAvatar} alt="Profile" />
          <AvatarFallback>Я</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            size="icon"
            onClick={() => onTabChange(item.id)}
            className={`w-10 h-10 ${
              activeTab === item.id
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'text-secondary-foreground hover:bg-accent'
            }`}
            title={item.label}
          >
            <Icon name={item.icon as any} size={20} />
          </Button>
        ))}
      </div>

      <Button variant="ghost" size="icon" className="mt-auto text-secondary-foreground" title="Меню">
        <Icon name="Menu" size={20} />
      </Button>
    </div>
  );
}
