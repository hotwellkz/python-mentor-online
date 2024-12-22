import { Question } from '@/types/question';

export const getQuestionsForLesson4_1 = (): Question[] => [
  {
    question: "Как импортировать стандартный модуль math в Python?",
    options: [
      "import math",
      "include math",
      "using math",
      "add math"
    ],
    correctAnswer: 0
  },
  {
    question: "Как импортировать только функцию sqrt из модуля math?",
    options: [
      "import math.sqrt",
      "from math import sqrt",
      "include sqrt from math",
      "using sqrt from math"
    ],
    correctAnswer: 1
  },
  {
    question: "Как называется файл, указывающий на то, что каталог является пакетом?",
    options: [
      "module.py",
      "package.py",
      "init.py",
      "main.py"
    ],
    correctAnswer: 2
  },
  {
    question: "Как создать собственный модуль в Python?",
    options: [
      "Создать файл с расширением .mod",
      "Создать файл с расширением .py",
      "Создать папку с именем модуля",
      "Добавить его в sys.path"
    ],
    correctAnswer: 1
  },
  {
    question: "Что произойдёт, если импортировать модуль дважды?",
    options: [
      "Модуль импортируется дважды",
      "Python выдаст ошибку",
      "Импорт произойдёт только один раз",
      "Зависит от версии Python"
    ],
    correctAnswer: 2
  }
];

export const getQuestionsForLesson4_2 = (): Question[] => [
  {
    question: "Как открыть файл для чтения?",
    options: [
      "open(filename, 'read')",
      "open(filename, 'r')",
      "open(filename, 'rw')",
      "open(filename, 'read-only')"
    ],
    correctAnswer: 1
  },
  {
    question: "Что делает метод readline()?",
    options: [
      "Читает весь файл",
      "Читает одну строку",
      "Читает несколько строк",
      "Записывает строку в файл"
    ],
    correctAnswer: 1
  },
  {
    question: "Что происходит при использовании метода close()?",
    options: [
      "Файл удаляется",
      "Файл закрывается для дальнейшей работы",
      "Содержимое файла очищается",
      "Закрытие не влияет на файл"
    ],
    correctAnswer: 1
  },
  {
    question: "Как открыть файл для записи, не удаляя его содержимое?",
    options: [
      "open(filename, 'r')",
      "open(filename, 'w')",
      "open(filename, 'a')",
      "open(filename, 'rw')"
    ],
    correctAnswer: 2
  },
  {
    question: "Что произойдёт, если открыть несуществующий файл с режимом w?",
    options: [
      "Возникнет ошибка",
      "Создастся новый файл",
      "Файл не будет открыт",
      "Откроется в режиме чтения"
    ],
    correctAnswer: 1
  }
];

export const getQuestionsForLesson4_3 = (): Question[] => [
  {
    question: "Какой модуль используется для работы с JSON в Python?",
    options: [
      "json",
      "jsonify",
      "serialize",
      "dict_parser"
    ],
    correctAnswer: 0
  },
  {
    question: "Как преобразовать Python-словарь в строку JSON?",
    options: [
      "json.dump()",
      "json.dumps()",
      "json.load()",
      "json.loads()"
    ],
    correctAnswer: 1
  },
  {
    question: "Какая функция используется для записи JSON-данных в файл?",
    options: [
      "json.write()",
      "json.dumps()",
      "json.dump()",
      "json.save()"
    ],
    correctAnswer: 2
  },
  {
    question: "Что вернёт функция json.loads()?",
    options: [
      "Python-объект",
      "JSON-строку",
      "Файл",
      "Список ключей"
    ],
    correctAnswer: 0
  },
  {
    question: "Что произойдёт, если файл JSON содержит некорректные данные?",
    options: [
      "Файл будет прочитан с ошибками",
      "Возникнет исключение JSONDecodeError",
      "Некорректные данные будут пропущены",
      "Ничего не произойдёт"
    ],
    correctAnswer: 1
  }
];

export const getQuestionsForLesson4_4 = (): Question[] => [
  {
    question: "Как создать виртуальное окружение с помощью встроенного модуля Python?",
    options: [
      "python -m virtualenv env",
      "python -m venv env",
      "python create_env env",
      "virtualenv create env"
    ],
    correctAnswer: 1
  },
  {
    question: "Как активировать виртуальное окружение в Windows?",
    options: [
      "source env/bin/activate",
      "env\\Scripts\\activate",
      ".\\env\\activate",
      "activate env"
    ],
    correctAnswer: 1
  },
  {
    question: "Как установить пакет внутри виртуального окружения?",
    options: [
      "pip install package",
      "python install package",
      "pip get package",
      "python -m package install"
    ],
    correctAnswer: 0
  },
  {
    question: "Как просмотреть список установленных пакетов?",
    options: [
      "pip show",
      "pip list",
      "pip packages",
      "python -m packages"
    ],
    correctAnswer: 1
  },
  {
    question: "Как удалить виртуальное окружение?",
    options: [
      "deactivate",
      "pip uninstall env",
      "Удалить папку окружения вручную",
      "deactivate и удалить папку вручную"
    ],
    correctAnswer: 3
  }
];

export const getBlock4Questions = (lessonIndex: number): Question[] => {
  switch (lessonIndex) {
    case 1:
      return getQuestionsForLesson4_1();
    case 2:
      return getQuestionsForLesson4_2();
    case 3:
      return getQuestionsForLesson4_3();
    case 4:
      return getQuestionsForLesson4_4();
    default:
      return [];
  }
};