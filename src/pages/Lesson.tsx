import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LessonHeader } from "@/components/lesson/LessonHeader";
import { LessonContent } from "@/components/lesson/LessonContent";
import { LessonTest } from "@/components/lesson/LessonTest";
import { Chat } from "@/components/lesson/Chat";
import { AuthCheck } from "@/components/AuthCheck";

const Lesson = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPremiumPlaying, setIsPremiumPlaying] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userPrompt, setUserPrompt] = useState("");

  const topQuestions = [
    "Как создать переменную в Python и присвоить ей значение?",
    "В чем разница между типами данных int и float?",
    "Как преобразовать один тип данных в другой?",
    "Какие операции можно выполнять с булевыми значениями?",
    "Как узнать тип переменной в Python?"
  ];

  useEffect(() => {
    setSynthesis(window.speechSynthesis);
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
  };

  const startLesson = async () => {
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
          description: "Для начала урока необходимо 5 токенов",
        });
        return;
      }

      setLoading(true);
      const response = await supabase.functions.invoke('generate-lesson', {
        body: { lessonId },
      });

      if (response.error) throw new Error(response.error.message);
      setGeneratedText(response.data.text);

      await supabase
        .from("profiles")
        .update({ tokens: profile.tokens - 5 })
        .eq("id", user.id);

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

  const playText = (text: string, isPremium = false) => {
    if (isPremium) {
      playPremiumVoice(text);
    } else {
      playBrowserVoice(text);
    }
  };

  const playBrowserVoice = (text: string) => {
    if (synthesis && !isPlaying) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ru-RU";
      utterance.rate = 0.9;
      setUtterance(utterance);
      setIsPlaying(true);
      synthesis.speak(utterance);

      utterance.onend = () => {
        setIsPlaying(false);
        setUtterance(null);
      };
    }
  };

  const playPremiumVoice = async (text: string) => {
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

      if (!profile || profile.tokens < 45) {
        toast({
          variant: "destructive",
          title: "Недостаточно токенов",
          description: "Для премиум озвучки необходимо 45 токенов",
        });
        return;
      }

      setIsPremiumPlaying(true);
      const response = await fetch("/functions/v1/text-to-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error("Ошибка при генерации аудио");

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      // Create download link
      const downloadLink = document.createElement('a');
      downloadLink.href = audioUrl;
      downloadLink.download = 'lesson-audio.mp3';
      downloadLink.click();

      audio.play();

      await supabase
        .from("profiles")
        .update({ tokens: profile.tokens - 45 })
        .eq("id", user.id);

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
      });
    } finally {
      setIsPremiumPlaying(false);
    }
  };

  const shareLesson = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Успешно",
        description: "Ссылка на урок скопирована в буфер обмена",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось скопировать ссылку",
      });
    }
  };

  const handleAskQuestion = async (question: string) => {
    console.log("Question asked:", question);
  };

  const finishLesson = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase
        .from('completed_lessons')
        .insert([
          { user_id: user.id, lesson_id: lessonId }
        ]);

      navigate("/program");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
      });
    }
  };

  if (isAuthenticated === null) {
    return null; // Loading state
  }

  if (!isAuthenticated) {
    return <AuthCheck />;
  }

  return (
    <>
      <Helmet>
        <title>Урок 1: Переменные и типы данных | Python с ИИ-учителем</title>
        <meta
          name="description"
          content="Изучите переменные и типы данных в Python: int, float, str, bool. Практические примеры и интерактивное обучение с ИИ-учителем."
        />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <LessonHeader
            loading={loading}
            generatedText={generatedText}
            isPlaying={isPlaying}
            isPremiumPlaying={isPremiumPlaying}
            onStartLesson={startLesson}
            onPlayText={playText}
            onShare={shareLesson}
          />
          <LessonContent
            loading={loading}
            generatedText={generatedText}
            userPrompt={userPrompt}
            onUserPromptChange={setUserPrompt}
            onShowTest={() => setShowTest(true)}
            onFinishLesson={finishLesson}
            topQuestions={topQuestions}
          />
          <Chat
            topQuestions={topQuestions}
            onAskQuestion={handleAskQuestion}
          />
          <LessonTest
            open={showTest}
            onOpenChange={setShowTest}
          />
        </div>
      </div>
    </>
  );
};

export default Lesson;
