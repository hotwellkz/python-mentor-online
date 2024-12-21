import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Send } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Program = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
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

      // Проверяем количество токенов
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

      // Добавляем сообщение пользователя
      setMessages(prev => [...prev, { role: 'user', content: message }]);
      
      // Отправляем запрос к ИИ
      const response = await fetch('/functions/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
        body: JSON.stringify({
          message,
          model: selectedModel,
        }),
      });

      if (!response.ok) throw new Error('Ошибка при получении ответа');
      
      const data = await response.json();
      
      // Добавляем ответ ассистента
      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
      
      // Списываем токен
      await supabase
        .from('profiles')
        .update({ tokens: profile.tokens - 1 })
        .eq('id', user.id);

      setMessage("");
    } catch (error: any) {
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
    <>
      <Helmet>
        <title>Программа курса | Python с ИИ-учителем</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Программа курса</h1>
        
        {/* Чат с ИИ */}
        <div className="max-w-3xl mx-auto">
          <div className="mb-4">
            <Select
              value={selectedModel}
              onValueChange={(value: 'openai' | 'anthropic') => setSelectedModel(value)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Выберите модель" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openai">OpenAI GPT-4</SelectItem>
                <SelectItem value="anthropic">Anthropic Claude</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-4 mb-4 h-[500px] overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  msg.role === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          
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
      </div>
    </>
  );
};

export default Program;