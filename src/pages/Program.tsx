import { Helmet } from "react-helmet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const courseBlocks = [
  {
    title: "Блок 1: Введение в программирование и установка Python",
    lessons: [
      {
        title: "Урок 1: Знакомство с Python",
        content: [
          "Что такое Python?",
          "Почему Python популярен?",
          "Области применения Python: веб-разработка, анализ данных, машинное обучение."
        ]
      },
      // ... остальные уроки блока 1
    ]
  },
  {
    title: "Блок 2: Основы программирования на Python",
    lessons: [
      {
        title: "Урок 1: Переменные и типы данных",
        content: [
          "Типы данных: int, float, str, bool.",
          "Создание и вывод переменных."
        ]
      },
      // ... остальные уроки блока 2
    ]
  },
  // ... остальные блоки
];

const Program = () => {
  return (
    <>
      <Helmet>
        <title>Программа курса Python | Изучайте Python с ИИ-учителем</title>
        <meta
          name="description"
          content="Подробная программа бесплатного курса Python. Изучите основы программирования, ООП, работу с базами данных и веб-разработку под руководством ИИ-учителя."
        />
        <meta
          name="keywords"
          content="программа курса Python, обучение Python, Python для начинающих, курс программирования, Python онлайн"
        />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Программа курса Python</h1>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg mb-8 text-gray-600 dark:text-gray-300 text-center">
            Изучите Python с нуля до профессионального уровня с помощью нашей структурированной программы обучения
          </p>
          <Accordion type="single" collapsible className="space-y-4">
            {courseBlocks.map((block, blockIndex) => (
              <AccordionItem
                key={blockIndex}
                value={`block-${blockIndex}`}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <h2 className="text-left font-semibold">{block.title}</h2>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4">
                  <div className="space-y-6">
                    {block.lessons.map((lesson, lessonIndex) => (
                      <div key={lessonIndex} className="space-y-2">
                        <h3 className="font-medium text-primary">{lesson.title}</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                          {lesson.content.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default Program;