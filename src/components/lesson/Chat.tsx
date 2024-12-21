import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

interface ChatProps {
  topQuestions: string[];
  onAskQuestion: (question: string) => Promise<string>;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const Chat = ({ topQuestions, onAskQuestion }: ChatProps) => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const { toast } = useToast();
  const lessonId = window.location.pathname.split('/').pop();

  useEffect(() => {
    loadChatMessages();
  }, []);

  const loadChatMessages = async () => {
    if (!lessonId) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: progress } = await supabase
        .from('lesson_progress')
        .select('chat_messages')
        .eq('lesson_id', lessonId)
        .eq('user_id', user.id)
        .single();

      if (progress?.chat_messages) {
        const loadedMessages = progress.chat_messages as unknown as Message[];
        if (Array.isArray(loadedMessages) && loadedMessages.every(msg => 
          typeof msg === 'object' && 
          'role' in msg && 
          'content' in msg && 
          (msg.role === 'user' || msg.role === 'assistant')
        )) {
          setMessages(loadedMessages);
        }
      }
    } catch (error) {
      console.error('Error loading chat messages:', error);
    }
  };

  const saveChatMessages = async (newMessages: Message[]) => {
    if (!lessonId) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('lesson_progress')
        .upsert({
          user_id: user.id,
          lesson_id: lessonId,
          chat_messages: newMessages as unknown as Json,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving chat messages:', error);
    }
  };

  const handleAskQuestion = async (text: string) => {
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

      if (!profile || profile.tokens < 5) {
        toast({
          variant: "destructive",
          title: "Недостаточно токенов",
          description: "Для отправки вопроса необходимо 5 токенов",
        });
        return;
      }

      const newUserMessage: Message = { role: 'user', content: text };
      const newMessages = [...messages, newUserMessage];
      setMessages(newMessages);
      await saveChatMessages(newMessages);

      const answer = await onAskQuestion(text);
      
      const updatedMessages = [...newMessages, { role: 'assistant' as const, content: answer }];
      setMessages(updatedMessages);
      await saveChatMessages(updatedMessages);

      await supabase
        .from('profiles')
        .update({ tokens: profile.tokens - 5 })
        .eq('id', user.id);

      setQuestion("");
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
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-semibold mb-4">Часто задаваемые вопросы</h2>
      
      <div className="grid grid-cols-1 gap-2">
        {topQuestions.map((q, i) => (
          <Button
            key={i}
            variant="outline"
            className="whitespace-normal h-auto text-left py-2"
            onClick={() => handleAskQuestion(q)}
            disabled={loading}
          >
            {q}
          </Button>
        ))}
      </div>

      <div className="space-y-4 mt-8">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-4 rounded-lg ${
              msg.role === 'user'
                ? 'bg-primary text-primary-foreground ml-8'
                : 'bg-muted mr-8'
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Задайте свой вопрос..."
          onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion(question)}
          disabled={loading}
        />
        <Button onClick={() => handleAskQuestion(question)} disabled={loading || !question.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};