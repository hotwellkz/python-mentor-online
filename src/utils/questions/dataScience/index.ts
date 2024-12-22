import { Question } from "@/types/question";
import { getModuleOneQuestions } from "./module1";

export const getDataScienceQuestions = (moduleIndex: number, lessonIndex: number): Question[] => {
  switch (moduleIndex) {
    case 1:
      return getModuleOneQuestions(lessonIndex);
    default:
      return [];
  }
};