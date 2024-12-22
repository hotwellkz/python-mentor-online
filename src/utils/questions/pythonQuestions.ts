import { Question } from '@/types/question';
import { getBlock7Questions } from './blocks/block7';
import { getBlock8Questions } from './blocks/block8';
import { getBlock9Questions } from './blocks/block9';
import { getBlock10Questions } from './blocks/block10';
import { getBlock11Questions } from './blocks/block11';

export const getPythonQuestions = (blockIndex: number, lessonIndex: number): Question[] => {
  switch (blockIndex) {
    case 7:
      return getBlock7Questions(lessonIndex);
    case 8:
      return getBlock8Questions(lessonIndex);
    case 9:
      return getBlock9Questions(lessonIndex);
    case 10:
      return getBlock10Questions(lessonIndex);
    case 11:
      return getBlock11Questions(lessonIndex);
    default:
      return [
        {
          question: "Какой тип приложений нельзя разрабатывать на Python?",
          options: [
            "Мобильные приложения",
            "Веб-сайты",
            "Скрипты автоматизации",
            "Игры"
          ],
          correctAnswer: 0
        },
        {
          question: "Какая компания НЕ использует Python?",
          options: [
            "Google",
            "Netflix",
            "Apple",
            "Nintendo"
          ],
          correctAnswer: 3
        },
        {
          question: "Сколько в среднем времени нужно для освоения базового Python?",
          options: [
            "1-2 месяца",
            "3-4 месяца",
            "6 месяцев",
            "2-3 года"
          ],
          correctAnswer: 1
        },
        {
          question: "В какой сфере Python используется наиболее активно?",
          options: [
            "Data Science и машинное обучение",
            "Разработка игр",
            "Мобильная разработка",
            "Дизайн"
          ],
          correctAnswer: 0
        },
        {
          question: "Какое преимущество Python делает его лучшим для начинающих?",
          options: [
            "Простой и понятный синтаксис",
            "Высокая производительность",
            "Строгая типизация",
            "Сложная система сборки"
          ],
          correctAnswer: 0
        }
      ];
  }
};
