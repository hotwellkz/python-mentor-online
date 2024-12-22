import { Question } from '@/types/question';

export const getQuestionsForLesson3_1 = (): Question[] => [
  {
    question: "Что такое класс в Python?",
    options: [
      "Объект программы",
      "Шаблон для создания объектов",
      "Переменная",
      "Функция"
    ],
    correctAnswer: 1
  },
  {
    question: "Как объявить класс в Python?",
    options: [
      "object MyClass:",
      "class MyClass:",
      "def class MyClass:",
      "init MyClass:"
    ],
    correctAnswer: 1
  },
  {
    question: "Как создать объект класса?\nclass MyClass:\n    pass",
    options: [
      "obj = new MyClass()",
      "obj = MyClass()",
      "obj = class MyClass()",
      "obj = init MyClass()"
    ],
    correctAnswer: 1
  },
  {
    question: "Что такое объект?",
    options: [
      "Экземпляр класса",
      "Базовый класс",
      "Шаблон класса",
      "Переменная"
    ],
    correctAnswer: 0
  },
  {
    question: "Что будет результатом выполнения следующего кода?\nclass MyClass:\n    attr = 10\nobj = MyClass()\nprint(obj.attr)",
    options: ["Ошибка", "10", "None", "attr"],
    correctAnswer: 1
  }
];