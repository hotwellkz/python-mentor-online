import { Question } from '@/types/question';

export const getBlock12Questions = (lessonIndex: number): Question[] => {
  const questions: { [key: number]: Question[] } = {
    1: [ // Чистый код и PEP8
      {
        question: "Какой максимальный размер строки рекомендуется по PEP8?",
        options: [
          "79 символов",
          "100 символов",
          "120 символов",
          "Нет ограничений"
        ],
        correctAnswer: 0
      },
      {
        question: "Какой инструмент используется для автоматического форматирования кода по PEP8?",
        options: [
          "black",
          "prettier",
          "eslint",
          "typescript"
        ],
        correctAnswer: 0
      },
      {
        question: "Как правильно именовать функции согласно PEP8?",
        options: [
          "camelCase",
          "PascalCase",
          "snake_case",
          "kebab-case"
        ],
        correctAnswer: 2
      },
      {
        question: "Какой стиль документации рекомендуется для Python?",
        options: [
          "docstring",
          "комментарии //",
          "комментарии #",
          "README файл"
        ],
        correctAnswer: 0
      },
      {
        question: "Какой отступ рекомендуется использовать по PEP8?",
        options: [
          "2 пробела",
          "4 пробела",
          "1 таб",
          "8 пробелов"
        ],
        correctAnswer: 1
      }
    ],
    2: [ // Создание портфолио и GitHub
      {
        question: "Какой элемент обязателен в README.md проекта?",
        options: [
          "Описание проекта",
          "Список всех коммитов",
          "Фотография автора",
          "История версий"
        ],
        correctAnswer: 0
      },
      {
        question: "Как часто рекомендуется делать коммиты в GitHub?",
        options: [
          "Раз в неделю",
          "После каждого значимого изменения",
          "Раз в день",
          "После завершения проекта"
        ],
        correctAnswer: 1
      },
      {
        question: "Что такое Pull Request?",
        options: [
          "Запрос на внесение изменений",
          "Скачивание репозитория",
          "Удаление ветки",
          "Создание копии проекта"
        ],
        correctAnswer: 0
      },
      {
        question: "Какие проекты лучше всего показывают навыки Python разработчика?",
        options: [
          "Веб-приложения и API",
          "Только игры",
          "Только скрипты",
          "Только мобильные приложения"
        ],
        correctAnswer: 0
      },
      {
        question: "Что такое .gitignore файл?",
        options: [
          "Список файлов, которые не нужно отслеживать",
          "Список зависимостей проекта",
          "Конфигурация проекта",
          "Список авторов проекта"
        ],
        correctAnswer: 0
      }
    ],
    3: [ // Подготовка к собеседованию
      {
        question: "Какой алгоритм сортировки имеет лучшую среднюю сложность?",
        options: [
          "Quick Sort",
          "Bubble Sort",
          "Selection Sort",
          "Insertion Sort"
        ],
        correctAnswer: 0
      },
      {
        question: "Что такое временная сложность алгоритма?",
        options: [
          "Время выполнения в секундах",
          "Количество операций в зависимости от размера входных данных",
          "Количество строк кода",
          "Время написания кода"
        ],
        correctAnswer: 1
      },
      {
        question: "Какой тип данных лучше использовать для уникальных элементов?",
        options: [
          "Set",
          "List",
          "Tuple",
          "String"
        ],
        correctAnswer: 0
      },
      {
        question: "Что такое рекурсия?",
        options: [
          "Функция, вызывающая сама себя",
          "Цикл while",
          "Цикл for",
          "Условный оператор"
        ],
        correctAnswer: 0
      },
      {
        question: "Как лучше всего продемонстрировать свой код на собеседовании?",
        options: [
          "Объяснять пошагово с примерами",
          "Показать только результат",
          "Не показывать код",
          "Отправить код по почте"
        ],
        correctAnswer: 0
      }
    ]
  };

  return questions[lessonIndex] || [];
};