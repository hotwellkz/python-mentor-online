import { Question } from "@/types/question";

export const getQuestionsForLesson1_2 = (): Question[] => [
  {
    question: "Какой формат данных обычно используется для хранения таблиц?",
    options: [
      "JSON",
      "CSV",
      "HTML",
      "PDF"
    ],
    correctAnswer: 1
  },
  {
    question: "Какой этап идет перед обработкой данных?",
    options: [
      "Визуализация данных",
      "Анализ данных",
      "Сбор данных",
      "Проверка гипотез"
    ],
    correctAnswer: 2
  },
  {
    question: "Какие типы данных поддерживаются в SQL?",
    options: [
      "Табличные данные",
      "Визуализации",
      "Видео",
      "Числовые, текстовые, временные"
    ],
    correctAnswer: 3
  },
  {
    question: "Какой инструмент чаще всего используют для анализа больших массивов данных?",
    options: [
      "Excel",
      "Python",
      "Word",
      "PowerPoint"
    ],
    correctAnswer: 1
  },
  {
    question: "Какой из следующих этапов относится к анализу данных?",
    options: [
      "Удаление файлов",
      "Построение моделей",
      "Очистка и поиск паттернов",
      "Создание интерфейсов"
    ],
    correctAnswer: 2
  }
];