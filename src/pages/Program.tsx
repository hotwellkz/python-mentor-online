import { Helmet } from "react-helmet";
import { ChatInterface } from "@/components/chat/ChatInterface";

const Program = () => {
  return (
    <>
      <Helmet>
        <title>Программа курса | Python с ИИ-учителем</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Программа курса Python</h1>
        
        <div className="space-y-12">
          {/* Блок 1 */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-[#222222] dark:text-gray-200">
              Блок 1: Введение в программирование и установка Python
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 1: Знакомство с Python
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Что такое Python?</li>
                  <li>Почему Python популярен?</li>
                  <li>Области применения Python: веб-разработка, анализ данных, машинное обучение.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 2: Установка Python
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Где скачать Python (сайт Python.org).</li>
                  <li>Установка Python на Windows, macOS, Linux.</li>
                  <li>Настройка переменных среды для корректной работы.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 3: Настройка редактора кода
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Установка и настройка редакторов: VS Code, PyCharm, Jupyter Notebook.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 4: Проверка установки Python
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Работа с командной строкой (CLI).</li>
                  <li>Проверка версии Python.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 5: Знакомство с интерпретатором Python
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Введение в REPL (Read–Eval–Print Loop).</li>
                  <li>Первая программа: "Hello, World!".</li>
                  <li>Запуск Python-скриптов через файл .py.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Блок 2 */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-[#222222] dark:text-gray-200">
              Блок 2: Основы программирования на Python
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 1: Переменные и типы данных
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Типы данных: int, float, str, bool.</li>
                  <li>Создание и вывод переменных.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 2: Ввод и вывод данных
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Функции print() и input() для работы с данными.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 3: Условные операторы
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>if, else, elif.</li>
                  <li>Логические операторы: and, or, not.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 4: Циклы
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Циклы for и while.</li>
                  <li>Прерывание циклов с break и continue.</li>
                  <li>Вложенные циклы.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 5: Коллекции данных
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Списки (list): добавление, удаление элементов.</li>
                  <li>Кортежи (tuple): неизменяемые списки.</li>
                  <li>Словари (dict): ключ-значение.</li>
                  <li>Множества (set).</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 6: Функции
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Создание функций с помощью def.</li>
                  <li>Аргументы функций (позиционные и именованные).</li>
                  <li>Возвращаемые значения.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Блок 3 */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-[#222222] dark:text-gray-200">
              Блок 3: Объектно-ориентированное программирование (ООП)
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 1: Основы ООП
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Что такое классы и объекты?</li>
                  <li>Атрибуты и методы класса.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 2: Конструктор __init__
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Создание объектов с использованием конструктора.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 3: Принципы ООП
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Инкапсуляция, наследование и полиморфизм.</li>
                  <li>Пример работы с абстракцией.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 4: Дополнительные темы ООП
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Статические методы и атрибуты.</li>
                  <li>Магические методы (__str__, __repr__, __len__).</li>
                  <li>Пример наследования классов.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Блок 4 */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-[#222222] dark:text-gray-200">
              Блок 4: Работа с модулями и файлами
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 1: Модули и пакеты
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Импорт встроенных модулей и создание своих.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 2: Работа с файлами
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Чтение и запись текстовых файлов.</li>
                  <li>Работа с JSON-файлами.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 3: Виртуальные окружения
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Создание окружения с venv.</li>
                  <li>Установка зависимостей через pip.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Блок 5 */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-[#222222] dark:text-gray-200">
              Блок 5: Исключения и отладка
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 1: Обработка исключений
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>try, except, finally.</li>
                  <li>Создание пользовательских исключений.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 2: Отладка программ
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Использование print() и встроенного отладчика pdb.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Блок 6 */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-[#222222] dark:text-gray-200">
              Блок 6: Работа с библиотеками
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 1: Популярные встроенные модули
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>os, datetime, random, math.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 2: Установка сторонних библиотек
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Установка библиотек с pip и поиск на PyPI.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 3: Полезные библиотеки для Python-разработчика
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>requests: работа с HTTP-запросами.</li>
                  <li>BeautifulSoup: парсинг данных с сайтов.</li>
                  <li>pandas и matplotlib: работа с данными и их визуализация.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Блок 7 */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-[#222222] dark:text-gray-200">
              Блок 7: Работа с базами данных
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 1: SQLite и SQL
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Подключение базы данных с sqlite3.</li>
                  <li>Создание и выполнение запросов.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 2: Введение в ORM
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Основы SQLAlchemy и создание моделей.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Блок 8 */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-[#222222] dark:text-gray-200">
              Блок 8: Основы веб-разработки на Python
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 1: Введение во Flask
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Установка и настройка Flask.</li>
                  <li>Создание простого веб-приложения.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 2: Шаблонизация
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Использование Jinja2 для динамического контента.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 3: Обработка форм и запросов
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Работа с формами и методами POST/GET.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 4: Основы REST API
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Создание простого REST API на Flask.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Блок 9 */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-[#222222] dark:text-gray-200">
              Блок 9: Тестирование кода
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 1: Тесты с unittest
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Написание unit-тестов для функций и классов.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 2: Использование pytest
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Автоматизация тестов и покрытие кода.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Блок 10 */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-[#222222] dark:text-gray-200">
              Блок 10: Продвинутые темы
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 1: Асинхронное программирование
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Основы asyncio и использование await.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 2: Параллельность и многопоточность
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Модули threading и multiprocessing.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 3: Архитектура и паттерны
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Основные паттерны проектирования: Singleton, Factory.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Блок 11 */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-[#222222] dark:text-gray-200">
              Блок 11: Финальные проекты
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Уроки по проектам:
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Проект 1: Консольное приложение (To-Do List).</li>
                  <li>Проект 2: Веб-приложение с Flask.</li>
                  <li>Проект 3: Парсер данных с BeautifulSoup.</li>
                  <li>Проект 4: Анализ данных с pandas и matplotlib.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Блок 12 */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-[#222222] dark:text-gray-200">
              Блок 12: Карьерное развитие
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 1: Чистый код и PEP8
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Как писать чистый и поддерживаемый код.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 2: Создание портфолио и GitHub
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Подготовка проектов для демонстрации.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#333333] dark:text-gray-100">
                  Урок 3: Подготовка к собеседованию
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-[#444444] dark:text-gray-300">
                  <li>Типичные вопросы и задачи на интервью.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <ChatInterface />
      </div>
    </>
  );
};

export default Program;
