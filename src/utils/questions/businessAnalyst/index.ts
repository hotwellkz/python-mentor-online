import { Question } from '@/types/question';
import { getBlock1Questions } from './block1';
import { getBlock2Questions } from './block2';
import { getBlock3Questions } from './block3';
import { getBlock4Questions } from './block4';
import { getBlock5Questions } from './block5';
import { getBlock6Questions } from './block6';
import { getBlock7Questions } from './block7';
import { getBlock8Questions } from './block8';

export const getBusinessAnalystQuestions = (blockIndex: number, lessonIndex: number): Question[] => {
  const getQuestions = {
    1: getBlock1Questions,
    2: getBlock2Questions,
    3: getBlock3Questions,
    4: getBlock4Questions,
    5: getBlock5Questions,
    6: getBlock6Questions,
    7: getBlock7Questions,
    8: getBlock8Questions,
  }[blockIndex];

  if (!getQuestions) {
    return [
      {
        question: "Вопрос по умолчанию",
        options: ["Ответ 1", "Ответ 2", "Ответ 3", "Ответ 4"],
        correctAnswer: 0
      }
    ];
  }

  return getQuestions(lessonIndex);
};