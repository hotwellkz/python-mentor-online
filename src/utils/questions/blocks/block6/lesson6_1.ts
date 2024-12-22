import { Question } from '@/types/question';

export const getQuestionsForLesson6_1 = (): Question[] => {
  return [
    {
      question: "Какой модуль используется для работы с операционной системой?",
      options: [
        "sys",
        "os",
        "platform",
        "shutil"
      ],
      correctAnswer: 1
    },
    {
      question: "Как получить текущую дату и время с помощью модуля datetime?",
      options: [
        "datetime.now()",
        "datetime.current()",
        "datetime.date()",
        "datetime.time()"
      ],
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
      options: [
        "math.sqrt()",
        "math.pow(0.5)",
        "math.square()",
        "math.root()"
      ],
      correctAnswer: 0
    },
    {
      question: "Какой метод модуля os используется для получения списка файлов в директории?",
      options: [
        "os.files()",
        "os.listdir()",
        "os.get_files()",
        "os.dir()"
      ],
      correctAnswer: 1
    }
  ];
};