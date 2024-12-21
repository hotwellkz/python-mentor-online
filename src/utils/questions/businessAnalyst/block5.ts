import { Question } from '@/types/question';

export const getBlock5Questions = (lessonIndex: number): Question[] => {
  const questions: { [key: string]: Question[] } = {
    1: [ // Урок 1: Роли и ответственность
      {
        question: "Кто отвечает за приоритизацию задач в Scrum?",
        options: [
          "Product Owner",
          "Scrum Master",
          "Team Lead",
          "Project Manager"
        ],
        correctAnswer: 0
      },
      {
        question: "Какая роль отвечает за соблюдение процессов Scrum?",
        options: [
          "Scrum Master",
          "Product Owner",
          "Team Lead",
          "Project Manager"
        ],
        correctAnswer: 0
      },
      {
        question: "Кто является владельцем продукта?",
        options: [
          "Product Owner",
          "Scrum Master",
          "Developer",
          "Tester"
        ],
        correctAnswer: 0
      },
      {
        question: "Кто отвечает за качество кода?",
        options: [
          "Команда разработки",
          "Product Owner",
          "Scrum Master",
          "Project Manager"
        ],
        correctAnswer: 0
      },
      {
        question: "Кто проводит daily stand-up?",
        options: [
          "Scrum Master",
          "Product Owner",
          "Project Manager",
          "Team Lead"
        ],
        correctAnswer: 0
      }
    ],
    2: [ // Урок 2: Инструменты управления проектами
      {
        question: "Какой инструмент лучше использовать для управления agile-проектами?",
        options: [
          "Jira",
          "Microsoft Word",
          "Excel",
          "Блокнот"
        ],
        correctAnswer: 0
      },
      {
        question: "Что такое канбан-доска?",
        options: [
          "Инструмент визуализации работы",
          "Тип документа",
          "Метод тестирования",
          "Формат отчета"
        ],
        correctAnswer: 0
      },
      {
        question: "Какой инструмент лучше использовать для создания roadmap?",
        options: [
          "Product Board",
          "Блокнот",
          "Paint",
          "Калькулятор"
        ],
        correctAnswer: 0
      },
      {
        question: "Что такое burndown chart?",
        options: [
          "График оставшейся работы",
          "Тип документа",
          "Метод оценки",
          "Формат встречи"
        ],
        correctAnswer: 0
      },
      {
        question: "Какой инструмент лучше использовать для time tracking?",
        options: [
          "Toggl",
          "Paint",
          "Калькулятор",
          "Блокнот"
        ],
        correctAnswer: 0
      }
    ],
    3: [ // Урок 3: Практическое применение
      {
        question: "Как оценить сложность задачи?",
        options: [
          "Planning poker",
          "Случайное число",
          "Не оценивать",
          "Спросить руководителя"
        ],
        correctAnswer: 0
      },
      {
        question: "Что такое velocity команды?",
        options: [
          "Средняя производительность за спринт",
          "Скорость печати кода",
          "Количество встреч",
          "Число разработчиков"
        ],
        correctAnswer: 0
      },
      {
        question: "Как проводить ретроспективу?",
        options: [
          "Обсуждать что было хорошо/плохо/что улучшить",
          "Не проводить вообще",
          "Только хвалить команду",
          "Только критиковать"
        ],
        correctAnswer: 0
      },
      {
        question: "Что такое Definition of Done?",
        options: [
          "Критерии завершенности задачи",
          "Время окончания работы",
          "Список сотрудников",
          "План проекта"
        ],
        correctAnswer: 0
      },
      {
        question: "Как часто нужно обновлять статус задач?",
        options: [
          "Ежедневно",
          "Раз в месяц",
          "Никогда",
          "Раз в год"
        ],
        correctAnswer: 0
      }
    ]
  };

  return questions[lessonIndex] || [];
};