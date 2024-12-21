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

const getDevOpsQuestions = (moduleIndex: number, topicIndex: number): string[] => {
  const moduleQuestions: { [key: string]: { [key: string]: string[] } } = {
    1: { // Модуль 1: Введение в DevOps
      1: [
        "Что такое DevOps и какие основные принципы?",
        "Как DevOps влияет на процесс разработки?",
        "Какие основные инструменты используются в DevOps?",
        "Как начать внедрение DevOps в команде?",
        "Какие навыки необходимы DevOps-инженеру?"
      ],
      2: [
        "Как организовать взаимодействие команд разработки и эксплуатации?",
        "Какие метрики важны для оценки эффективности DevOps?",
        "Как внедрить культуру DevOps в организации?",
        "Какие основные проблемы возникают при переходе на DevOps?",
        "Как измерить успешность внедрения DevOps?"
      ],
    },
    2: { // Модуль 2: Контроль версий
      1: [
        "Как правильно организовать работу с Git в команде?",
        "Какие лучшие практики при работе с ветками в Git?",
        "Как настроить CI/CD пайплайн с использованием Git?",
        "Какие инструменты Git наиболее важны для DevOps?",
        "Как обеспечить безопасность при работе с Git?"
      ],
      2: [
        "Как эффективно использовать GitOps?",
        "Какие преимущества дает Infrastructure as Code?",
        "Как организовать процесс code review?",
        "Какие инструменты лучше использовать для IaC?",
        "Как автоматизировать развертывание с помощью GitOps?"
      ],
    },
    3: { // Модуль 3: Контейнеризация
      1: [
        "Какие преимущества дает использование Docker?",
        "Как оптимизировать Docker-образы?",
        "Какие лучшие практики безопасности для Docker?",
        "Как организовать мониторинг Docker-контейнеров?",
        "Как эффективно управлять Docker-volumes?"
      ],
      2: [
        "Какие основные компоненты Kubernetes?",
        "Как настроить отказоустойчивый кластер?",
        "Какие стратегии деплоя существуют в Kubernetes?",
        "Как организовать мониторинг Kubernetes?",
        "Как обеспечить безопасность в Kubernetes?"
      ],
    },
    4: { // Модуль 4: CI/CD
      1: [
        "Как настроить эффективный CI/CD пайплайн?",
        "Какие инструменты лучше использовать для CI/CD?",
        "Как обеспечить безопасность в CI/CD?",
        "Как организовать тестирование в CI/CD?",
        "Какие метрики важны для CI/CD?"
      ],
      2: [
        "Как настроить автоматическое развертывание?",
        "Какие стратегии релизов существуют?",
        "Как организовать откат изменений?",
        "Как обеспечить непрерывную интеграцию?",
        "Как оптимизировать время сборки?"
      ],
    },
    5: { // Модуль 5: Мониторинг
      1: [
        "Какие метрики важны для мониторинга?",
        "Как настроить алерты в Prometheus?",
        "Как визуализировать данные в Grafana?",
        "Какие типы мониторинга существуют?",
        "Как организовать мониторинг микросервисов?"
      ],
      2: [
        "Как эффективно анализировать логи?",
        "Какие инструменты использовать для логирования?",
        "Как настроить централизованное логирование?",
        "Как организовать поиск по логам?",
        "Как автоматизировать анализ логов?"
      ],
    },
    6: { // Модуль 6: Безопасность
      1: [
        "Как обеспечить безопасность в DevOps процессах?",
        "Какие инструменты использовать для сканирования уязвимостей?",
        "Как защитить CI/CD пайплайн?",
        "Как управлять секретами в DevOps?",
        "Какие практики безопасности важны в DevOps?"
      ],
      2: [
        "Как настроить HashiCorp Vault?",
        "Как организовать управление доступом?",
        "Как обеспечить безопасность контейнеров?",
        "Как защитить инфраструктуру?",
        "Как проводить аудит безопасности?"
      ],
    },
    7: { // Модуль 7: Облачные платформы
      1: [
        "Какие облачные сервисы лучше использовать?",
        "Как оптимизировать затраты в облаке?",
        "Как обеспечить отказоустойчивость?",
        "Как организовать мультиоблачную архитектуру?",
        "Как автоматизировать облачную инфраструктуру?"
      ],
      2: [
        "Как эффективно использовать Terraform?",
        "Как организовать управление состоянием?",
        "Как обеспечить безопасность в облаке?",
        "Как настроить масштабирование?",
        "Как организовать резервное копирование?"
      ],
    },
    8: { // Модуль 8: Оркестрация
      1: [
        "Как эффективно использовать Ansible?",
        "Как организовать управление конфигурациями?",
        "Как автоматизировать развертывание?",
        "Как обеспечить идемпотентность?",
        "Как организовать тестирование плейбуков?"
      ],
      2: [
        "Как настроить HashiCorp Consul?",
        "Как организовать service mesh?",
        "Как обеспечить service discovery?",
        "Как настроить балансировку нагрузки?",
        "Как организовать мониторинг сервисов?"
      ],
    },
    9: { // Модуль 9: Финальный проект
      1: [
        "Как спланировать DevOps проект?",
        "Какие метрики использовать для оценки успеха?",
        "Как организовать документацию проекта?",
        "Как обеспечить масштабируемость решения?",
        "Как презентовать DevOps проект?"
      ],
      2: [
        "Как подготовиться к сертификации?",
        "Какие практические навыки важны?",
        "Как создать портфолио DevOps проектов?",
        "Как развиваться дальше в DevOps?",
        "Какие карьерные перспективы в DevOps?"
      ],
    }
  };

  return moduleQuestions[moduleIndex]?.[topicIndex] || [
    "Как начать изучение этой темы?",
    "Какие инструменты необходимы?",
    "Какие лучшие практики существуют?",
    "Как применить знания на практике?",
    "Как оценить прогресс обучения?"
  ];
};

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
  let topQuestions: string[];

  if (isDevOpsLesson) {
    const [, moduleIndex, topicIndex] = (lessonId || "").split("-").map(Number);
    const currentModule = modules[moduleIndex - 1];
    if (currentModule) {
      currentLesson = {
        title: currentModule.topics[topicIndex - 1],
        topics: [currentModule.title], // Используем название модуля как тему
      };
      topQuestions = getDevOpsQuestions(moduleIndex, topicIndex);
    }
  } else {
    const [blockIndex, lessonIndex] = (lessonId || "").split("-").map(Number);
    const currentBlock = courseBlocks[blockIndex - 1];
    currentLesson = currentBlock?.lessons[lessonIndex - 1];
    topQuestions = currentLesson?.topics || [
      "Как установить VS Code для Python?",
      "Какие расширения нужны для Python в VS Code?",
      "Как настроить PyCharm для Python?",
      "Как установить Jupyter Notebook?",
      "Какой редактор лучше выбрать для начинающего Python разработчика?"
    ];
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
