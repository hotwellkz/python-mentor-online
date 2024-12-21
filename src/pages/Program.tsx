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
      {
        title: "Урок 2: Установка Python",
        content: [
          "Где скачать Python (сайт Python.org).",
          "Установка Python на Windows, macOS, Linux.",
          "Настройка переменных среды для корректной работы."
        ]
      },
      {
        title: "Урок 3: Настройка редактора кода",
        content: [
          "Установка и настройка редакторов: VS Code, PyCharm, Jupyter Notebook."
        ]
      },
      {
        title: "Урок 4: Проверка установки Python",
        content: [
          "Работа с командной строкой (CLI).",
          "Проверка версии Python."
        ]
      },
      {
        title: "Урок 5: Знакомство с интерпретатором Python",
        content: [
          "Введение в REPL (Read–Eval–Print Loop).",
          "Первая программа: \"Hello, World!\".",
          "Запуск Python-скриптов через файл .py."
        ]
      }
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
      {
        title: "Урок 2: Ввод и вывод данных",
        content: [
          "Функции print() и input() для работы с данными."
        ]
      },
      {
        title: "Урок 3: Условные операторы",
        content: [
          "if, else, elif.",
          "Логические операторы: and, or, not."
        ]
      },
      {
        title: "Урок 4: Циклы",
        content: [
          "Циклы for и while.",
          "Прерывание циклов с break и continue.",
          "Вложенные циклы."
        ]
      },
      {
        title: "Урок 5: Коллекции данных",
        content: [
          "Списки (list): добавление, удаление элементов.",
          "Кортежи (tuple): неизменяемые списки.",
          "Словари (dict): ключ-значение.",
          "Множества (set)."
        ]
      },
      {
        title: "Урок 6: Функции",
        content: [
          "Создание функций с помощью def.",
          "Аргументы функций (позиционные и именованные).",
          "Возвращаемые значения."
        ]
      }
    ]
  },
  {
    title: "Блок 3: Объектно-ориентированное программирование (ООП)",
    lessons: [
      {
        title: "Урок 1: Основы ООП",
        content: [
          "Что такое классы и объекты?",
          "Атрибуты и методы класса."
        ]
      },
      {
        title: "Урок 2: Конструктор __init__",
        content: [
          "Создание объектов с использованием конструктора."
        ]
      },
      {
        title: "Урок 3: Принципы ООП",
        content: [
          "Инкапсуляция, наследование и полиморфизм.",
          "Пример работы с абстракцией."
        ]
      },
      {
        title: "Урок 4: Дополнительные темы ООП",
        content: [
          "Статические методы и атрибуты.",
          "Магические методы (__str__, __repr__, __len__).",
          "Пример наследования классов."
        ]
      }
    ]
  },
  {
    title: "Блок 4: Работа с модулями и файлами",
    lessons: [
      {
        title: "Урок 1: Модули и пакеты",
        content: [
          "Импорт встроенных модулей и создание своих."
        ]
      },
      {
        title: "Урок 2: Работа с файлами",
        content: [
          "Чтение и запись текстовых файлов.",
          "Работа с JSON-файлами."
        ]
      },
      {
        title: "Урок 3: Виртуальные окружения",
        content: [
          "Создание окружения с venv.",
          "Установка зависимостей через pip."
        ]
      }
    ]
  },
  {
    title: "Блок 5: Исключения и отладка",
    lessons: [
      {
        title: "Урок 1: Обработка исключений",
        content: [
          "try, except, finally.",
          "Создание пользовательских исключений."
        ]
      },
      {
        title: "Урок 2: Отладка программ",
        content: [
          "Использование print() и встроенного отладчика pdb."
        ]
      }
    ]
  },
  {
    title: "Блок 6: Работа с библиотеками",
    lessons: [
      {
        title: "Урок 1: Популярные встроенные модули",
        content: [
          "os, datetime, random, math."
        ]
      },
      {
        title: "Урок 2: Установка сторонних библиотек",
        content: [
          "Установка библиотек с pip и поиск на PyPI."
        ]
      },
      {
        title: "Урок 3: Полезные библиотеки для Python-разработчика",
        content: [
          "requests: работа с HTTP-запросами.",
          "BeautifulSoup: парсинг данных с сайтов.",
          "pandas и matplotlib: работа с данными и их визуализация."
        ]
      }
    ]
  },
  {
    title: "Блок 7: Работа с базами данных",
    lessons: [
      {
        title: "Урок 1: SQLite и SQL",
        content: [
          "Подключение базы данных с sqlite3.",
          "Создание и выполнение запросов."
        ]
      },
      {
        title: "Урок 2: Введение в ORM",
        content: [
          "Основы SQLAlchemy и создание моделей."
        ]
      }
    ]
  },
  {
    title: "Блок 8: Основы веб-разработки на Python",
    lessons: [
      {
        title: "Урок 1: Введение во Flask",
        content: [
          "Установка и настройка Flask.",
          "Создание простого веб-приложения."
        ]
      },
      {
        title: "Урок 2: Шаблонизация",
        content: [
          "Использование Jinja2 для динамического контента."
        ]
      },
      {
        title: "Урок 3: Обработка форм и запросов",
        content: [
          "Работа с формами и методами POST/GET."
        ]
      },
      {
        title: "Урок 4: Основы REST API",
        content: [
          "Создание простого REST API на Flask."
        ]
      }
    ]
  },
  {
    title: "Блок 9: Тестирование кода",
    lessons: [
      {
        title: "Урок 1: Тесты с unittest",
        content: [
          "Написание unit-тестов для функций и классов."
        ]
      },
      {
        title: "Урок 2: Использование pytest",
        content: [
          "Автоматизация тестов и покрытие кода."
        ]
      }
    ]
  },
  {
    title: "Блок 10: Продвинутые темы",
    lessons: [
      {
        title: "Урок 1: Асинхронное программирование",
        content: [
          "Основы asyncio и использование await."
        ]
      },
      {
        title: "Урок 2: Параллельность и многопоточность",
        content: [
          "Модули threading и multiprocessing."
        ]
      },
      {
        title: "Урок 3: Архитектура и паттерны",
        content: [
          "Основные паттерны проектирования: Singleton, Factory."
        ]
      }
    ]
  },
  {
    title: "Блок 11: Финальные проекты",
    lessons: [
      {
        title: "Уроки по проектам",
        content: [
          "Проект 1: Консольное приложение (To-Do List).",
          "Проект 2: Веб-приложение с Flask.",
          "Проект 3: Парсер данных с BeautifulSoup.",
          "Проект 4: Анализ данных с pandas и matplotlib."
        ]
      }
    ]
  },
  {
    title: "Блок 12: Карьерное развитие",
    lessons: [
      {
        title: "Урок 1: Чистый код и PEP8",
        content: [
          "Как писать чистый и поддерживаемый код."
        ]
      },
      {
        title: "Урок 2: Создание портфолио и GitHub",
        content: [
          "Подготовка проектов для демонстрации."
        ]
      },
      {
        title: "Урок 3: Подготовка к собеседованию",
        content: [
          "Типичные вопросы и задачи на интервью."
        ]
      }
    ]
  }
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