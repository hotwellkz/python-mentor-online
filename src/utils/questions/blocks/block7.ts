import { Question } from '@/types/question';

export const getBlock7Questions = (lessonIndex: number): Question[] => {
  const questions: { [key: number]: Question[] } = {
    1: [ // SQLite и SQL
      {
        question: "Какая команда используется для создания таблицы в SQLite?",
        options: [
          "CREATE TABLE",
          "MAKE TABLE",
          "NEW TABLE",
          "BUILD TABLE"
        ],
        correctAnswer: 0
      },
      {
        question: "Как выполнить параметризованный запрос в Python с SQLite?",
        options: [
          "cursor.execute('SELECT * FROM users WHERE id = ?', (user_id,))",
          "cursor.query('SELECT * FROM users WHERE id = ' + user_id)",
          "cursor.select('users', id=user_id)",
          "cursor.run('SELECT * FROM users WHERE id = %s' % user_id)"
        ],
        correctAnswer: 0
      },
      {
        question: "Какой метод используется для сохранения изменений в базе данных?",
        options: [
          "commit()",
          "save()",
          "update()",
          "store()"
        ],
        correctAnswer: 0
      },
      {
        question: "Как закрыть соединение с базой данных?",
        options: [
          "connection.close()",
          "connection.end()",
          "connection.disconnect()",
          "connection.stop()"
        ],
        correctAnswer: 0
      },
      {
        question: "Какой тип данных НЕ поддерживается в SQLite?",
        options: [
          "ARRAY",
          "TEXT",
          "INTEGER",
          "REAL"
        ],
        correctAnswer: 0
      }
    ],
    2: [ // Введение в ORM
      {
        question: "Что такое ORM?",
        options: [
          "Object-Relational Mapping",
          "Object-Related Model",
          "Online Resource Manager",
          "Output Response Method"
        ],
        correctAnswer: 0
      },
      {
        question: "Как создать модель в SQLAlchemy?",
        options: [
          "Наследоваться от Base",
          "Использовать @model декоратор",
          "Создать класс Model",
          "Импортировать model"
        ],
        correctAnswer: 0
      },
      {
        question: "Какой метод используется для добавления записи в базу через SQLAlchemy?",
        options: [
          "session.add()",
          "session.insert()",
          "session.create()",
          "session.new()"
        ],
        correctAnswer: 0
      },
      {
        question: "Как создать связь один-ко-многим в SQLAlchemy?",
        options: [
          "relationship()",
          "foreign_key()",
          "connect()",
          "link()"
        ],
        correctAnswer: 0
      },
      {
        question: "Какое преимущество дает использование ORM?",
        options: [
          "Работа с объектами вместо SQL запросов",
          "Более быстрая работа с базой данных",
          "Меньше места на диске",
          "Автоматическое создание базы данных"
        ],
        correctAnswer: 0
      }
    ]
  };

  return questions[lessonIndex] || [];
};