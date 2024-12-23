import { Question } from '@/types/question';

export const getBlock6Questions = (lessonIndex: number): Question[] => {
  const questions: { [key: string]: Question[] } = {
    1: [ // Урок 1: Основы финансов для бизнес-аналитика
      {
        question: "Что такое ROI?",
        options: [
          "Возврат инвестиций",
          "Название компании",
          "Тип отчета",
          "Метод разработки"
        ],
        correctAnswer: 0
      },
      {
        question: "Как рассчитать NPV?",
        options: [
          "Сумма дисконтированных денежных потоков",
          "Сложить все расходы",
          "Вычесть все доходы",
          "Умножить на два"
        ],
        correctAnswer: 0
      },
      {
        question: "Что такое CAPEX?",
        options: [
          "Капитальные затраты",
          "Операционные расходы",
          "Доходы компании",
          "Название отчета"
        ],
        correctAnswer: 0
      },
      {
        question: "Что такое OPEX?",
        options: [
          "Операционные расходы",
          "Капитальные затраты",
          "Прибыль компании",
          "Тип инвестиций"
        ],
        correctAnswer: 0
      },
      {
        question: "Как оценить окупаемость проекта?",
        options: [
          "Рассчитать период окупаемости",
          "Спросить руководителя",
          "Случайное предположение",
          "Не оценивать"
        ],
        correctAnswer: 0
      }
    ],
    2: [ // Урок 2: Подготовка бизнес-кейсов
      {
        question: "Что должен включать бизнес-кейс?",
        options: [
          "Цели, затраты, выгоды и риски",
          "Только затраты",
          "Только выгоды",
          "Только риски"
        ],
        correctAnswer: 0
      },
      {
        question: "Как оценить риски проекта?",
        options: [
          "Анализ вероятности и влияния",
          "Игнорировать риски",
          "Случайная оценка",
          "Не оценивать"
        ],
        correctAnswer: 0
      },
      {
        question: "Что такое cost-benefit анализ?",
        options: [
          "Сравнение затрат и выгод",
          "Только расчет затрат",
          "Только расчет выгод",
          "Расчет рисков"
        ],
        correctAnswer: 0
      },
      {
        question: "Как оценить качественные выгоды?",
        options: [
          "Через косвенные показатели",
          "Игнорировать их",
          "Случайная оценка",
          "Не оценивать"
        ],
        correctAnswer: 0
      },
      {
        question: "Что такое sensitivity analysis?",
        options: [
          "Анализ чувствительности к изменениям",
          "Анализ рисков",
          "Расчет затрат",
          "Оценка выгод"
        ],
        correctAnswer: 0
      }
    ],
    3: [ // Урок 3: Практическое применение
      {
        question: "Как презентовать финансовый анализ руководству?",
        options: [
          "Кратко, с акцентом на ключевые показатели",
          "Показать все расчеты",
          "Только графики",
          "Только текст"
        ],
        correctAnswer: 0
      },
      {
        question: "Какой метод оценки проекта самый надежный?",
        options: [
          "Комбинация нескольких методов",
          "Только ROI",
          "Только NPV",
          "Случайный выбор"
        ],
        correctAnswer: 0
      },
      {
        question: "Как учитывать риски в финансовой модели?",
        options: [
          "Через коэффициенты и сценарии",
          "Игнорировать риски",
          "Случайная оценка",
          "Не учитывать"
        ],
        correctAnswer: 0
      },
      {
        question: "Что такое break-even analysis?",
        options: [
          "Анализ точки безубыточности",
          "Анализ прибыли",
          "Анализ затрат",
          "Анализ рисков"
        ],
        correctAnswer: 0
      },
      {
        question: "Как оценить эффективность инвестиций?",
        options: [
          "Сравнить ROI с альтернативами",
          "Случайная оценка",
          "Не оценивать",
          "Спросить коллег"
        ],
        correctAnswer: 0
      }
    ]
  };

  return questions[lessonIndex] || [];
};