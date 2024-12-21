import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ModelSelector } from "./ModelSelector";
import { MessageList } from "./MessageList";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedModel, setSelectedModel] = useState<'openai' | 'anthropic'>('openai');

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: "Пожалуйста, войдите в систему",
        });
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('tokens')
        .eq('id', user.id)
        .single();

      if (!profile || profile.tokens < 1) {
        toast({
          variant: "destructive",
          title: "Недостаточно токенов",
          description: "Пополните баланс токенов для продолжения общения",
        });
        return;
      }

      setMessages(prev => [...prev, { role: 'user', content: message }]);
      
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { message, model: selectedModel }
      });

      if (error) throw error;
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
      
      await supabase
        .from('profiles')
        .update({ tokens: profile.tokens - 1 })
        .eq('id', user.id);

      setMessage("");
    } catch (error: any) {
      console.error('Chat error:', error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <ModelSelector
        selectedModel={selectedModel}
        onModelChange={(value) => setSelectedModel(value)}
      />
      
      <MessageList messages={messages} />
      
      <div className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Задайте вопрос ИИ-учителю..."
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          disabled={loading}
        />
        <Button onClick={sendMessage} disabled={loading}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};