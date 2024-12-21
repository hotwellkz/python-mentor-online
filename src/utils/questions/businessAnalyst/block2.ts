import { Question } from '@/types/question';

export const getBlock2Questions = (lessonIndex: number): Question[] => {
  const questions: { [key: string]: Question[] } = {
    1: [ // Урок 1: Виды требований
      {
        question: "Что такое функциональные требования?",
        options: [
          "Требования к поведению системы",
          "Требования к производительности",
          "Требования к дизайну",
          "Требования к безопасности"
        ],
        correctAnswer: 0
      },
      {
        question: "Какой тип требований описывает производительность системы?",
        options: [
          "Нефункциональные требования",
          "Функциональные требования",
          "Бизнес-требования",
          "Пользовательские требования"
        ],
        correctAnswer: 0
      },
      {
        question: "Как правильно приоритизировать требования?",
        options: [
          "MoSCoW метод",
          "Случайным образом",
          "По алфавиту",
          "По длине описания"
        ],
        correctAnswer: 0
      },
      {
        question: "Что такое валидация требований?",
        options: [
          "Проверка соответствия требований потребностям пользователей",
          "Написание требований",
          "Удаление требований",
          "Сортировка требований"
        ],
        correctAnswer: 0
      },
      {
        question: "Какой документ используется для фиксации требований?",
        options: [
          "Спецификация требований",
          "Список покупок",
          "Расписание встреч",
          "План отпусков"
        ],
        correctAnswer: 0
      }
    ],
    2: [ // Урок 2: Методы сбора требований
      {
        question: "Какой метод сбора требований наиболее эффективен для сложных проектов?",
        options: [
          "Интервью с заинтересованными сторонами",
          "Анкетирование",
          "Наблюдение",
          "Чтение документации"
        ],
        correctAnswer: 0
      },
      {
        question: "Что такое брейнсторминг?",
        options: [
          "Метод генерации идей в группе",
          "Индивидуальная работа",
          "Тестирование продукта",
          "Написание документации"
        ],
        correctAnswer: 0
      },
      {
        question: "Какой метод лучше использовать для сбора количественных данных?",
        options: [
          "Анкетирование",
          "Интервью",
          "Наблюдение",
          "Мозговой штурм"
        ],
        correctAnswer: 0
      },
      {
        question: "Что важно делать во время интервью?",
        options: [
          "Вести записи",
          "Перебивать собеседника",
          "Говорить больше, чем слушать",
          "Игнорировать детали"
        ],
        correctAnswer: 0
      },
      {
        question: "Какой метод лучше использовать для понимания существующих процессов?",
        options: [
          "Наблюдение за работой пользователей",
          "Чтение старых документов",
          "Угадывание",
          "Опрос случайных людей"
        ],
        correctAnswer: 0
      }
    ],
    3: [ // Урок 3: Управление требованиями
      {
        question: "Что такое трассировка требований?",
        options: [
          "Отслеживание связей между требованиями",
          "Поиск требований",
          "Удаление требований",
          "Создание требований"
        ],
        correctAnswer: 0
      },
      {
        question: "Какой инструмент лучше использовать для управления требованиями?",
        options: [
          "Специализированное ПО для управления требованиями",
          "Блокнот",
          "Социальные сети",
          "Калькулятор"
        ],
        correctAnswer: 0
      },
      {
        question: "Как часто нужно обновлять требования?",
        options: [
          "По мере изменения проекта",
          "Никогда",
          "Раз в год",
          "Только в конце проекта"
        ],
        correctAnswer: 0
      },
      {
        question: "Что такое базовая линия требований?",
        options: [
          "Согласованный набор требований",
          "Первое требование",
          "Последнее требование",
          "Список пожеланий"
        ],
        correctAnswer: 0
      },
      {
        question: "Как обеспечить качество требований?",
        options: [
          "Регулярный анализ и проверка",
          "Игнорирование обратной связи",
          "Отказ от документации",
          "Частая смена требований"
        ],
        correctAnswer: 0
      }
    ]
  };

  return questions[lessonIndex] || [];
};