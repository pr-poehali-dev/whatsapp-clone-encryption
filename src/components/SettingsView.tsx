import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

export default function SettingsView() {
  const settingsSections = [
    {
      title: 'Безопасность',
      items: [
        { icon: 'Lock', label: 'Сквозное шифрование', description: 'Все сообщения защищены', hasSwitch: true, checked: true },
        { icon: 'Shield', label: 'Двухфакторная аутентификация', description: 'Дополнительная защита аккаунта', hasSwitch: true, checked: false },
        { icon: 'Key', label: 'Управление ключами шифрования', description: 'Просмотр и обновление ключей' },
      ],
    },
    {
      title: 'Сервер',
      items: [
        { icon: 'Server', label: 'Настройки сервера', description: 'Подключение к собственному серверу' },
        { icon: 'Globe', label: 'Адрес сервера', description: 'server.example.com:8080' },
        { icon: 'Wifi', label: 'Статус подключения', description: 'Подключено' },
      ],
    },
    {
      title: 'Уведомления',
      items: [
        { icon: 'Bell', label: 'Уведомления', description: 'Включить звук и вибрацию', hasSwitch: true, checked: true },
        { icon: 'Volume2', label: 'Звук сообщений', description: 'Включить звук для входящих', hasSwitch: true, checked: true },
      ],
    },
    {
      title: 'Конфиденциальность',
      items: [
        { icon: 'Eye', label: 'Последнее посещение', description: 'Показывать всем' },
        { icon: 'Image', label: 'Фото профиля', description: 'Видят все' },
        { icon: 'MessageCircle', label: 'Статусы', description: 'Мои контакты' },
      ],
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-semibold">Настройки</h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {settingsSections.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx}>
                    <div className="flex items-center gap-3 p-3 hover:bg-accent rounded-lg cursor-pointer transition-colors">
                      <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name={item.icon as any} size={20} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm">{item.label}</p>
                        <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                      </div>
                      {item.hasSwitch ? (
                        <Switch checked={item.checked} />
                      ) : (
                        <Icon name="ChevronRight" size={20} className="text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                    {itemIdx < section.items.length - 1 && <Separator className="ml-16" />}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="pt-4">
            <Button variant="destructive" className="w-full">
              <Icon name="LogOut" size={18} className="mr-2" />
              Выйти из аккаунта
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
