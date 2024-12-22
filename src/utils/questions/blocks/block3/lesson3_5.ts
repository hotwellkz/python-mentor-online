import { Question } from '@/types/question';

export const getQuestionsForLesson3_5 = (): Question[] => [
  {
    question: "Как вызвать метод родительского класса в дочернем классе?\nclass Parent:\n    def greet(self):\n        print('Hello from Parent!')\nclass Child(Parent):\n    def greet(self):\n        print('Hello from Child!')",
    options: [
      "super().greet()",
      "Parent.greet(self)",
      "super.greet()",
      "a и b"
    ],
    correctAnswer: 3
  },
  {
    question: "Что произойдёт, если в дочернем классе не переопределить метод родительского класса?",
    options: [
      "Используется метод родительского класса",
      "Возникает ошибка",
      "Метод будет пропущен",
      "Создаётся пустой метод"
    ],
    correctAnswer: 0
  },
  {
    question: "Какой результат выполнения следующего кода?\nclass Parent:\n    def say(self):\n        return 'Parent'\nclass Child(Parent):\n    pass\nobj = Child()\nprint(obj.say())",
    options: [
      "'Child'",
      "'Parent'",
      "Ошибка",
      "None"
    ],
    correctAnswer: 1
  },
  {
    question: "Какой из следующих классов является родительским?\nclass A:\n    pass\nclass B(A):\n    pass",
    options: [
      "A",
      "B",
      "Оба",
      "Никакой"
    ],
    correctAnswer: 0
  },
  {
    question: "Что такое множественное наследование?",
    options: [
      "Наследование от двух и более классов",
      "Наследование от базового класса и его методов",
      "Создание дочернего класса",
      "Дублирование атрибутов класса"
    ],
    correctAnswer: 0
  }
];