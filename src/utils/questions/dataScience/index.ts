import { getModuleOneQuestions } from "./module1";
import { getModuleTwoQuestions } from "./module2";

export const getDataScienceQuestions = (moduleIndex: number, lessonIndex: number): Question[] => {
  switch (moduleIndex) {
    case 1:
      return getModuleOneQuestions(lessonIndex);
    case 2:
      return getModuleTwoQuestions(lessonIndex);
    default:
      return [];
  }
};