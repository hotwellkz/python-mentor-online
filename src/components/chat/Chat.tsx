import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";
import { TopQuestions } from "./TopQuestions";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";

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
        .maybeSingle();

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
        }, {
          onConflict: 'user_id,lesson_id'
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
      
      <TopQuestions 
        questions={topQuestions}
        onAskQuestion={handleAskQuestion}
        loading={loading}
      />

      <div className="space-y-4 mt-8">
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} content={msg.content} />
        ))}
      </div>

      <ChatInput
        value={question}
        onChange={setQuestion}
        onSubmit={() => handleAskQuestion(question)}
        loading={loading}
      />
    </div>
  );
};