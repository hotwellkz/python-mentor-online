import { Question } from '@/types/question';
import { businessAnalystBlocks } from './businessAnalyst';
import { block1 } from './course/block1';
import { block2 } from './course/block2';
import { block3 } from './course/block3';
import { block4 } from './course/block4';
import { block5 } from './course/block5';
import { block6 } from './course/block6';
import { block7 } from './course/block7';
import { getBlock8Questions } from './blocks/block8';
import { getBlock9Questions } from './blocks/block9';
import { block10 } from './course/block10';
import { block11 } from './course/block11';
import { block12 } from './course/block12';

export const getPythonQuestions = (blockIndex: number, lessonIndex: number): Question[] => {
  switch (blockIndex) {
    case 1:
      return block1[lessonIndex] || [];
    case 2:
      return block2[lessonIndex] || [];
    case 3:
      return block3[lessonIndex] || [];
    case 4:
      return block4[lessonIndex] || [];
    case 5:
      return block5[lessonIndex] || [];
    case 6:
      return block6[lessonIndex] || [];
    case 7:
      return block7[lessonIndex] || [];
    case 8:
      return getBlock8Questions(lessonIndex);
    case 9:
      return getBlock9Questions(lessonIndex);
    case 10:
      return block10[lessonIndex] || [];
    case 11:
      return block11[lessonIndex] || [];
    case 12:
      return block12[lessonIndex] || [];
    default:
      return [];
  }
};