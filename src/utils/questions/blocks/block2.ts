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

export const getQuestionsForLesson2_2 = (): Question[] => [
  {
    question: 'Какой синтаксис используется для вывода текста "Привет, мир!"?',
    options: [
      'print("Привет, мир!")',
      'echo "Привет, мир!"',
      'output("Привет, мир!")',
      'write("Привет, мир!")'
    ],
    correctAnswer: 0
  },
  {
    question: "Что делает функция input()?",
    options: [
      "Выполняет вывод текста",
      "Считывает данные от пользователя",
      "Сохраняет файл",
      "Завершает программу"
    ],
    correctAnswer: 1
  },
  {
    question: 'Какое значение будет у переменной x после выполнения x = input("Введите число: ")?',
    options: [
      "Число",
      "Строка",
      "Логическое значение",
      "Зависит от введённых данных"
    ],
    correctAnswer: 1
  },
  {
    question: "Как вывести строку и значение переменной на одной линии?",
    options: [
      'print("Значение:", x)',
      'print("Значение:" + x)',
      'print(f"Значение: {x}")',
      "Все варианты правильны"
    ],
    correctAnswer: 3
  },
  {
    question: "Что произойдёт, если не указать текст в input()?",
    options: [
      "Ошибка",
      "Будет ждать ввода без вывода текста",
      "Программа завершится",
      "Будет напечатан текст по умолчанию"
    ],
    correctAnswer: 1
  }
];

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
