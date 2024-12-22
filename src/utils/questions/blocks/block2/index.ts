import { Question } from '@/types/question';
import { getQuestionsForLesson2_1 } from './lesson2_1';
import { getQuestionsForLesson2_2 } from './lesson2_2';
import { getQuestionsForLesson2_3 } from './lesson2_3';
import { getQuestionsForLesson2_4 } from './lesson2_4';
import { getQuestionsForLesson2_5 } from './lesson2_5';
import { getQuestionsForLesson2_6 } from './lesson2_6';

export const getBlock2Questions = (lessonIndex: number): Question[] => {
  switch (lessonIndex) {
    case 1:
      return getQuestionsForLesson2_1();
    case 2:
      return getQuestionsForLesson2_2();
    case 3:
      return getQuestionsForLesson2_3();
    case 4:
      return getQuestionsForLesson2_4();
    case 5:
      return getQuestionsForLesson2_5();
    case 6:
      return getQuestionsForLesson2_6();
    default:
      return [];
  }
};