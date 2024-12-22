import { block1Prompts } from './python/block1.ts';
import { block2Prompts } from './python/block2.ts';
import { block3Prompts } from './python/block3.ts';
import { block4Prompts } from './python/block4.ts';
import { block5Prompts } from './python/block5.ts';
import { block6Prompts } from './python/block6.ts';
import { block7Prompts } from './python/block7.ts';
import { block8Prompts } from './python/block8.ts';
import { block9Prompts } from './python/block9.ts';
import { block10Prompts } from './python/block10.ts';
import { block11Prompts } from './python/block11.ts';
import { block12Prompts } from './python/block12.ts';

export const getPythonLessonPrompt = (lessonId: string) => {
  const [blockIndex, lessonIndex] = lessonId.split("-").map(Number);
  
  const blocks = {
    1: block1Prompts,
    2: block2Prompts,
    3: block3Prompts,
    4: block4Prompts,
    5: block5Prompts,
    6: block6Prompts,
    7: block7Prompts,
    8: block8Prompts,
    9: block9Prompts,
    10: block10Prompts,
    11: block11Prompts,
    12: block12Prompts
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