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

export const getQuestionsForLesson3_3 = (): Question[] => [
  {
    question: "Что означает инкапсуляция в ООП?",
    options: [
      "Объединение данных и методов в одном классе",
      "Возможность наследовать свойства другого класса",
      "Скрытие реализации и предоставление только интерфейса",
      "Динамическое определение методов во время выполнения"
    ],
    correctAnswer: 2
  },
  {
    question: "Как объявить метод или атрибут приватным?",
    options: [
      "С помощью одного подчёркивания _",
      "С помощью двух подчёркиваний __",
      "С помощью ключевого слова private",
      "Нельзя объявить приватным"
    ],
    correctAnswer: 1
  },
  {
    question: "Что такое полиморфизм в ООП?",
    options: [
      "Возможность создавать экземпляры класса",
      "Способность объекта принимать разные формы",
      "Скрытие данных внутри класса",
      "Наследование от нескольких классов"
    ],
    correctAnswer: 1
  },
  {
    question: "Какой принцип ООП позволяет использовать один интерфейс для разных типов объектов?",
    options: [
      "Инкапсуляция",
      "Полиморфизм",
      "Абстракция",
      "Наследование"
    ],
    correctAnswer: 1
  },
  {
    question: "Как правильно реализовать наследование в Python?\nclass Parent:\n    pass",
    options: [
      "class Child inherit Parent:",
      "class Child extends Parent:",
      "class Child(Parent):",
      "class Child.Parent():"
    ],
    correctAnswer: 2
  }
];

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