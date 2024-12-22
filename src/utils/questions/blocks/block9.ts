import { Question } from '@/types/question';

export const getBlock9Questions = (lessonIndex: number): Question[] => {
  const questions: { [key: number]: Question[] } = {
    1: [ // Unit-тесты
      {
        question: "Какой модуль используется для работы с файлами?",
        options: [
          "os",
          "file",
          "system",
          "path"
        ],
        correctAnswer: 0
      },
      {
        question: "Как создать новую директорию?",
        options: [
          "os.mkdir()",
          "os.create_dir()",
          "os.new_folder()",
          "os.make_directory()"
        ],
        correctAnswer: 0
      },
      {
        question: "Как получить список файлов в директории?",
        options: [
          "os.listdir()",
          "os.files()",
          "os.get_files()",
          "os.directory_content()"
        ],
        correctAnswer: 0
      },
      {
        question: "Как запланировать выполнение задачи?",
        options: [
          "schedule.every().day.at('10:30')",
          "cron.daily('10:30')",
          "task.schedule('10:30')",
          "timer.daily('10:30')"
        ],
        correctAnswer: 0
      },
      {
        question: "Как получить аргументы командной строки?",
        options: [
          "sys.argv",
          "os.args",
          "command.arguments",
          "cli.params"
        ],
        correctAnswer: 0
      }
    ],
    2: [ // Покрытие тестов
      {
        question: "Что такое pytest?",
        options: [
          "Фреймворк для тестирования кода в Python",
          "Библиотека для работы с HTTP-запросами",
          "Система управления шаблонами",
          "Анализатор данных"
        ],
        correctAnswer: 0
      },
      {
        question: "Как запустить тесты с использованием pytest?",
        options: [
          "pytest test_file.py",
          "python -m pytest test_file.py",
          "pytest run test_file.py",
          "a и b"
        ],
        correctAnswer: 3
      },
      {
        question: "Как проверить, прошли ли все тесты в pytest?",
        options: [
          "Смотреть в логе: PASSED/FAILED",
          "Проверить вручную",
          "Использовать команду pytest --results",
          "pytest автоматически создаёт отчёт в HTML"
        ],
        correctAnswer: 0
      },
      {
        question: "Что такое покрытие тестов?",
        options: [
          "Процент кода, который выполняется во время тестирования",
          "Количество написанных тестов",
          "Скорость выполнения тестов",
          "Количество проверяемых функций"
        ],
        correctAnswer: 0
      },
      {
        question: "Как использовать библиотеку pytest-cov для покрытия тестов?",
        options: [
          "pytest --cov",
          "pytest --coverage",
          "pytest --cov-report",
          "pytest --coverage-report"
        ],
        correctAnswer: 0
      }
    ]
  };

  return questions[lessonIndex] || [];
};
