import { block1Prompts } from './business-analyst/block1.ts';
import { block2Prompts } from './business-analyst/block2.ts';

export const getBusinessAnalystLessonPrompt = (lessonId: string) => {
  const [, blockIndex, lessonIndex] = lessonId.split("-").map(Number);
  
  const blocks = {
    1: block1Prompts,
    2: block2Prompts,
  };

  const block = blocks[blockIndex];
  const lesson = block?.[`lesson${lessonIndex}`];

  if (!block || !lesson) {
    console.error(`Invalid lesson ID: ${lessonId}, Block: ${blockIndex}, Lesson: ${lessonIndex}`);
    throw new Error(`Урок ${lessonId} не найден. Пожалуйста, проверьте правильность ID урока.`);
  }

  console.log(`Generated prompt for lesson ${lessonId}`);
  return lesson;
};