import { getQuestionsForLesson2_1 } from "./lesson2_1";
import { getQuestionsForLesson2_2 } from "./lesson2_2";

export const getModuleTwoQuestions = (lessonIndex: number): Question[] => {
  switch (lessonIndex) {
    case 1:
      return getQuestionsForLesson2_1();
    case 2:
      return getQuestionsForLesson2_2();
    default:
      return [];
  }
};