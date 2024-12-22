import { Question } from "@/types/question";
import { getQuestionsForLesson1_1 } from "./lesson1_1";
import { getQuestionsForLesson1_2 } from "./lesson1_2";

export const getModuleOneQuestions = (lessonIndex: number): Question[] => {
  switch (lessonIndex) {
    case 1:
      return getQuestionsForLesson1_1();
    case 2:
      return getQuestionsForLesson1_2();
    default:
      return [];
  }
};