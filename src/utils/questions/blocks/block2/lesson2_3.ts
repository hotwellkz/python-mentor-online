import { Question } from "@/types/question";

export const getQuestionsForLesson2_3 = (): Question[] => [
  {
    question: "Что вернёт выражение True and False?",
    options: ["True", "False", "None", "Ошибка"],
    correctAnswer: 1
  },
  {
    question: 'Какой оператор используется для проверки условия "либо одно, либо другое"?',
    options: ["and", "or", "not", "xor"],
    correctAnswer: 1
  },
  {
    question: "Какой результат выполнения кода:\nx = 10\nif x > 5:\n    print('Больше 5')\nelse:\n    print('Меньше или равно 5')",
    options: ["Больше 5", "Меньше или равно 5", "Ошибка", "Ничего не произойдёт"],
    correctAnswer: 0
  },
  {
    question: "Какой оператор используется для инверсии логического значения?",
    options: ["and", "or", "not", "xor"],
    correctAnswer: 2
  },
  {
    question: 'Какой синтаксис правильный для условия "если значение больше 10, иначе больше 5"?',
    options: [
      "if > 10 else > 5",
      "if x > 10 elif x > 5",
      "if x > 10 else x > 5",
      "if x > 10 elif x == 5 else"
    ],
    correctAnswer: 1
  }
];