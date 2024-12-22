import { Question } from "@/types/question";

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

export const getQuestionsForLesson3_2 = (): Question[] => [
  {
    question: "Что делает метод __init__ в классе?",
    options: [
      "Выполняет начальную настройку объекта",
      "Создаёт новый класс",
      "Удаляет объект",
      "Определяет методы класса"
    ],
    correctAnswer: 0
  },
  {
    question: "Как правильно передать значение атрибута через __init__?\nclass MyClass:\n    def __init__(self, name):\n        self.name = name",
    options: [
      'obj = MyClass(name="Test")',
      "obj = MyClass()",
      "obj = MyClass(name)",
      "obj = init MyClass(name)"
    ],
    correctAnswer: 0
  },
  {
    question: "Что выведет следующий код?\nclass MyClass:\n    def __init__(self, value):\n        self.value = value\nobj = MyClass(5)\nprint(obj.value)",
    options: ["5", "None", "Ошибка", "value"],
    correctAnswer: 0
  },
  {
    question: "Какой результат выполнения следующего кода?\nclass MyClass:\n    attr = 'Пример'\nobj = MyClass()\nobj.attr = 'Изменено'\nprint(MyClass.attr)",
    options: ['"Изменено"', '"Пример"', "Ошибка", "None"],
    correctAnswer: 1
  },
  {
    question: "Чем отличаются атрибуты класса от атрибутов объекта?",
    options: [
      "Атрибуты класса общие для всех объектов, атрибуты объекта индивидуальны",
      "Атрибуты класса создаются динамически",
      "Атрибуты объекта всегда неизменяемы",
      "Атрибуты класса изменяются только через self"
    ],
    correctAnswer: 0
  }
];