import { Question } from "@/types/question";
import { getQuestionsForLesson6_1 } from "./lesson6_1";
import { getQuestionsForLesson6_2 } from "./lesson6_2";
import { getQuestionsForLesson6_3 } from "./lesson6_3";
import { getQuestionsForLesson6_4 } from "./lesson6_4";

export const getBlock6Questions = (lessonIndex: number): Question[] => {
  switch (lessonIndex) {
    case 1:
      return getQuestionsForLesson6_1();
    case 2:
      return getQuestionsForLesson6_2();
    case 3:
      return getQuestionsForLesson6_3();
    case 4:
      return getQuestionsForLesson6_4();
    default:
      return [];
  }
};