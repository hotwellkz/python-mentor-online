import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageList } from "@/components/chat/MessageList";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ChatProps {
  topQuestions: string[];
  onAskQuestion: (question: string) => Promise<void>;
}

export const Chat = ({ topQuestions, onAskQuestion }: ChatProps) => {
  const [userPrompt, setUserPrompt] = useState("");
  const { toast } = useToast();
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);

  const handleQuestionSubmit = async () => {
    if (!userPrompt.trim()) return;

    try {
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
        .from("profiles")
        .select("tokens")
        .eq("id", user.id)
        .single();

      if (!profile || profile.tokens < 5) {
        toast({
          variant: "destructive",
          title: "Недостаточно токенов",
          description: "Для отправки вопроса необходимо 5 токенов",
        });
        return;
      }

      setMessages(prev => [...prev, { role: 'user', content: userPrompt }]);
      
      const response = await supabase.functions.invoke('chat', {
        body: { message: userPrompt, model: 'openai' }
      });

      if (response.error) throw new Error(response.error.message);

      setMessages(prev => [...prev, { role: 'assistant', content: response.data.text }]);
      
      await supabase
        .from("profiles")
        .update({ tokens: profile.tokens - 5 })
        .eq("id", user.id);

      setUserPrompt("");

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
      });
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Задайте вопрос по теме урока</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {topQuestions.map((question, index) => (
          <Button
            key={index}
            variant="outline"
            className="text-left"
            onClick={() => setUserPrompt(question)}
          >
            {question}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        <MessageList messages={messages} />
        
        <div className="flex gap-2">
          <Textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="Задайте свой вопрос..."
            className="flex-grow"
          />
          <Button onClick={handleQuestionSubmit}>
            Отправить
          </Button>
        </div>
      </div>
    </div>
  );
};