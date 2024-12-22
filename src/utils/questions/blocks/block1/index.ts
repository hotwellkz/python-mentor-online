import { Question } from '@/types/question';

export const getBlock1Questions = (lessonIndex: number): Question[] => {
  const questions: { [key: number]: Question[] } = {
    1: [
      {
        question: "Почему Python считается лучшим языком для начинающих программистов?",
        options: [
          "Простой и понятный синтаксис",
          "Сложная система типов",
          "Отсутствие документации",
          "Малое количество библиотек"
        ],
        correctAnswer: 0
      },
      {
        question: "Какую версию Python лучше установить для начала обучения?",
        options: [
          "Последнюю стабильную версию Python 3",
          "Python 2.7",
          "Бета-версию Python 4",
          "Любую версию"
        ],
        correctAnswer: 0
      },
      {
        question: "Какой редактор кода лучше выбрать для начинающего Python-разработчика?",
        options: [
          "Visual Studio Code",
          "Блокнот",
          "Word",
          "Excel"
        ],
        correctAnswer: 0
      },
      {
        question: "Как запустить Python через командную строку?",
        options: [
          "python",
          "start python",
          "run python",
          "execute python"
        ],
        correctAnswer: 0
      }
    ],
    2: [
      {
        question: "Какую версию Python лучше установить для начала обучения?",
        options: [
          "Последнюю стабильную версию Python 3",
          "Python 2.7",
          "Бета-версию Python 4",
          "Любую версию"
        ],
        correctAnswer: 0
      },
      {
        question: "Какой редактор кода лучше выбрать для начинающего Python-разработчика?",
        options: [
          "Visual Studio Code",
          "Блокнот",
          "Word",
          "Excel"
        ],
        correctAnswer: 0
      },
      {
        question: "Как запустить Python через командную строку?",
        options: [
          "python",
          "start python",
          "run python",
          "execute python"
        ],
        correctAnswer: 0
      },
      {
        question: "Как проверить успешность установки Python?",
        options: [
          "Запустить python в терминале",
          "Проверить наличие файла python.exe",
          "Скачать и установить снова",
          "Проверить наличие папки Python в Program Files"
        ],
        correctAnswer: 0
      }
    ],
    3: [
      {
        question: "Какой редактор кода лучше выбрать для начинающего Python-разработчика?",
        options: [
          "Visual Studio Code",
          "Блокнот",
          "Word",
          "Excel"
        ],
        correctAnswer: 0
      },
      {
        question: "Какие плагины VS Code обязательны для Python-разработки?",
        options: [
          "Python, Pylance",
          "HTML, CSS",
          "Java, C++",
          "Markdown"
        ],
        correctAnswer: 0
      },
      {
        question: "Как настроить автоформатирование кода в редакторе?",
        options: [
          "Использовать настройки редактора",
          "Установить плагин",
          "Изменить настройки системы",
          "Невозможно настроить"
        ],
        correctAnswer: 0
      },
      {
        question: "Чем PyCharm отличается от VS Code для Python-разработки?",
        options: [
          "PyCharm специализирован для Python",
          "VS Code быстрее",
          "PyCharm бесплатен",
          "VS Code не поддерживает Python"
        ],
        correctAnswer: 0
      }
    ],
    4: [
      {
        question: "Как запустить Python через командную строку?",
        options: [
          "python",
          "start python",
          "run python",
          "execute python"
        ],
        correctAnswer: 0
      },
      {
        question: "Какие основные команды терминала нужно знать для работы с Python?",
        options: [
          "cd, ls, python",
          "mkdir, rm, python",
          "open, close, python",
          "run, stop, python"
        ],
        correctAnswer: 0
      },
      {
        question: "Как создать и запустить первую программу на Python?",
        options: [
          "Создать файл .py и запустить его",
          "Запустить python и ввести код",
          "Создать файл .txt и запустить его",
          "Невозможно запустить программу"
        ],
        correctAnswer: 0
      },
      {
        question: "Что такое IDLE и когда его использовать?",
        options: [
          "Интегрированная среда разработки для Python",
          "Терминал для запуска Python",
          "Редактор кода",
          "Неизвестный термин"
        ],
        correctAnswer: 0
      }
    ]
  };

  return questions[lessonIndex] || [];
};
