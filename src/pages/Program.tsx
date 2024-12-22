import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { CourseBlock } from "@/components/program/CourseBlock";
import { ProgramHeader } from "@/components/program/ProgramHeader";
import { CourseProgress } from "@/components/program/CourseProgress";
import { ChatInterface } from "@/components/chat/ChatInterface";

const courseBlocks = [
  {
    title: "Блок 1: Введение в программирование и установка Python",
    lessons: [
      {
        title: "Урок 1: Знакомство с Python",
        topics: [
          "Что такое Python?",
          "Почему Python популярен?",
          "Области применения Python: веб-разработка, анализ данных, машинное обучение.",
        ],
      },
      {
        title: "Урок 2: Установка Python",
        topics: [
          "Где скачать Python (сайт Python.org).",
          "Установка Python на Windows, macOS, Linux.",
          "Настройка переменных среды для корректной работы.",
        ],
      },
      {
        title: "Урок 3: Настройка редактора кода",
        topics: [
          "Установка и настройка редакторов: VS Code, PyCharm, Jupyter Notebook.",
        ],
      },
      {
        title: "Урок 4: Проверка установки Python",
        topics: [
          "Работа с командной строкой (CLI).",
          "Проверка версии Python.",
        ],
      },
      {
        title: "Урок 5: Знакомство с интерпретатором Python",
        topics: [
          "Введение в REPL (Read–Eval–Print Loop).",
          "Первая программа: \"Hello, World!\".",
          "Запуск Python-скриптов через файл .py.",
        ],
      },
    ],
  },
  {
    title: "Блок 2: Основы программирования на Python",
    lessons: [
      {
        title: "Урок 1: Переменные и типы данных",
        topics: [
          "Типы данных: int, float, str, bool.",
          "Создание и вывод переменных.",
        ],
      },
      {
        title: "Урок 2: Ввод и вывод данных",
        topics: [
          "Функции print() и input() для работы с данными.",
        ],
      },
      {
        title: "Урок 3: Условные операторы",
        topics: [
          "if, else, elif.",
          "Логические операторы: and, or, not.",
        ],
      },
      {
        title: "Урок 4: Циклы",
        topics: [
          "Циклы for и while.",
          "Прерывание циклов с break и continue.",
          "Вложенные циклы.",
        ],
      },
      {
        title: "Урок 5: Коллекции данных",
        topics: [
          "Списки (list): добавление, удаление элементов.",
          "Кортежи (tuple): неизменяемые списки.",
          "Словари (dict): ключ-значение.",
          "Множества (set).",
        ],
      },
      {
        title: "Урок 6: Функции",
        topics: [
          "Создание функций с помощью def.",
          "Аргументы функций (позиционные и именованные).",
          "Возвращаемые значения.",
        ],
      },
    ],
  },
  {
    title: "Блок 3: Объектно-ориентированное программирование (ООП)",
    lessons: [
      {
        title: "Урок 1: Основы ООП",
        topics: [
          "Что такое классы и объекты?",
          "Атрибуты и методы класса.",
        ],
      },
      {
        title: "Урок 2: Конструктор __init__",
        topics: [
          "Создание объектов с использованием конструктора.",
        ],
      },
      {
        title: "Урок 3: Принципы ООП",
        topics: [
          "Инкапсуляция, наследование и полиморфизм.",
          "Пример работы с абстракцией.",
        ],
      },
      {
        title: "Урок 4: Дополнительные темы ООП",
        topics: [
          "Статические методы и атрибуты.",
          "Магические методы (__str__, __repr__, __len__).",
          "Пример наследования классов.",
        ],
      },
    ],
  },
  {
    title: "Блок 4: Работа с модулями и файлами",
    lessons: [
      {
        title: "Урок 1: Модули и пакеты",
        topics: [
          "Импорт встроенных модулей и создание своих.",
        ],
      },
      {
        title: "Урок 2: Работа с файлами",
        topics: [
          "Чтение и запись текстовых файлов.",
          "Работа с JSON-файлами.",
        ],
      },
      {
        title: "Урок 3: Виртуальные окружения",
        topics: [
          "Создание окружения с venv.",
          "Установка зависимостей через pip.",
        ],
      },
    ],
  },
  {
    title: "Блок 5: Исключения и отладка",
    lessons: [
      {
        title: "Урок 1: Обработка исключений",
        topics: [
          "try, except, finally.",
          "Создание пользовательских исключений.",
        ],
      },
      {
        title: "Урок 2: Отладка программ",
        topics: [
          "Использование print() и встроенного отладчика pdb.",
        ],
      },
    ],
  },
  {
    title: "Блок 6: Работа с библиотеками",
    lessons: [
      {
        title: "Урок 1: Популярные встроенные модули",
        topics: [
          "os, datetime, random, math.",
        ],
      },
      {
        title: "Урок 2: Установка сторонних библиотек",
        topics: [
          "Установка библиотек с pip и поиск на PyPI.",
        ],
      },
      {
        title: "Урок 3: Полезные библиотеки для Python-разработчика",
        topics: [
          "requests: работа с HTTP-запросами.",
          "BeautifulSoup: парсинг данных с сайтов.",
          "pandas и matplotlib: работа с данными и их визуализация.",
        ],
      },
    ],
  },
  {
    title: "Блок 7: Работа с базами данных",
    lessons: [
      {
        title: "Урок 1: SQLite и SQL",
        topics: [
          "Подключение базы данных с sqlite3.",
          "Создание и выполнение запросов.",
        ],
      },
      {
        title: "Урок 2: Введение в ORM",
        topics: [
          "Основы SQLAlchemy и создание моделей.",
        ],
      },
    ],
  },
  {
    title: "Блок 8: Основы веб-разработки на Python",
    lessons: [
      {
        title: "Урок 1: Введение во Flask",
        topics: [
          "Установка и настройка Flask.",
          "Создание простого веб-приложения.",
        ],
      },
      {
        title: "Урок 2: Шаблонизация",
        topics: [
          "Использование Jinja2 для динамического контента.",
        ],
      },
      {
        title: "Урок 3: Обработка форм и запросов",
        topics: [
          "Работа с формами и методами POST/GET.",
        ],
      },
      {
        title: "Урок 4: Основы REST API",
        topics: [
          "Создание простого REST API на Flask.",
        ],
      },
    ],
  },
  {
    title: "Блок 9: Тестирование кода",
    lessons: [
      {
        title: "Урок 1: Тесты с unittest",
        topics: [
          "Написание unit-тестов для функций и классов.",
        ],
      },
      {
        title: "Урок 2: Использование pytest",
        topics: [
          "Автоматизация тестов и покрытие кода.",
        ],
      },
    ],
  },
  {
    title: "Блок 10: Продвинутые темы",
    lessons: [
      {
        title: "Урок 1: Асинхронное программирование",
        topics: [
          "Основы asyncio и использование await.",
        ],
      },
      {
        title: "Урок 2: Параллельность и многопоточность",
        topics: [
          "Модули threading и multiprocessing.",
        ],
      },
      {
        title: "Урок 3: Архитектура и паттерны",
        topics: [
          "Основные паттерны проектирования: Singleton, Factory.",
        ],
      },
    ],
  },
  {
    title: "Блок 11: Финальные проекты",
    lessons: [
      {
        title: "Уроки по проектам:",
        topics: [
          "Проект 1: Консольное приложение (To-Do List).",
          "Проект 2: Веб-приложение с Flask.",
          "Проект 3: Парсер данных с BeautifulSoup.",
          "Проект 4: Анализ данных с pandas и matplotlib.",
        ],
      },
    ],
  },
  {
    title: "Блок 12: Карьерное развитие",
    lessons: [
      {
        title: "Урок 1: Чистый код и PEP8",
        topics: [
          "Как писать чистый и поддерживаемый код.",
        ],
      },
      {
        title: "Урок 2: Создание портфолио и GitHub",
        topics: [
          "Подготовка проектов для демонстрации.",
        ],
      },
      {
        title: "Урок 3: Подготовка к собеседованию",
        topics: [
          "Типичные вопросы и задачи на интервью.",
        ],
      },
    ],
  },
];

const Program = () => {
  return (
    <>
      <Helmet>
        <title>Программа курса Python | Изучение Python с ИИ-учителем</title>
        <meta
          name="description"
          content="Подробная программа курса Python для начинающих. Изучите основы программирования, ООП, работу с базами данных, веб-разработку и многое другое с персональным ИИ-учителем."
        />
        <meta
          name="keywords"
          content="python курс, программа обучения python, python для начинающих, изучение python, уроки python"
        />
        <link rel="canonical" href="https://your-domain.com/program" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 dark:bg-gray-900"
      >
        <div className="container mx-auto px-4 py-12">
          <ProgramHeader />
          <CourseProgress />
          
          <div className="grid grid-cols-1 gap-8">
            {courseBlocks.map((block, index) => (
              <CourseBlock
                key={index}
                index={index}
                title={block.title}
                lessons={block.lessons}
              />
            ))}
          </div>

          <div className="mt-12">
            <ChatInterface />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Program;
