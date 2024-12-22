import { Question } from '@/types/question';

export const getQuestionsForLesson6_2 = (): Question[] => {
  return [
    {
      question: "Как установить стороннюю библиотеку с помощью pip?",
      options: [
        "pip install <имя_библиотеки>",
        "pip add <имя_библиотеки>",
        "pip update <имя_библиотеки>",
        "pip download <имя_библиотеки>"
      ],
      correctAnswer: 0
    },
    {
      question: "Где хранятся сторонние библиотеки, установленные через pip?",
      options: [
        "В папке проекта",
        "В системных библиотеках Python",
        "В виртуальном окружении (если оно используется)",
        "b и c"
      ],
      correctAnswer: 3
    },
    {
      question: "Как обновить установленную библиотеку?",
      options: [
        "pip update <имя_библиотеки>",
        "pip upgrade <имя_библиотеки>",
        "pip install --upgrade <имя_библиотеки>",
        "pip update --force <имя_библиотеки>"
      ],
      correctAnswer: 2
    },
    {
      question: "Как проверить версию установленной библиотеки?",
      options: [
        "pip version <имя_библиотеки>",
        "pip show <имя_библиотеки>",
        "pip list | grep <имя_библиотеки>",
        "b и c"
      ],
      correctAnswer: 3
    },
    {
      question: "Что такое PyPI?",
      options: [
        "Утилита для работы с Python",
        "Репозиторий сторонних библиотек для Python",
        "Программа для отладки Python",
        "Менеджер зависимостей"
      ],
      correctAnswer: 1
    }
  ];
};