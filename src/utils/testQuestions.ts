interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export const getPythonQuestions = (): Question[] => {
  return [
    {
      question: "Какой редактор кода рекомендуется для начинающих Python разработчиков?",
      options: [
        "VS Code",
        "Блокнот Windows",
        "Notepad++",
        "Word"
      ],
      correctAnswer: 0
    },
    {
      question: "Какое расширение необходимо установить в VS Code для работы с Python?",
      options: [
        "JavaScript",
        "Python",
        "Java",
        "C++"
      ],
      correctAnswer: 1
    },
    {
      question: "Какая среда разработки является специализированной для Python?",
      options: [
        "VS Code",
        "Sublime Text",
        "PyCharm",
        "Atom"
      ],
      correctAnswer: 2
    }
  ];
};

export const getDevOpsQuestions = (moduleIndex: number, topicIndex: number): Question[] => {
  const moduleQuestions: { [key: string]: { [key: string]: Question[] } } = {
    3: { // Модуль 3: Контейнеризация
      3: [
        {
          question: "Какие основные компоненты включает в себя архитектура контейнеров?",
          options: [
            "Только Docker Engine",
            "Container runtime, images, и registry",
            "Только Kubernetes",
            "Только контейнеры"
          ],
          correctAnswer: 1
        },
        {
          question: "Что такое Docker Compose?",
          options: [
            "Инструмент для создания образов",
            "Система оркестрации контейнеров",
            "Инструмент для определения и запуска многоконтейнерных приложений",
            "База данных для Docker"
          ],
          correctAnswer: 2
        },
        {
          question: "Как обеспечить персистентность данных в Docker?",
          options: [
            "Использовать Docker volumes",
            "Сохранять данные внутри контейнера",
            "Использовать только bind mounts",
            "Не использовать volumes вообще"
          ],
          correctAnswer: 0
        }
      ]
    }
  };

  return moduleQuestions[moduleIndex]?.[topicIndex] || [
    {
      question: "Какие основные принципы DevOps?",
      options: [
        "Только автоматизация",
        "Культура, автоматизация, измерение и совместное использование",
        "Только мониторинг",
        "Только развертывание"
      ],
      correctAnswer: 1
    },
    {
      question: "Что такое непрерывная интеграция (CI)?",
      options: [
        "Ручное тестирование",
        "Автоматическая сборка и тестирование при каждом изменении кода",
        "Развертывание раз в месяц",
        "Только код ревью"
      ],
      correctAnswer: 1
    },
    {
      question: "Какой инструмент используется для контейнеризации?",
      options: [
        "Docker",
        "Excel",
        "Word",
        "Paint"
      ],
      correctAnswer: 0
    }
  ];
};