import { Question } from "@/types/question";
import { getModuleOneQuestions } from "./module1";

export const getDataScienceQuestions = (moduleIndex: number, lessonIndex: number): Question[] => {
  console.log('Getting Data Science questions:', { moduleIndex, lessonIndex });
  switch (moduleIndex) {
    case 1:
      return getModuleOneQuestions(lessonIndex);
    default:
      console.log('No questions found for module:', moduleIndex);
      return [];
  }
};