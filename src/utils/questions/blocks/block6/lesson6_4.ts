import { Question } from "@/types/question";

export const getQuestionsForLesson6_4 = (): Question[] => [
  {
    question: "Для чего используется библиотека pandas?",
    options: [
      "Работа с базами данных",
      "Обработка и анализ табличных данных",
      "Визуализация графиков",
      "Выполнение HTTP-запросов"
    ],
    correctAnswer: 1
  },
  {
    question: "Как создать объект DataFrame в pandas?",
    options: [
      "pd.create_frame()",
      "pd.DataFrame()",
      "pd.new_frame()",
      "pd.create_data()"
    ],
    correctAnswer: 1
  },
  {
    question: "Какой метод используется для получения первых строк DataFrame?",
    options: [
      "head()",
      "top()",
      "first()",
      "preview()"
    ],
    correctAnswer: 0
  },
  {
    question: "Для чего предназначена библиотека matplotlib?",
    options: [
      "Отправка запросов",
      "Создание графиков и диаграмм",
      "Работа с HTML",
      "Работа с многопоточностью"
    ],
    correctAnswer: 1
  },
  {
    question: "Как построить линейный график в matplotlib?",
    options: [
      "plt.plot()",
      "plt.line()",
      "plt.graph()",
      "plt.draw()"
    ],
    correctAnswer: 0
  }
];