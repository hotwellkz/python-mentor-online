import { Question } from '@/types/question';

export const getQuestionsForLesson5_1 = (): Question[] => [
  {
    question: "Какой блок используется для обработки исключений в Python?",
    options: ["error", "except", "catch", "handle"],
    correctAnswer: 1
  },
  {
    question: "Что произойдёт, если в блоке try возникает ошибка?",
    options: [
      "Программа завершится",
      "Управление передаётся в блок except",
      "Ошибка игнорируется",
      "Программа продолжит выполнение без обработки"
    ],
    correctAnswer: 1
  },
  {
    question: "Какой из блоков используется для выполнения кода независимо от того, возникла ошибка или нет?",
    options: ["except", "finally", "try", "else"],
    correctAnswer: 1
  },
  {
    question: "Как создать пользовательское исключение?\n\nclass MyError(Exception):\n    pass",
    options: [
      "class MyError:",
      "class MyError(Exception):",
      "class Exception(MyError):",
      "class MyError(Ex):"
    ],
    correctAnswer: 1
  },
  {
    question: "Что произойдёт при выполнении следующего кода?\n\ntry:\n    x = 10 / 0\nexcept ZeroDivisionError:\n    print(\"Деление на ноль!\")\nfinally:\n    print(\"Завершение.\")",
    options: [
      "Вывод \"Деление на ноль!\"",
      "Вывод \"Завершение.\"",
      "Вывод \"Деление на ноль!\" и \"Завершение.\"",
      "Ошибка"
    ],
    correctAnswer: 2
  }
];

export const getQuestionsForLesson5_2 = (): Question[] => [
  {
    question: "Какой метод часто используется для проверки значений переменных во время выполнения программы?",
    options: ["debug()", "print()", "check()", "monitor()"],
    correctAnswer: 1
  },
  {
    question: "Как импортировать встроенную библиотеку для отладки?",
    options: ["import debugger", "import pdb", "import debug_tool", "import python_debugger"],
    correctAnswer: 1
  },
  {
    question: "Как вставить точку останова в коде с помощью библиотеки pdb?",
    options: ["pdb.break()", "pdb.stop()", "pdb.set_trace()", "pdb.pause()"],
    correctAnswer: 2
  },
  {
    question: "Что делает команда n в интерактивной среде pdb?",
    options: [
      "Переход к следующей строке",
      "Выйти из отладчика",
      "Показать значения переменных",
      "Повторить текущую строку"
    ],
    correctAnswer: 0
  },
  {
    question: "Как выйти из режима отладки pdb?",
    options: ["exit()", "quit()", "q", "Все перечисленные варианты"],
    correctAnswer: 3
  }
];

export const getBlock5Questions = (lessonIndex: number): Question[] => {
  switch (lessonIndex) {
    case 1:
      return getQuestionsForLesson5_1();
    case 2:
      return getQuestionsForLesson5_2();
    default:
      return [];
  }
};