import { Question } from "@/types/question";

export const getQuestionsForLesson6_3 = (): Question[] => [
  {
    question: "Для чего используется библиотека requests?",
    options: [
      "Обработка данных",
      "Выполнение HTTP-запросов",
      "Работа с JSON",
      "Создание графиков"
    ],
    correctAnswer: 1
  },
  {
    question: "Какая функция используется для отправки GET-запроса с помощью requests?",
    options: [
      "requests.send()",
      "requests.post()",
      "requests.get()",
      "requests.fetch()"
    ],
    correctAnswer: 2
  },
  {
    question: "Что делает библиотека BeautifulSoup?",
    options: [
      "Сортирует файлы",
      "Обрабатывает HTML и XML данные",
      "Создаёт запросы к API",
      "Работает с базами данных"
    ],
    correctAnswer: 1
  },
  {
    question: "Какой из следующих модулей нужен для работы с HTML в BeautifulSoup?",
    options: [
      "html.parser",
      "lxml",
      "bs4.parser",
      "a и b"
    ],
    correctAnswer: 3
  },
  {
    question: "Как выбрать все элементы с тегом <a> в документе с помощью BeautifulSoup?",
    options: [
      "soup.find_all('a')",
      "soup.select('a')",
      "soup.get('a')",
      "a и b"
    ],
    correctAnswer: 3
  }
];