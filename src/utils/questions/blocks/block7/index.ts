import { Question } from "@/types/question";
import { getQuestionsForLesson7_1 } from "./lesson7_1";
import { getQuestionsForLesson7_2 } from "./lesson7_2";

export const getBlock7Questions = (lessonIndex: number): Question[] => {
  switch (lessonIndex) {
    case 1:
      return getQuestionsForLesson7_1();
    case 2:
      return getQuestionsForLesson7_2();
    default:
      return [];
  }
};