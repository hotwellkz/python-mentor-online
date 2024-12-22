import { Question } from "@/types/question";

export const getQuestionsForLesson7_1 = (): Question[] => [
  {
    question: "Какой модуль используется для работы с SQLite в Python?",
    options: [
      "sqlite",
      "sqlite3",
      "sql",
      "dbsqlite"
    ],
    correctAnswer: 1
  },
  {
    question: "Как создать подключение к базе данных SQLite?",
    options: [
      "sqlite3.connect('database.db')",
      "sqlite.connect('database.db')",
      "sql.connect('database.db')",
      "db.connect('database.db')"
    ],
    correctAnswer: 0
  },
  {
    question: "Как создать таблицу в SQLite через Python?",
    options: [
      "CREATE TABLE IF NOT EXISTS users (id INT, name CHAR)",
      "CREATE users",
      "cursor.execute()",
      "a и c"
    ],
    correctAnswer: 3
  },
  {
    question: "Что делает метод commit()?",
    options: [
      "Сохраняет изменения в базе данных",
      "Закрывает соединение",
      "Удаляет таблицы",
      "Проверяет соединение"
    ],
    correctAnswer: 0
  },
  {
    question: "Как получить все записи из таблицы users?",
    options: [
      "SELECT ALL FROM users",
      "SELECT * FROM users",
      "SELECT ALL users",
      "GET ALL FROM users"
    ],
    correctAnswer: 1
  }
];