import { Question } from '@/types/question';
import { getQuestionsForLesson3_1 } from './lesson3_1';
import { getQuestionsForLesson3_2 } from './lesson3_2';
import { getQuestionsForLesson3_3 } from './lesson3_3';
import { getQuestionsForLesson3_4 } from './lesson3_4';
import { getQuestionsForLesson3_5 } from './lesson3_5';

export const getBlock3Questions = (lessonIndex: number): Question[] => {
  switch (lessonIndex) {
    case 1:
      return getQuestionsForLesson3_1();
    case 2:
      return getQuestionsForLesson3_2();
    case 3:
      return getQuestionsForLesson3_3();
    case 4:
      return getQuestionsForLesson3_4();
    case 5:
      return getQuestionsForLesson3_5();
    default:
      return [];
  }
};