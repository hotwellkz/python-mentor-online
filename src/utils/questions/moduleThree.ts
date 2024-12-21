import { Question } from '@/types/question';

export const getModuleThreeQuestions = (topicIndex: number): Question[] => {
  const questions: { [key: string]: Question[] } = {
    3: [
      {
        question: "Какие основные компоненты включает в себя архитектура контейнеров?",
        options: [
          "Только Docker Engine",
          "Container runtime, images, и registry",
          "Только Kubernetes",
          "Только контейнеры"
        ],
        correctAnswer: 1
      },
      {
        question: "Что такое Docker Compose?",
        options: [
          "Инструмент для создания образов",
          "Система оркестрации контейнеров",
          "Инструмент для определения и запуска многоконтейнерных приложений",
          "База данных для Docker"
        ],
        correctAnswer: 2
      },
      {
        question: "Как обеспечить персистентность данных в Docker?",
        options: [
          "Использовать Docker volumes",
          "Сохранять данные внутри контейнера",
          "Использовать только bind mounts",
          "Не использовать volumes вообще"
        ],
        correctAnswer: 0
      }
    ]
  };

  return questions[topicIndex] || [];
};