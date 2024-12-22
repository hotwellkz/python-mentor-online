import { Question } from "@/types/question";

export const getQuestionsForLesson2_2 = (): Question[] => [
  {
    question: "Как называется команда для извлечения данных из таблицы?",
    options: [
      "SELECT",
      "INSERT",
      "DELETE",
      "UPDATE"
    ],
    correctAnswer: 0
  },
  {
    question: "Что делает команда GROUP BY?",
    options: [
      "Сортирует данные",
      "Группирует данные по указанному столбцу",
      "Удаляет дубликаты",
      "Добавляет столбец"
    ],
    correctAnswer: 1
  },
  {
    question: "Какой оператор используется для фильтрации строк?",
    options: [
      "WHERE",
      "HAVING",
      "SELECT",
      "ORDER BY"
    ],
    correctAnswer: 0
  },
  {
    question: "Что возвращает SQL-запрос: SELECT COUNT(*) FROM table;?",
    options: [
      "Число столбцов",
      "Общее количество строк",
      "Уникальные строки",
      "Последнюю строку"
    ],
    correctAnswer: 1
  },
  {
    question: "Как объединить две таблицы в SQL?",
    options: [
      "INSERT",
      "MERGE",
      "JOIN",
      "UNION"
    ],
    correctAnswer: 2
  }
];