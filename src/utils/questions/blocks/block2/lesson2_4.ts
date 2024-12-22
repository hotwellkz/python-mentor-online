import { Question } from "@/types/question";

export const getQuestionsForLesson2_4 = (): Question[] => [
  {
    question: "Что выведет следующий код:\nfor i in range(3):\n    print(i)",
    options: ["1, 2, 3", "0, 1, 2", "Ошибка", "1, 2"],
    correctAnswer: 1
  },
  {
    question: 'Какой цикл завершится только при условии, если пользователь введёт "exit"?',
    options: ["for", "while", "do while", "Никакой"],
    correctAnswer: 1
  },
  {
    question: "Что делает оператор break в цикле?",
    options: [
      "Пропускает текущую итерацию",
      "Завершает цикл",
      "Переходит к следующему циклу",
      "Вызывает ошибку"
    ],
    correctAnswer: 1
  },
  {
    question: "Какой результат выполнения кода:\nfor i in range(2):\n    for j in range(2):\n        print(i, j)",
    options: ["0 0, 0 1, 1 0, 1 1", "0 0, 0 1, 1 0", "0 0, 1 1", "Ошибка"],
    correctAnswer: 0
  },
  {
    question: "Чем отличается while от for?",
    options: [
      "while выполняется фиксированное число раз",
      "for выполняется до достижения условия",
      "while используется для неопределённого числа итераций",
      "for не поддерживает условия"
    ],
    correctAnswer: 2
  }
];