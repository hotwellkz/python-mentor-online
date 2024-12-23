import { Question } from '@/types/question';

export const getBlock7Questions = (lessonIndex: number): Question[] => {
  const questions: { [key: string]: Question[] } = {
    1: [ // Урок 1: Определение и управление стейкхолдерами
      {
        question: "Кто такие стейкхолдеры?",
        options: [
          "Заинтересованные стороны проекта",
          "Только руководители",
          "Только клиенты",
          "Только разработчики"
        ],
        correctAnswer: 0
      },
      {
        question: "Как определить ключевых стейкхолдеров?",
        options: [
          "Анализ влияния и интереса",
          "Случайный выбор",
          "По должности",
          "По возрасту"
        ],
        correctAnswer: 0
      },
      {
        question: "Как управлять ожиданиями стейкхолдеров?",
        options: [
          "Регулярная коммуникация и обратная связь",
          "Игнорировать их",
          "Выполнять все требования",
          "Не управлять"
        ],
        correctAnswer: 0
      },
      {
        question: "Что такое матрица стейкхолдеров?",
        options: [
          "Инструмент анализа заинтересованных сторон",
          "Список сотрудников",
          "График встреч",
          "План проекта"
        ],
        correctAnswer: 0
      },
      {
        question: "Как часто нужно обновлять анализ стейкхолдеров?",
        options: [
          "При существенных изменениях в проекте",
          "Никогда",
          "Раз в год",
          "Каждый день"
        ],
        correctAnswer: 0
      }
    ],
    2: [ // Урок 2: Структура и подача информации
      {
        question: "Как эффективно презентовать информацию?",
        options: [
          "Адаптировать под аудиторию",
          "Использовать один формат",
          "Максимум деталей",
          "Минимум информации"
        ],
        correctAnswer: 0
      },
      {
        question: "Какой формат лучше для технической аудитории?",
        options: [
          "Детальные схемы и спецификации",
          "Общие слова",
          "Только текст",
          "Только картинки"
        ],
        correctAnswer: 0
      },
      {
        question: "Как структурировать презентацию?",
        options: [
          "Проблема-решение-выгоды",
          "Только решение",
          "Только проблема",
          "Случайный порядок"
        ],
        correctAnswer: 0
      },
      {
        question: "Как работать с возражениями?",
        options: [
          "Выслушать и аргументированно ответить",
          "Игнорировать",
          "Спорить",
          "Согласиться со всем"
        ],
        correctAnswer: 0
      },
      {
        question: "Какой принцип важен при подаче информации?",
        options: [
          "Ясность и конкретность",
          "Максимум терминов",
          "Минимум деталей",
          "Отсутствие структуры"
        ],
        correctAnswer: 0
      }
    ],
    3: [ // Урок 3: Практика взаимодействия
      {
        question: "Как провести эффективную встречу?",
        options: [
          "Подготовить повестку и следовать ей",
          "Импровизировать",
          "Говорить без остановки",
          "Не готовиться"
        ],
        correctAnswer: 0
      },
      {
        question: "Как получить обратную связь?",
        options: [
          "Задавать конкретные вопросы",
          "Не спрашивать",
          "Угадывать",
          "Игнорировать мнения"
        ],
        correctAnswer: 0
      },
      {
        question: "Как разрешать конфликты?",
        options: [
          "Найти компромисс",
          "Игнорировать",
          "Обострять",
          "Уступить всем"
        ],
        correctAnswer: 0
      },
      {
        question: "Как поддерживать вовлеченность стейкхолдеров?",
        options: [
          "Регулярная коммуникация и отчетность",
          "Не общаться",
          "Редкие контакты",
          "Случайные встречи"
        ],
        correctAnswer: 0
      },
      {
        question: "Как документировать коммуникации?",
        options: [
          "Вести протоколы встреч",
          "Не документировать",
          "Запоминать",
          "Случайные заметки"
        ],
        correctAnswer: 0
      }
    ]
  };

  return questions[lessonIndex] || [];
};