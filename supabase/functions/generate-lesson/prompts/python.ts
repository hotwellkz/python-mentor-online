export const getPythonLessonPrompt = (lessonId: string) => {
  const [blockIndex, lessonIndex] = lessonId.split("-").map(Number);
  
  const blocks = [
    {
      title: "Введение в программирование и установка Python",
      lessons: [
        {
          title: "Знакомство с Python",
          prompt: `Расскажи подробно о языке Python:
            - Почему Python считается лучшим для начинающих
            - Какие компании используют Python
            - Сколько времени нужно на освоение базового Python
            - Средняя зарплата Python-разработчика в России
            - Какие направления разработки доступны
            Используй конкретные примеры и статистику.`
        },
        {
          title: "Установка Python",
          prompt: `Объясни пошагово процесс установки Python:
            - Какую версию выбрать для обучения
            - Как проверить успешность установки
            - Что делать при возникновении ошибок
            - Зачем нужны переменные среды PATH
            - Как установить несколько версий Python
            Добавь конкретные команды и скриншоты где это уместно.`
        },
        {
          title: "Настройка редактора кода",
          prompt: `Расскажи о настройке среды разработки:
            - Какой редактор выбрать начинающему
            - Необходимые плагины VS Code для Python
            - Как настроить автоформатирование
            - Отличия PyCharm от VS Code
            - Настройка отладчика
            Приведи примеры настроек и конфигураций.`
        },
        {
          title: "Проверка установки Python",
          prompt: `Объясни как проверить корректность установки Python:
            - Запуск Python через командную строку
            - Основные команды терминала
            - Создание и запуск первой программы
            - Использование IDLE
            - Проверка установленных пакетов
            Добавь примеры команд и кода.`
        }
      ]
    }
  ];

  // Находим нужный блок и урок
  const block = blocks[blockIndex - 1];
  const lesson = block?.lessons[lessonIndex - 1];

  if (!block || !lesson) {
    console.error(`Invalid lesson ID: ${lessonId}, Block: ${blockIndex}, Lesson: ${lessonIndex}`);
    throw new Error(`Урок ${lessonId} не найден. Пожалуйста, проверьте правильность ID урока.`);
  }

  console.log(`Generated prompt for lesson ${lessonId}`);
  return lesson.prompt;
};