import { Question } from '@/types/question';

export const getBlock8Questions = (lessonIndex: number): Question[] => {
  const questions: { [key: string]: Question[] } = {
    1: [ // Урок 1: Работа над командным проектом
      {
        question: "Как организовать работу команды?",
        options: [
          "Распределить роли и ответственности",
          "Работать без плана",
          "Все делать самому",
          "Не организовывать"
        ],
        correctAnswer: 0
      },
      {
        question: "Как контролировать прогресс проекта?",
        options: [
          "Регулярные статус-митинги",
          "Не контролировать",
          "Случайные проверки",
          "Ждать результата"
        ],
        correctAnswer: 0
      },
      {
        question: "Как обеспечить качество работы?",
        options: [
          "Регулярные проверки и обратная связь",
          "Не проверять",
          "Довериться удаче",
          "Проверить в конце"
        ],
        correctAnswer: 0
      },
      {
        question: "Как мотивировать команду?",
        options: [
          "Четкие цели и признание достижений",
          "Критика",
          "Игнорирование",
          "Штрафы"
        ],
        correctAnswer: 0
      },
      {
        question: "Как решать проблемы в команде?",
        options: [
          "Открытое обсуждение и поиск решений",
          "Игнорировать проблемы",
          "Обвинять других",
          "Ждать, пока решатся сами"
        ],
        correctAnswer: 0
      }
    ],
    2: [ // Урок 2: Подготовка к трудоустройству
      {
        question: "Что должно быть в резюме бизнес-аналитика?",
        options: [
          "Опыт, навыки и достижения",
          "Только образование",
          "Только опыт",
          "Личные интересы"
        ],
        correctAnswer: 0
      },
      {
        question: "Как подготовиться к собеседованию?",
        options: [
          "Изучить компанию и подготовить примеры",
          "Не готовиться",
          "Выучить теорию",
          "Надеяться на удачу"
        ],
        correctAnswer: 0
      },
      {
        question: "Что включить в портфолио?",
        options: [
          "Примеры проектов и достижений",
          "Только дипломы",
          "Только сертификаты",
          "Личные фото"
        ],
        correctAnswer: 0
      },
      {
        question: "Как презентовать свои soft skills?",
        options: [
          "Через примеры из опыта",
          "Просто перечислить",
          "Не упоминать",
          "Преувеличить"
        ],
        correctAnswer: 0
      },
      {
        question: "Как развивать профессиональные навыки?",
        options: [
          "Практика, обучение и networking",
          "Только чтение",
          "Только практика",
          "Не развивать"
        ],
        correctAnswer: 0
      }
    ],
    3: [ // Урок 3: Итоговая работа
      {
        question: "Как структурировать итоговую презентацию?",
        options: [
          "Цели, методы, результаты, выводы",
          "Только результаты",
          "Только методы",
          "Без структуры"
        ],
        correctAnswer: 0
      },
      {
        question: "Как оценить успешность проекта?",
        options: [
          "По достижению целей и KPI",
          "По затраченному времени",
          "По количеству документов",
          "Не оценивать"
        ],
        correctAnswer: 0
      },
      {
        question: "Что включить в документацию проекта?",
        options: [
          "Описание, схемы, результаты, рекомендации",
          "Только описание",
          "Только схемы",
          "Минимум информации"
        ],
        correctAnswer: 0
      },
      {
        question: "Как подготовить защиту проекта?",
        options: [
          "Структурировать материал и подготовить ответы",
          "Импровизировать",
          "Минимальная подготовка",
          "Не готовиться"
        ],
        correctAnswer: 0
      },
      {
        question: "Как получить обратную связь по проекту?",
        options: [
          "Провести опрос стейкхолдеров",
          "Не спрашивать",
          "Подождать комментариев",
          "Сделать выводы самому"
        ],
        correctAnswer: 0
      }
    ]
  };

  return questions[lessonIndex] || [];
};