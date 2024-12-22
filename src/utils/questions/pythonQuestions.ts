import { Question } from '@/types/question';

export const getPythonQuestions = (blockIndex: number, lessonIndex: number): Question[] => {
  const questions: { [key: string]: { [key: string]: Question[] } } = {
    1: { // Блок 1: Введение в программирование и установка Python
      1: [ // Урок 1: Знакомство с Python
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
      ],
      2: [ // Урок 2: Установка Python
        {
          question: "Какую версию Python рекомендуется установить для начала обучения?",
          options: [
            "Python 3.x",
            "Python 2.x",
            "Python 1.x",
            "PyPy"
          ],
          correctAnswer: 0
        },
        {
          question: "Как проверить версию установленного Python в командной строке?",
          options: [
            "python --version",
            "python install",
            "python check",
            "python update"
          ],
          correctAnswer: 0
        },
        {
          question: "Зачем нужна переменная PATH при установке Python?",
          options: [
            "Для запуска Python из любой директории",
            "Для установки пакетов",
            "Для создания проектов",
            "Для удаления Python"
          ],
          correctAnswer: 0
        },
        {
          question: "Какой пакетный менеджер используется в Python по умолчанию?",
          options: [
            "pip",
            "npm",
            "yarn",
            "conda"
          ],
          correctAnswer: 0
        },
        {
          question: "Как создать виртуальное окружение в Python?",
          options: [
            "python -m venv myenv",
            "python create env",
            "pip install env",
            "python environment new"
          ],
          correctAnswer: 0
        }
      ],
      3: [ // Урок 3: Настройка редактора кода
        {
          question: "Какой редактор кода наиболее популярен для Python разработки?",
          options: [
            "VS Code",
            "Notepad",
            "Word",
            "Paint"
          ],
          correctAnswer: 0
        },
        {
          question: "Какое расширение необходимо установить в VS Code для работы с Python?",
          options: [
            "Python extension",
            "JavaScript extension",
            "Java extension",
            "C++ extension"
          ],
          correctAnswer: 0
        },
        {
          question: "Какой инструмент помогает форматировать код Python?",
          options: [
            "Black",
            "Prettier",
            "ESLint",
            "TSLint"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое Linter в Python?",
          options: [
            "Инструмент проверки стиля кода",
            "Компилятор",
            "Отладчик",
            "Интерпретатор"
          ],
          correctAnswer: 0
        },
        {
          question: "Какое сочетание клавиш запускает код в VS Code?",
          options: [
            "F5",
            "F1",
            "F12",
            "F8"
          ],
          correctAnswer: 0
        }
      ],
      4: [ // Урок 4: Проверка установки Python
        {
          question: "Как запустить интерактивную оболочку Python?",
          options: [
            "Ввести 'python' в командной строке",
            "Открыть браузер",
            "Запустить Word",
            "Открыть Проводник"
          ],
          correctAnswer: 0
        },
        {
          question: "Какая команда показывает список установленных пакетов Python?",
          options: [
            "pip list",
            "pip show",
            "pip install",
            "pip check"
          ],
          correctAnswer: 0
        },
        {
          question: "Как выйти из интерактивной оболочки Python?",
          options: [
            "exit()",
            "quit",
            "close",
            "stop"
          ],
          correctAnswer: 0
        },
        {
          question: "Какое расширение имеют файлы Python?",
          options: [
            ".py",
            ".js",
            ".html",
            ".css"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое IDLE в Python?",
          options: [
            "Встроенная среда разработки",
            "Игра",
            "Браузер",
            "Текстовый редактор"
          ],
          correctAnswer: 0
        }
      ]
    },
    2: { // Блок 2: Основы программирования на Python
      1: [ // Урок 1: Переменные и типы данных
        {
          question: "Какой тип данных используется для целых чисел в Python?",
          options: [
            "int",
            "float",
            "str",
            "bool"
          ],
          correctAnswer: 0
        },
        {
          question: "Как узнать тип переменной в Python?",
          options: [
            "type()",
            "typeof()",
            "getType()",
            "checkType()"
          ],
          correctAnswer: 0
        },
        {
          question: "Какое значение имеет переменная типа bool?",
          options: [
            "True или False",
            "0 или 1",
            "Yes или No",
            "On или Off"
          ],
          correctAnswer: 0
        },
        {
          question: "Как объявить строковую переменную в Python?",
          options: [
            "name = 'John'",
            "string name = 'John'",
            "var name = 'John'",
            "let name = 'John'"
          ],
          correctAnswer: 0
        },
        {
          question: "Какой тип данных используется для дробных чисел?",
          options: [
            "float",
            "int",
            "decimal",
            "double"
          ],
          correctAnswer: 0
        }
      ],
      2: [ // Урок 2: Ввод и вывод данных
        {
          question: "Какая функция используется для вывода данных в консоль?",
          options: [
            "print()",
            "console.log()",
            "write()",
            "output()"
          ],
          correctAnswer: 0
        },
        {
          question: "Как получить ввод от пользователя в Python?",
          options: [
            "input()",
            "get()",
            "read()",
            "scanf()"
          ],
          correctAnswer: 0
        },
        {
          question: "Какой тип данных возвращает функция input()?",
          options: [
            "str",
            "int",
            "float",
            "bool"
          ],
          correctAnswer: 0
        },
        {
          question: "Как преобразовать строку в число?",
          options: [
            "int()",
            "toInt()",
            "parse()",
            "convert()"
          ],
          correctAnswer: 0
        },
        {
          question: "Какой оператор используется для форматирования строк?",
          options: [
            "f''",
            "format()",
            "%",
            "Все перечисленные"
          ],
          correctAnswer: 3
        }
      ],
      3: [ // Урок 3: Условные операторы
        {
          question: "Какое ключевое слово используется для условного оператора?",
          options: [
            "if",
            "when",
            "switch",
            "case"
          ],
          correctAnswer: 0
        },
        {
          question: "Что означает оператор elif?",
          options: [
            "else if",
            "end if",
            "else loop",
            "end loop"
          ],
          correctAnswer: 0
        },
        {
          question: "Какой оператор сравнения проверяет равенство?",
          options: [
            "==",
            "=",
            "===",
            "!="
          ],
          correctAnswer: 0
        },
        {
          question: "Как записать условие 'или' в Python?",
          options: [
            "or",
            "||",
            "|",
            "OR"
          ],
          correctAnswer: 0
        },
        {
          question: "Какой оператор используется для отрицания условия?",
          options: [
            "not",
            "!",
            "~",
            "^"
          ],
          correctAnswer: 0
        }
      ],
      4: [ // Урок 4: Циклы
        {
          question: "Какой цикл используется для определенного количества итераций?",
          options: [
            "for",
            "while",
            "loop",
            "repeat"
          ],
          correctAnswer: 0
        },
        {
          question: "Как досрочно прервать цикл?",
          options: [
            "break",
            "exit",
            "stop",
            "end"
          ],
          correctAnswer: 0
        },
        {
          question: "Что делает оператор continue?",
          options: [
            "Пропускает текущую итерацию",
            "Завершает цикл",
            "Начинает цикл заново",
            "Останавливает программу"
          ],
          correctAnswer: 0
        },
        {
          question: "Как создать последовательность чисел в цикле for?",
          options: [
            "range()",
            "sequence()",
            "list()",
            "numbers()"
          ],
          correctAnswer: 0
        },
        {
          question: "Какой цикл выполняется, пока условие истинно?",
          options: [
            "while",
            "for",
            "loop",
            "repeat"
          ],
          correctAnswer: 0
        }
      ],
      5: [ // Урок 5: Коллекции данных
        {
          question: "Какая коллекция является изменяемой?",
          options: [
            "list",
            "tuple",
            "str",
            "frozenset"
          ],
          correctAnswer: 0
        },
        {
          question: "Как создать пустой список?",
          options: [
            "[]",
            "()",
            "{}",
            "<>"
          ],
          correctAnswer: 0
        },
        {
          question: "Какой метод добавляет элемент в конец списка?",
          options: [
            "append()",
            "add()",
            "push()",
            "insert()"
          ],
          correctAnswer: 0
        },
        {
          question: "Как получить длину списка?",
          options: [
            "len()",
            "length()",
            "size()",
            "count()"
          ],
          correctAnswer: 0
        },
        {
          question: "Какая коллекция хранит уникальные элементы?",
          options: [
            "set",
            "list",
            "tuple",
            "dict"
          ],
          correctAnswer: 0
        }
      ],
      6: [ // Урок 6: Функции
        {
          question: "Какое ключевое слово используется для создания функции?",
          options: [
            "def",
            "function",
            "fun",
            "func"
          ],
          correctAnswer: 0
        },
        {
          question: "Как задать значение параметра по умолчанию?",
          options: [
            "param = value",
            "param: value",
            "param -> value",
            "param == value"
          ],
          correctAnswer: 0
        },
        {
          question: "Что делает оператор return?",
          options: [
            "Возвращает значение из функции",
            "Печатает значение",
            "Завершает программу",
            "Начинает новую функцию"
          ],
          correctAnswer: 0
        },
        {
          question: "Как передать неограниченное количество аргументов?",
          options: [
            "*args",
            "args[]",
            "...args",
            "args..."
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое lambda функция?",
          options: [
            "Анонимная функция",
            "Главная функция",
            "Вложенная функция",
            "Рекурсивная функция"
          ],
          correctAnswer: 0
        }
      ]
    }
  };

  return questions[blockIndex]?.[lessonIndex] || [];
};