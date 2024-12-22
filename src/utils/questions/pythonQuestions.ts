import { Question } from '@/types/question';
import { getBlock1Questions } from './blocks/block1';
import { getBlock2Questions } from './blocks/block2/index';
import { getBlock3Questions } from './blocks/block3';
import { getBlock4Questions } from './blocks/block4';
import { getBlock5Questions } from './blocks/block5';
import { getBlock6Questions } from './blocks/block6';
import { getBlock7Questions } from './blocks/block7';
import { getBlock8Questions } from './blocks/block8';
import { getBlock9Questions } from './blocks/block9';
import { getBlock10Questions } from './blocks/block10';
import { getBlock11Questions } from './blocks/block11';
import { getBlock12Questions } from './blocks/block12';

export const getPythonQuestions = (blockIndex: number, lessonIndex: number): Question[] => {
  switch (blockIndex) {
    case 1:
      return getBlock1Questions(lessonIndex);
    case 2:
      return getBlock2Questions(lessonIndex);
    case 3:
      return getBlock3Questions(lessonIndex);
    case 4:
      return getBlock4Questions(lessonIndex);
    case 5:
      return getBlock5Questions(lessonIndex);
    case 6:
      return getBlock6Questions(lessonIndex);
    case 7:
      return getBlock7Questions(lessonIndex);
    case 8:
      return getBlock8Questions(lessonIndex);
    case 9:
      return getBlock9Questions(lessonIndex);
    case 10:
      return getBlock10Questions(lessonIndex);
    case 11:
      return getBlock11Questions(lessonIndex);
    case 12:
      return getBlock12Questions(lessonIndex);
    default:
      return [];
  }
};