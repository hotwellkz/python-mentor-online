import { Question } from "@/types/question";

export const getQuestionsForLesson2_5 = (): Question[] => [
  {
    question: "Какой метод используется для добавления элемента в список?",
    options: ["append()", "add()", "insert()", "extend()"],
    correctAnswer: 0
  },
  {
    question: "Чем отличается кортеж от списка?",
    options: [
      "Кортеж неизменяемый, список изменяемый",
      "Кортеж поддерживает только числа",
      "Кортеж не может быть пустым",
      "У кортежа нет индексов"
    ],
    correctAnswer: 0
  },
  {
    question: 'Как обратиться к значению по ключу в словаре?\nmy_dict = {"ключ": "значение"}',
    options: [
      "my_dict.ключ",
      "my_dict[ключ]",
      'my_dict["ключ"]',
      "my_dict.get(ключ)"
    ],
    correctAnswer: 2
  },
  {
    question: "Какой метод используется для удаления элемента из множества?",
    options: ["delete()", "remove()", "discard()", "b и c"],
    correctAnswer: 3
  },
  {
    question: 'Что вернёт len(["a", "b", "c"])?',
    options: ["3", "2", "Ошибка", "Ничего"],
    correctAnswer: 0
  }
];