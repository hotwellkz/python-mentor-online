import { useParams } from "react-router-dom";
import { LessonHeader } from "@/components/lesson/LessonHeader";
import { LessonContent } from "@/components/lesson/LessonContent";
import { LessonTest } from "@/components/lesson/LessonTest";
import { Chat } from "@/components/chat/Chat";
import { AuthCheck } from "@/components/AuthCheck";
import { PromptEditor } from "@/components/lesson/PromptEditor";
import { useLesson } from "@/hooks/useLesson";
import { useSpeech } from "@/hooks/useSpeech";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { LessonSEO } from "@/components/lesson/LessonSEO";
import { useLessonContent } from "@/hooks/lesson/useLessonContent";

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

  const { 
    lessonTitle, 
    topQuestions, 
    isDevOpsLesson, 
    isDataScienceLesson,
    isProductManagementLesson 
  } = useLessonContent(lessonId);

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
    stopPlayback,
  } = useSpeech();

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

  if (!lessonTitle) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center">Урок не найден</h1>
      </div>
    );
  }

  return (
    <>
      <LessonSEO 
        lessonTitle={lessonTitle}
        topQuestions={topQuestions}
        isDevOpsLesson={isDevOpsLesson}
        isDataScienceLesson={isDataScienceLesson}
        isProductManagementLesson={isProductManagementLesson}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto relative">
          <div className="flex flex-col md:flex-row justify-between items-start mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">{lessonTitle}</h1>
            <div className="mt-4 md:mt-0">
              <PromptEditor lessonId={lessonId || ""} />
            </div>
          </div>
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
            onStopPlayback={() => {
              if (synthesis && stopPlayback) {
                stopPlayback();
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