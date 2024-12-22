import { block1Prompts } from './python/block1';
import { block2Prompts } from './python/block2';
import { block3Prompts } from './python/block3';
import { block4Prompts } from './python/block4';
import { block5Prompts } from './python/block5';
import { block6Prompts } from './python/block6';
import { block7Prompts } from './python/block7';

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
    8: {
      lesson1: `Расскажи о веб-разработке на Python:
        - Что такое веб-фреймворк и зачем он нужен
        - Популярные веб-фреймворки Python
        - Создание простого веб-сервера на Flask
        - Маршрутизация в веб-приложениях
        - HTTP методы в Flask
        Приведи примеры создания простого веб-приложения.`,
      lesson2: `Объясни работу с шаблонами и формами:
        - Использование шаблонизатора Jinja2
        - Создание и обработка форм
        - Структура Flask приложения
        - Работа с сессиями
        - Загрузка файлов
        Добавь примеры работы с шаблонами и формами.`
    }
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