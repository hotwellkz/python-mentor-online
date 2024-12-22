import { Question } from '@/types/question';

export const getQuestionsForLesson6_1 = (): Question[] => [
  {
    question: "Какой модуль используется для работы с операционной системой?",
    options: ["sys", "os", "platform", "shutil"],
    correctAnswer: 1
  },
  {
    question: "Как получить текущую дату и время с помощью модуля datetime?",
    options: ["datetime.now()", "datetime.current()", "datetime.date()", "datetime.time()"],
    correctAnswer: 0
  },
  {
    question: "Как сгенерировать случайное число в диапазоне от 1 до 10 с помощью модуля random?",
    options: [
      "random.int(1, 10)",
      "random.randint(1, 10)",
      "random.range(1, 10)",
      "random.number(1, 10)"
    ],
    correctAnswer: 1
  },
  {
    question: "Как вычислить квадратный корень числа с помощью модуля math?",
    options: ["math.sqrt()", "math.pow(0.5)", "math.square()", "math.root()"],
    correctAnswer: 0
  },
  {
    question: "Какой метод модуля os используется для получения списка файлов в директории?",
    options: ["os.files()", "os.listdir()", "os.get_files()", "os.dir()"],
    correctAnswer: 1
  }
];

export const getQuestionsForLesson6_2 = (): Question[] => [
  {
    question: "Как установить стороннюю библиотеку с помощью pip?",
    options: [
      "pip install <имя_библиотеки>",
      "pip add <имя_библиотеки>",
      "pip update <имя_библиотеки>",
      "pip download <имя_библиотеки>"
    ],
    correctAnswer: 0
  },
  {
    question: "Где хранятся сторонние библиотеки, установленные через pip?",
    options: [
      "В папке проекта",
      "В системных библиотеках Python",
      "В виртуальном окружении (если оно используется)",
      "b и c"
    ],
    correctAnswer: 3
  },
  {
    question: "Как обновить установленную библиотеку?",
    options: [
      "pip update <имя_библиотеки>",
      "pip upgrade <имя_библиотеки>",
      "pip install --upgrade <имя_библиотеки>",
      "pip update --force <имя_библиотеки>"
    ],
    correctAnswer: 2
  },
  {
    question: "Как проверить версию установленной библиотеки?",
    options: [
      "pip version <имя_библиотеки>",
      "pip show <имя_библиотеки>",
      "pip list | grep <имя_библиотеки>",
      "b и c"
    ],
    correctAnswer: 3
  },
  {
    question: "Что такое PyPI?",
    options: [
      "Утилита для работы с Python",
      "Репозиторий сторонних библиотек для Python",
      "Программа для отладки Python",
      "Менеджер зависимостей"
    ],
    correctAnswer: 1
  }
];

export const getBlock6Questions = (lessonIndex: number): Question[] => {
  switch (lessonIndex) {
    case 1:
      return getQuestionsForLesson6_1();
    case 2:
      return getQuestionsForLesson6_2();
    default:
      return [];
  }
};