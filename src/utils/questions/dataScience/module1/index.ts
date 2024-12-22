import { Question } from "@/types/question";
import { getQuestionsForLesson1_1 } from "./lesson1_1";

export const getModuleOneQuestions = (lessonIndex: number): Question[] => {
  switch (lessonIndex) {
    case 1:
      return getQuestionsForLesson1_1();
    default:
      return [];
  }
};