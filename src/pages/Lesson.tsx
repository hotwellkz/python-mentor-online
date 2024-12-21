import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { LessonHeader } from "@/components/lesson/LessonHeader";
import { LessonContent } from "@/components/lesson/LessonContent";
import { LessonTest } from "@/components/lesson/LessonTest";
import { Chat } from "@/components/chat/Chat";
import { AuthCheck } from "@/components/AuthCheck";
import { useLesson } from "@/hooks/useLesson";
import { useSpeech } from "@/hooks/useSpeech";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { courseBlocks } from "@/data/courseData";
import { useEffect, useState } from "react";
import { modules } from "@/components/course/DevOpsCourseProgram";

const Lesson = () => {
  const { lessonId } = useParams();
  const { toast } = useToast();
  const [isEmailVerified, setIsEmailVerified] = useState<boolean | null>(null);

  useEffect(() => {
    checkEmailVerification();
  }, []);

  const checkEmailVerification = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setIsEmailVerified(user?.email_confirmed_at !== null);
  };

  // Определяем, является ли это уроком DevOps
  const isDevOpsLesson = lessonId?.startsWith('devops-');

  // Находим текущий урок в зависимости от типа
  let currentLesson;
  if (isDevOpsLesson) {
    const [, moduleIndex, topicIndex] = (lessonId || "").split("-").map(Number);
    const currentModule = modules[moduleIndex - 1];
    if (currentModule) {
      currentLesson = {
        title: currentModule.topics[topicIndex - 1],
        topics: [currentModule.title], // Используем название модуля как тему
      };
    }
  } else {
    const [blockIndex, lessonIndex] = (lessonId || "").split("-").map(Number);
    const currentBlock = courseBlocks[blockIndex - 1];
    currentLesson = currentBlock?.lessons[lessonIndex - 1];
  }

  const {
    loading,
    generatedText,
    showTest,
    setShowTest,
    isAuthenticated,
    userPrompt,
    setUserPrompt,
    startLesson,
    finishLesson,
  } = useLesson(lessonId);

  const {
    isPlaying,
    isPremiumPlaying,
    synthesis,
    setSynthesis,
    playText,
  } = useSpeech();

  const topQuestions = currentLesson?.topics || [
    "Как установить VS Code для Python?",
    "Какие расширения нужны для Python в VS Code?",
    "Как настроить PyCharm для Python?",
    "Как установить Jupyter Notebook?",
    "Какой редактор лучше выбрать для начинающего Python разработчика?"
  ];

  const handleAskQuestion = async (question: string) => {
    try {
      const response = await supabase.functions.invoke('generate-lesson', {
        body: { prompt: question },
      });

      if (response.error) throw new Error(response.error.message);
      
      return response.data.text;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
      });
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

  if (isAuthenticated === null || isEmailVerified === null) {
    return null;
  }

  if (!isAuthenticated || !isEmailVerified) {
    return <AuthCheck />;
  }

  if (!currentLesson) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center">Урок не найден</h1>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{currentLesson.title} | {isDevOpsLesson ? 'DevOps' : 'Python'} с ИИ-учителем</title>
        <meta
          name="description"
          content={`${currentLesson.title}. ${currentLesson.topics.join(". ")}. Интерактивное обучение с ИИ-учителем.`}
        />
        <meta 
          name="keywords" 
          content={`${currentLesson.topics.join(", ")}, ${isDevOpsLesson ? 'devops обучение, devops курс' : 'python обучение, python курс'}`} 
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">{currentLesson.title}</h1>
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
            onTogglePlayback={() => {
              if (synthesis) {
                if (isPlaying) {
                  synthesis.pause();
                } else {
                  synthesis.resume();
                }
              }
            }}
            isPlaying={isPlaying}
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