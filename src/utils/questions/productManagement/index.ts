import { getQuestionsForLesson1_1 } from './module1/lesson1_1';
import { getQuestionsForLesson2_2 } from './module2/lesson2_2';
import { getQuestionsForLesson3_1 } from './module3/lesson3_1';
import { getQuestionsForLesson7_1 } from './module7/lesson7_1';

export const productManagementQuestions: { [key: string]: () => any } = {
  'pm-1-1': getQuestionsForLesson1_1,
  'pm-2-2': getQuestionsForLesson2_2,
  'pm-3-1': getQuestionsForLesson3_1,
  'pm-7-1': getQuestionsForLesson7_1,
};