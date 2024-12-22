import { Question } from "@/types/question";

export const getQuestionsForLesson2_6 = (): Question[] => [
  {
    question: "Как начинается определение функции?",
    options: [
      "define my_function():",
      "def my_function():",
      "function my_function():",
      "init my_function():"
    ],
    correctAnswer: 1
  },
  {
    question: "Что возвращает функция, если не указан оператор return?",
    options: ["Ошибку", "None", "Пустую строку", "0"],
    correctAnswer: 1
  },
  {
    question: 'Какой тип аргумента указан в следующем коде?\ndef func(name="John"):\n    print(name)',
    options: [
      "Позиционный",
      "Именованный с значением по умолчанию",
      "Ключевой",
      "Неопределённый"
    ],
    correctAnswer: 1
  },
  {
    question: "Как вызвать функцию с передачей аргументов?",
    options: [
      "my_function аргумент",
      "my_function(аргумент)",
      "def my_function(аргумент)",
      "function my_function(аргумент)"
    ],
    correctAnswer: 1
  },
  {
    question: "Какой результат выполнения кода?\ndef add(a, b):\n    return a + b\nprint(add(3, 5))",
    options: ["8", "35", "Ошибка", "None"],
    correctAnswer: 0
  }
];