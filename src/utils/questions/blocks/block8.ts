import { Question } from '@/types/question';

export const getBlock8Questions = (lessonIndex: number): Question[] => {
  const questions: { [key: number]: Question[] } = {
    1: [
      {
        question: "Как установить Flask?",
        options: [
          "pip install flask",
          "pip install FlaskFramework",
          "python install flask",
          "flask install"
        ],
        correctAnswer: 0
      },
      {
        question: "Что такое Flask?",
        options: [
          "Фреймворк для обработки данных",
          "Лёгкий веб-фреймворк для создания веб-приложений",
          "Среда разработки для Python",
          "Интерфейс базы данных"
        ],
        correctAnswer: 1
      },
      {
        question: "Как создать простое веб-приложение в Flask?",
        options: [
          "Flask.run()",
          "app.run()",
          "start.Flask()",
          "run.app()"
        ],
        correctAnswer: 1
      },
      {
        question: "Какой метод используется для маршрутизации в Flask?",
        options: [
          "route()",
          "redirect()",
          "path()",
          "navigate()"
        ],
        correctAnswer: 0
      },
      {
        question: "Как запустить сервер Flask в режиме разработки?",
        options: [
          "Установить FLASK_ENV=development",
          "Запустить app.run(debug=True)",
          "Установить переменную окружения FLASK_DEBUG",
          "Все перечисленные варианты"
        ],
        correctAnswer: 3
      }
    ],
    2: [
      {
        question: "Что такое Jinja2?",
        options: [
          "Фреймворк для работы с HTML",
          "Шаблонизатор для создания динамического контента",
          "Язык программирования",
          "Библиотека для анализа данных"
        ],
        correctAnswer: 1
      },
      {
        question: "Какую функцию Flask использует для рендеринга шаблона?",
        options: [
          "render_template()",
          "template()",
          "render()",
          "html_render()"
        ],
        correctAnswer: 0
      },
      {
        question: "Как передать данные в шаблон Jinja2?",
        options: [
          "Передать через словарь",
          "Передать через функцию render_template",
          "Добавить в HTML-файл",
          "Все перечисленные варианты"
        ],
        correctAnswer: 1
      },
      {
        question: "Как вставить переменную в HTML-шаблон Jinja2?",
        options: [
          "{{ variable }}",
          "{ variable }",
          "{{ variable }}",
          "[% variable %]"
        ],
        correctAnswer: 2
      },
      {
        question: "Как организовать циклы в Jinja2?",
        options: [
          "for item in items:",
          "{% for item in items %} ... {% endfor %}",
          "{{ for item in items }}",
          "<for item in items>"
        ],
        correctAnswer: 1
      }
    ],
    3: [
      {
        question: "Какой модуль Flask используется для работы с запросами?",
        options: [
          "request",
          "form",
          "http",
          "api"
        ],
        correctAnswer: 0
      },
      {
        question: "Как получить данные из формы в Flask?",
        options: [
          "request.data",
          "request.form",
          "form.get()",
          "request.get()"
        ],
        correctAnswer: 1
      },
      {
        question: "Какой метод HTTP используется для отправки данных через форму?",
        options: [
          "GET",
          "POST",
          "PUT",
          "PATCH"
        ],
        correctAnswer: 1
      },
      {
        question: "Как вернуть JSON-ответ в Flask?",
        options: [
          "return jsonify(data)",
          "return json(data)",
          "return json_response(data)",
          "return JSON(data)"
        ],
        correctAnswer: 0
      },
      {
        question: "Что такое REST API?",
        options: [
          "Интерфейс для работы с базой данных",
          "Интерфейс для взаимодействия клиент-серверных приложений через HTTP",
          "Метод организации шаблонов",
          "Система управления сервером"
        ],
        correctAnswer: 1
      }
    ]
  };

  return questions[lessonIndex] || [];
};