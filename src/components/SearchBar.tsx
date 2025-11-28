import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = 'Поиск' }: SearchBarProps) {
  return (
    <div className="p-3 border-b border-border">
      <div className="relative">
        <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 bg-accent border-0"
        />
      </div>
    </div>
  );
}
