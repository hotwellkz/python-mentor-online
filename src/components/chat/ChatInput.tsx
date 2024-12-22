import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export const ChatInput = ({ value, onChange, onSubmit, loading }: ChatInputProps) => {
  return (
    <div className="flex gap-2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Задайте свой вопрос..."
        onKeyPress={(e) => e.key === 'Enter' && onSubmit()}
        disabled={loading}
      />
      <Button onClick={onSubmit} disabled={loading || !value.trim()}>
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};