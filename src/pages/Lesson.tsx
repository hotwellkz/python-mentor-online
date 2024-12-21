import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, Play, Pause, Share2, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Lesson = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPremiumPlaying, setIsPremiumPlaying] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userPrompt, setUserPrompt] = useState("");
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setSynthesis(window.speechSynthesis);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const button = document.querySelector(".start-lesson-button");
      if (button) {
        button.classList.add("animate-pulse");
        setTimeout(() => {
          button.classList.remove("animate-pulse");
        }, 1000);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

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
      const response = await fetch("/functions/v1/generate-lesson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
        body: JSON.stringify({
          lessonId,
        }),
      });

      if (!response.ok) throw new Error("Ошибка при генерации урока");

      const data = await response.json();
      setGeneratedText(data.text);

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

  const togglePlayback = () => {
    if (synthesis) {
      if (isPlaying) {
        synthesis.pause();
      } else {
        synthesis.resume();
      }
      setIsPlaying(!isPlaying);
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

  const topQuestions = [
    "Как объявить переменную в Python?",
    "Чем отличается int от float?",
    "Как преобразовать один тип данных в другой?",
    "Что такое булевы значения?",
    "Как работать со строками в Python?",
  ];

  return (
    <>
      <Helmet>
        <title>Переменные и типы данных в Python | Python с ИИ-учителем</title>
        <meta
          name="description"
          content="Изучите переменные и типы данных в Python: целые числа (int), числа с плавающей точкой (float), строки (str) и логические значения (bool). Практические примеры и интерактивное обучение."
        />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Урок 1: Переменные и типы данных
            </h1>
            <div className="flex flex-wrap gap-4">
              <Button
                className="start-lesson-button"
                onClick={startLesson}
                disabled={loading}
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                  </motion.div>
                ) : (
                  "Начать урок"
                )}
              </Button>
              {generatedText && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => playText(generatedText)}
                    disabled={isPlaying || isPremiumPlaying}
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5 mr-2" />
                    ) : (
                      <Play className="h-5 w-5 mr-2" />
                    )}
                    Озвучить бесплатно
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => playText(generatedText, true)}
                    disabled={isPlaying || isPremiumPlaying}
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Озвучить красивым голосом
                  </Button>
                  <Button variant="ghost" onClick={shareLesson}>
                    <Share2 className="h-5 w-5 mr-2" />
                    Поделиться
                  </Button>
                </>
              )}
            </div>
          </motion.div>

          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="mt-4 text-lg">Готовлю урок...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {generatedText && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: generatedText }}
            />
          )}

          {generatedText && (
            <div className="mt-8 space-y-4">
              <h3 className="text-xl font-semibold">Популярные вопросы</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="mt-8">
                <Textarea
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  placeholder="Задайте свой вопрос..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex justify-between">
                <Button onClick={() => setShowTest(true)}>
                  Пройти тест
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => navigate("/program")}
                >
                  Завершить урок
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Lesson;