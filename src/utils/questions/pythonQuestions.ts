import { Question } from '@/types/question';
import { getBlock7Questions } from './blocks/block7';
import { getBlock8Questions } from './blocks/block8';
import { getBlock9Questions } from './blocks/block9';
import { getBlock10Questions } from './blocks/block10';
import { getBlock11Questions } from './blocks/block11';
import { getBlock12Questions } from './blocks/block12';

export const getPythonQuestions = (blockIndex: number, lessonIndex: number): Question[] => {
  switch (blockIndex) {
    case 1:
      switch (lessonIndex) {
        case 1:
          return [
            {
              question: "Какую основную задачу решает Python?",
              options: [
                "Только для разработки игр",
                "Универсальный язык программирования",
                "Только для анализа данных",
                "Только для веб-разработки"
              ],
              correctAnswer: 1
            },
            {
              question: "В какой области Python НЕ используется?",
              options: [
                "Машинное обучение",
                "Анализ данных",
                "Веб-разработка",
                "Разработка встроенных систем (микроконтроллеров)"
              ],
              correctAnswer: 3
            },
            {
              question: "Какая из следующих компаний активно использует Python?",
              options: [
                "NASA",
                "Google",
                "Facebook",
                "Все перечисленные"
              ],
              correctAnswer: 3
            },
            {
              question: "Какая главная особенность Python делает его удобным для начинающих?",
              options: [
                "Быстродействие",
                "Понятный синтаксис",
                "Сложная структура",
                "Только графические возможности"
              ],
              correctAnswer: 1
            },
            {
              question: "Почему Python называется 'интерпретируемым' языком?",
              options: [
                "Код преобразуется в машинный на лету",
                "Требуется компиляция перед выполнением",
                "Работает только с интерпретатором на сервере",
                "Язык изначально создан для перевода текста"
              ],
              correctAnswer: 0
            }
          ];
        case 2:
          return [
            {
              question: "Где рекомендуется скачивать Python?",
              options: [
                "Сторонние сайты",
                "С официального сайта Python.org",
                "Торрент-трекеры",
                "GitHub"
              ],
              correctAnswer: 1
            },
            {
              question: "На каких операционных системах можно установить Python?",
              options: [
                "Только Windows",
                "Только macOS",
                "Только Linux",
                "Windows, macOS, Linux"
              ],
              correctAnswer: 3
            },
            {
              question: "Что нужно настроить после установки Python для корректной работы?",
              options: [
                "Переменные среды",
                "Права доступа",
                "Драйверы оборудования",
                "Все перечисленное"
              ],
              correctAnswer: 0
            },
            {
              question: "Для чего нужна настройка переменных среды?",
              options: [
                "Для улучшения производительности",
                "Чтобы запускать Python из командной строки",
                "Для работы с графическими интерфейсами",
                "Для доступа к интернету"
              ],
              correctAnswer: 1
            },
            {
              question: "Какой командой проверить установленную версию Python?",
              options: [
                "python --version",
                "python -check",
                "python --info",
                "python version-check"
              ],
              correctAnswer: 0
            }
          ];
        case 3:
          return [
            {
              question: "Какой из следующих редакторов можно использовать для работы с Python?",
              options: [
                "Microsoft Word",
                "PyCharm",
                "Photoshop",
                "Excel"
              ],
              correctAnswer: 1
            },
            {
              question: "Чем удобен VS Code для работы с Python?",
              options: [
                "Простая интеграция с интерпретатором Python",
                "Удобный интерфейс для редактирования видео",
                "Высокая скорость графики",
                "Только для веб-разработки"
              ],
              correctAnswer: 0
            },
            {
              question: "Как установить Python в VS Code?",
              options: [
                "Скачать отдельное приложение",
                "Через расширение Python Extension",
                "Через командную строку",
                "Встроено в VS Code"
              ],
              correctAnswer: 1
            },
            {
              question: "Какой из редакторов создан специально для работы с Python?",
              options: [
                "Sublime Text",
                "Jupyter Notebook",
                "Notepad++",
                "IntelliJ IDEA"
              ],
              correctAnswer: 1
            },
            {
              question: "Что НЕ является преимуществом PyCharm?",
              options: [
                "Подсветка синтаксиса",
                "Интеграция с базами данных",
                "Работа с большими графическими файлами",
                "Отладка кода"
              ],
              correctAnswer: 2
            }
          ];
        case 4:
          return [
            {
              question: "Какая команда используется для запуска Python из командной строки?",
              options: [
                "run python",
                "start python",
                "python",
                "open python"
              ],
              correctAnswer: 2
            },
            {
              question: "Как проверить версию установленного Python?",
              options: [
                "python --version",
                "python -show",
                "python -details",
                "python version"
              ],
              correctAnswer: 0
            },
            {
              question: "Что будет выведено при вводе команды python в терминале, если Python установлен правильно?",
              options: [
                "Ошибка",
                "Ничего",
                "Интерпретатор Python",
                "Открытие документации"
              ],
              correctAnswer: 2
            },
            {
              question: "Что такое CLI?",
              options: [
                "Интерфейс командной строки",
                "Среда графического интерфейса",
                "Файловая система",
                "Программа для редактирования кода"
              ],
              correctAnswer: 0
            },
            {
              question: "Как выйти из интерпретатора Python в терминале?",
              options: [
                "Набрать exit()",
                "Закрыть окно терминала",
                "Нажать Enter",
                "Написать quit()"
              ],
              correctAnswer: 0
            }
          ];
        case 5:
          return [
            {
              question: "Какой синтаксис используется для вывода текста 'Hello, World!'?",
              options: [
                "print('Hello, World!')",
                "echo 'Hello, World!'",
                "out('Hello, World!')",
                "say('Hello, World!')"
              ],
              correctAnswer: 0
            },
            {
              question: "Как называется структура, в которой выполняются команды Python?",
              options: [
                "IDE",
                "Интерпретатор",
                "Командный процессор",
                "GUI"
              ],
              correctAnswer: 1
            },
            {
              question: "Что нужно сделать перед запуском Python-скрипта?",
              options: [
                "Компиляция кода",
                "Сохранить файл с расширением .py",
                "Загрузить через Python Package Index",
                "Запустить Python Package Manager"
              ],
              correctAnswer: 1
            },
            {
              question: "Какая ошибка возникнет, если забыть закрыть кавычки в функции print()?",
              options: [
                "SyntaxError",
                "NameError",
                "TypeError",
                "ValueError"
              ],
              correctAnswer: 0
            },
            {
              question: "Что является первым шагом для создания программы?",
              options: [
                "Выбор темы программы",
                "Написание кода",
                "Запуск интерпретатора",
                "Создание файла .py"
              ],
              correctAnswer: 3
            }
          ];
        default:
          return [];
      }
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
      return [
        {
          question: "Какой тип приложений нельзя разрабатывать на Python?",
          options: [
            "Мобильные приложения",
            "Веб-сайты",
            "Скрипты автоматизации",
            "Игры"
          ],
          correctAnswer: 0
        },
        {
          question: "Какая компания НЕ использует Python?",
          options: [
            "Google",
            "Netflix",
            "Apple",
            "Nintendo"
          ],
          correctAnswer: 3
        },
        {
          question: "Сколько в среднем времени нужно для освоения базового Python?",
          options: [
            "1-2 месяца",
            "3-4 месяца",
            "6 месяцев",
            "2-3 года"
          ],
          correctAnswer: 1
        },
        {
          question: "В какой сфере Python используется наиболее активно?",
          options: [
            "Data Science и машинное обучение",
            "Разработка игр",
            "Мобильная разработка",
            "Дизайн"
          ],
          correctAnswer: 0
        },
        {
          question: "Какое преимущество Python делает его лучшим для начинающих?",
          options: [
            "Простой и понятный синтаксис",
            "Высокая производительность",
            "Строгая типизация",
            "Сложная система сборки"
          ],
          correctAnswer: 0
        }
      ];
  }
};