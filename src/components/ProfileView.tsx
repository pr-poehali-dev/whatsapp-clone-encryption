import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

export default function ProfileView() {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-semibold">Профиль</h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="w-32 h-32">
                <AvatarFallback className="text-3xl">А</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute bottom-0 right-0 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Icon name="Camera" size={18} />
              </Button>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold">Александр Иванов</h3>
              <p className="text-sm text-muted-foreground">+7 (900) 123-45-67</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-semibold text-muted-foreground">ИМЯ</Label>
              <Input id="name" defaultValue="Александр Иванов" className="mt-2" />
            </div>

            <div>
              <Label htmlFor="about" className="text-sm font-semibold text-muted-foreground">О СЕБЕ</Label>
              <Input id="about" defaultValue="Доступен для работы" className="mt-2" />
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm font-semibold text-muted-foreground">ТЕЛЕФОН</Label>
              <Input id="phone" defaultValue="+7 (900) 123-45-67" disabled className="mt-2" />
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
              <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center">
                <Icon name="Lock" size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">Сквозное шифрование</p>
                <p className="text-xs text-muted-foreground">Ваши данные защищены</p>
              </div>
              <Icon name="CheckCircle2" size={20} className="text-primary" />
            </div>

            <div className="flex items-center gap-3 p-3 bg-accent rounded-lg cursor-pointer hover:bg-accent/80 transition-colors">
              <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center">
                <Icon name="Key" size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">QR-код</p>
                <p className="text-xs text-muted-foreground">Поделиться контактом</p>
              </div>
              <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
            </div>
          </div>

          <div className="pt-4">
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Icon name="Save" size={18} className="mr-2" />
              Сохранить изменения
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
