import { Question } from '@/types/question';
import { getBusinessAnalystQuestions } from './questions/businessAnalyst';
import { getModuleThreeQuestions } from './questions/moduleThree';

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
  if (moduleIndex === 3) {
    return getModuleThreeQuestions(topicIndex);
  }

  return [
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

export { getBusinessAnalystQuestions };