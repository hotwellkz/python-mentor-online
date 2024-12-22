import { Question } from "@/types/question";

export const getQuestionsForLesson2_1 = (): Question[] => [
  {
    question: "Какой тип данных будет у переменной x = 10?",
    options: ["float", "int", "str", "bool"],
    correctAnswer: 1
  },
  {
    question: "Какой результат выведет print(type(3.14))?",
    options: ["int", "float", "str", "bool"],
    correctAnswer: 1
  },
  {
    question: "Что означает тип данных bool?",
    options: [
      "Текстовые данные",
      "Числовые данные",
      "Логические значения (True/False)",
      "Списки"
    ],
    correctAnswer: 2
  },
  {
    question: "Как правильно объявить строковую переменную?",
    options: [
      'x = "Привет"',
      "x = 'Привет'",
      "x = Привет",
      "a и b"
    ],
    correctAnswer: 3
  },
  {
    question: "Какой из типов данных является неизменяемым?",
    options: ["list", "tuple", "dict", "set"],
    correctAnswer: 1
  }
];