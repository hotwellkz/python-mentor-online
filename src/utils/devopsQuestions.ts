import { Question } from '@/types/question';
import { getModuleOneQuestions } from './questions/moduleOne';
import { getModuleThreeQuestions } from './questions/moduleThree';

export const getDevOpsQuestions = (moduleIndex: number, topicIndex: number): Question[] => {
  switch (moduleIndex) {
    case 1:
      return getModuleOneQuestions(topicIndex);
    case 3:
      return getModuleThreeQuestions(topicIndex);
    default:
      return [
        {
          question: "Что такое DevOps?",
          options: [
            "Методология разработки",
            "Язык программирования",
            "База данных",
            "Операционная система"
          ],
          correctAnswer: 0
        },
        {
          question: "Какие инструменты используются в DevOps?",
          options: [
            "Git, Jenkins, Docker",
            "Word, Excel, PowerPoint",
            "Photoshop, Illustrator",
            "Windows, Linux"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое CI/CD?",
          options: [
            "Непрерывная интеграция и доставка",
            "Компьютерный интерфейс",
            "Контроль изменений",
            "Центр информации"
          ],
          correctAnswer: 0
        },
        {
          question: "Для чего нужен мониторинг?",
          options: [
            "Для отслеживания состояния системы",
            "Для разработки",
            "Для тестирования",
            "Для документации"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое Infrastructure as Code?",
          options: [
            "Управление инфраструктурой через код",
            "Код для инфраструктуры",
            "Инфраструктура для кода",
            "Кодирование инфраструктуры"
          ],
          correctAnswer: 0
        }
      ];
  }
};
