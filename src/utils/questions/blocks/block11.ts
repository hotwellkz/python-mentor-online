import { Question } from '@/types/question';

export const getBlock11Questions = (lessonIndex: number): Question[] => {
  const questions: { [key: number]: Question[] } = {
    1: [ // To-Do List Project
      {
        question: "Какой тип данных лучше всего подходит для хранения задач в To-Do List?",
        options: [
          "Список (list)",
          "Словарь (dict)",
          "Кортеж (tuple)",
          "Множество (set)"
        ],
        correctAnswer: 0
      },
      {
        question: "Как сохранить данные списка задач при завершении программы?",
        options: [
          "Сохранить в файл",
          "Сохранить в базу данных",
          "Сохранить в переменной",
          "a и b"
        ],
        correctAnswer: 3
      },
      {
        question: "Как реализовать добавление задачи в список через консоль?",
        options: [
          "Использовать функцию input()",
          "Использовать CLI-фреймворк",
          "Добавить через модуль json",
          "Использовать библиотеку requests"
        ],
        correctAnswer: 0
      },
      {
        question: "Как проверить, пуста ли задача перед добавлением?",
        options: [
          "Использовать условие if task:",
          "Использовать try/except",
          "Использовать модуль logging",
          "Использовать input validation"
        ],
        correctAnswer: 0
      },
      {
        question: "Как выполнить тестирование функциональности To-Do List?",
        options: [
          "Написать unit-тесты для каждой функции",
          "Проверить вручную",
          "Написать pytest-скрипты",
          "a и c"
        ],
        correctAnswer: 3
      }
    ],
    2: [ // Flask Web Application
      {
        question: "Какой метод HTTP используется для получения всех заметок?",
        options: [
          "GET",
          "POST",
          "PUT",
          "DELETE"
        ],
        correctAnswer: 0
      },
      {
        question: "Какой модуль Flask используется для работы с базой данных?",
        options: [
          "flask_sqlalchemy",
          "flask_db",
          "flask_database",
          "flask_storage"
        ],
        correctAnswer: 0
      },
      {
        question: "Какой метод используется для отправки новой заметки?",
        options: [
          "POST",
          "GET",
          "DELETE",
          "PATCH"
        ],
        correctAnswer: 0
      },
      {
        question: "Как сохранить данные заметки в базе данных?",
        options: [
          "Создать объект модели и вызвать метод add()",
          "Создать объект модели и вызвать метод commit()",
          "Добавить данные в JSON-файл",
          "a и b"
        ],
        correctAnswer: 3
      },
      {
        question: "Как отобразить список заметок в веб-интерфейсе?",
        options: [
          "Использовать Jinja2 для рендеринга HTML",
          "Использовать модуль requests",
          "Использовать SQLAlchemy напрямую",
          "Использовать библиотеки визуализации"
        ],
        correctAnswer: 0
      }
    ],
    3: [ // Data Parsing Project
      {
        question: "Какой модуль лучше всего подходит для парсинга HTML?",
        options: [
          "BeautifulSoup",
          "requests",
          "sqlite3",
          "pandas"
        ],
        correctAnswer: 0
      },
      {
        question: "Как загрузить HTML-страницу для парсинга?",
        options: [
          "Использовать requests.get()",
          "Использовать open()",
          "Использовать json.load()",
          "Использовать BeautifulSoup напрямую"
        ],
        correctAnswer: 0
      },
      {
        question: "Как сохранить спарсенные данные в SQLite?",
        options: [
          "Использовать sqlite3 для создания и записи данных",
          "Использовать pandas для записи данных",
          "Использовать JSON для сериализации",
          "Использовать CSV"
        ],
        correctAnswer: 0
      },
      {
        question: "Как найти все элементы с классом \"article-title\" на странице?",
        options: [
          "class_=\"article-title\"",
          "name=\"article-title\"",
          "class=\"article-title\"",
          "tag=\"article-title\""
        ],
        correctAnswer: 0
      },
      {
        question: "Какую библиотеку можно использовать для автоматизации парсинга?",
        options: [
          "Selenium",
          "Scrapy",
          "BeautifulSoup",
          "a и b"
        ],
        correctAnswer: 3
      }
    ]
  };

  return questions[lessonIndex] || [];
};