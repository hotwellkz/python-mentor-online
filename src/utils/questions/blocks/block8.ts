import { Question } from '@/types/question';

export const getBlock8Questions = (lessonIndex: number): Question[] => {
  const questions: { [key: number]: Question[] } = {
    1: [ // Введение в веб-разработку
      {
        question: "Что такое Flask?",
        options: [
          "Микрофреймворк для веб-разработки",
          "База данных",
          "Язык программирования",
          "Операционная система"
        ],
        correctAnswer: 0
      },
      {
        question: "Как создать маршрут в Flask?",
        options: [
          "@app.route('/')",
          "app.create_route('/')",
          "app.new_route('/')",
          "route.add('/')"
        ],
        correctAnswer: 0
      },
      {
        question: "Какой метод используется для запуска Flask приложения?",
        options: [
          "app.run()",
          "app.start()",
          "app.begin()",
          "app.launch()"
        ],
        correctAnswer: 0
      },
      {
        question: "Как получить данные из GET запроса во Flask?",
        options: [
          "request.args.get()",
          "request.get_data()",
          "request.params()",
          "request.query()"
        ],
        correctAnswer: 0
      },
      {
        question: "Какой декоратор используется для обработки POST запросов?",
        options: [
          "@app.route('/', methods=['POST'])",
          "@app.post('/')",
          "@post('/')",
          "@route.post('/')"
        ],
        correctAnswer: 0
      }
    ],
    2: [ // Шаблоны и формы
      {
        question: "Как передать переменную в шаблон Jinja2?",
        options: [
          "render_template('template.html', var=value)",
          "template.render(var=value)",
          "show_template('template.html', var=value)",
          "display('template.html', var=value)"
        ],
        correctAnswer: 0
      },
      {
        question: "Как создать цикл в шаблоне Jinja2?",
        options: [
          "{% for item in items %}",
          "<for item in items>",
          "{{for item in items}}",
          "@for item in items"
        ],
        correctAnswer: 0
      },
      {
        question: "Как получить данные из формы POST запроса?",
        options: [
          "request.form.get()",
          "form.data()",
          "request.post()",
          "form.get_data()"
        ],
        correctAnswer: 0
      },
      {
        question: "Как работать с загруженными файлами во Flask?",
        options: [
          "request.files['file']",
          "request.uploads['file']",
          "form.files['file']",
          "upload.file()"
        ],
        correctAnswer: 0
      },
      {
        question: "Как создать сессию во Flask?",
        options: [
          "session['key'] = value",
          "create_session('key', value)",
          "new_session('key', value)",
          "flask.session.create('key', value)"
        ],
        correctAnswer: 0
      }
    ]
  };

  return questions[lessonIndex] || [];
};