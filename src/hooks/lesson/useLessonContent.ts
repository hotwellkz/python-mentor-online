import { modules } from "@/components/course/DevOpsCourseProgram";
import { courseBlocks, businessAnalystBlocks } from "@/data/courseData";
import { getDevOpsQuestions } from "@/utils/devopsQuestions";

export const useLessonContent = (lessonId: string | undefined) => {
  const isDevOpsLesson = lessonId?.startsWith('devops-');
  const isBusinessAnalystLesson = lessonId?.startsWith('ba-');

  let lessonTitle = '';
  let topQuestions: string[] = [];

  if (isDevOpsLesson) {
    const [, moduleIndex, topicIndex] = (lessonId || "").split("-").map(Number);
    const currentModule = modules[moduleIndex - 1];
    if (currentModule) {
      lessonTitle = currentModule.topics[topicIndex - 1];
      topQuestions = getDevOpsQuestions(moduleIndex, topicIndex).map(q => q.question);
    }
  } else if (isBusinessAnalystLesson) {
    const [, blockIndex, lessonIndex] = (lessonId || "").split("-").map(Number);
    const currentBlock = businessAnalystBlocks[blockIndex - 1];
    const currentLesson = currentBlock?.lessons[lessonIndex - 1];
    if (currentLesson) {
      lessonTitle = currentLesson.title;
      topQuestions = currentLesson.topics;
    }
  } else {
    const [blockIndex, lessonIndex] = (lessonId || "").split("-").map(Number);
    const currentBlock = courseBlocks[blockIndex - 1];
    const currentLesson = currentBlock?.lessons[lessonIndex - 1];
    if (currentLesson) {
      lessonTitle = currentLesson.title;
      topQuestions = currentLesson.topics;
    }
  }

  return {
    lessonTitle,
    topQuestions,
    isDevOpsLesson,
    isBusinessAnalystLesson
  };
};