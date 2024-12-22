import { getQuestionsForLesson1_1 } from './module1/lesson1_1';
import { getQuestionsForLesson2_2 } from './module2/lesson2_2';

export const productManagementQuestions: { [key: string]: () => any } = {
  'pm-1-1': getQuestionsForLesson1_1,
  'pm-2-2': getQuestionsForLesson2_2,
};