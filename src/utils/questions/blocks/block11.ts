import { Question } from '@/types/question';

export const getBlock11Questions = (lessonIndex: number): Question[] => {
  const questions: { [key: number]: Question[] } = {
    1: [
      {
        question: "Как организовать структуру консольного приложения?",
        options: [
          "Разделить на модули и классы",
          "Написать весь код в одном файле",
          "Использовать только функции",
          "Не использовать классы"
        ],
        correctAnswer: 0
      },
      {
        question: "Как правильно структурировать Flask приложение?",
        options: [
          "Использовать Blueprint",
          "Все маршруты в одном файле",
          "Не использовать шаблоны",
          "Хранить всё в global"
        ],
        correctAnswer: 0
      },
      {
        question: "Какой метод лучше использовать для парсинга HTML?",
        options: [
          "find() или select()",
          "регулярные выражения",
          "split() строки",
          "простой поиск по тексту"
        ],
        correctAnswer: 0
      },
      {
        question: "Как визуализировать данные с помощью matplotlib?",
        options: [
          "plt.plot() или plt.bar()",
          "print() данных",
          "запись в файл",
          "консольный вывод"
        ],
        correctAnswer: 0
      },
      {
        question: "Как развернуть Flask приложение?",
        options: [
          "Использовать gunicorn и nginx",
          "Запустить через python app.py",
          "Использовать только Flask",
          "Запустить в режиме отладки"
        ],
        correctAnswer: 0
      }
    ]
  };

  return questions[lessonIndex] || [];
};