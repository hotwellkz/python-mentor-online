import { Question } from '@/types/question';

export const getQuestionsForLesson3_4 = (): Question[] => [
  {
    question: "Какой магический метод вызывается при использовании функции print()?",
    options: [
      "__repr__",
      "__str__",
      "__init__",
      "__call__"
    ],
    correctAnswer: 1
  },
  {
    question: "Чем отличается метод __repr__ от метода __str__?",
    options: [
      "__repr__ используется для программистов, __str__ — для пользователей",
      "__repr__ возвращает строку, __str__ ничего не возвращает",
      "__repr__ не является магическим методом",
      "__str__ вызывается только в конструкторах"
    ],
    correctAnswer: 0
  },
  {
    question: "Как создать статический метод в Python?",
    options: [
      "Добавить декоратор @staticmethod перед методом",
      "Добавить декоратор @static перед методом",
      "Использовать ключевое слово static",
      "Нельзя создавать статические методы в Python"
    ],
    correctAnswer: 0
  },
  {
    question: "Что произойдёт, если обратиться к статическому атрибуту класса?\nclass MyClass:\n    attr = 10\nobj = MyClass()\nprint(obj.attr)",
    options: [
      "Ошибка",
      "Выводится значение 10",
      "Создаётся новый атрибут объекта",
      "Значение будет None"
    ],
    correctAnswer: 1
  },
  {
    question: "Какой магический метод отвечает за определение длины объекта?",
    options: [
      "__len__",
      "__size__",
      "__length__",
      "__get_length__"
    ],
    correctAnswer: 0
  }
];