import { Question } from '@/types/question';

export const getBlock9Questions = (lessonIndex: number): Question[] => {
  const questions: { [key: number]: Question[] } = {
    1: [ // REST API
      {
        question: "Что такое REST API?",
        options: [
          "Архитектурный стиль для веб-сервисов",
          "База данных",
          "Язык программирования",
          "Фреймворк"
        ],
        correctAnswer: 0
      },
      {
        question: "Какой метод HTTP используется для получения данных?",
        options: [
          "GET",
          "POST",
          "PUT",
          "DELETE"
        ],
        correctAnswer: 0
      },
      {
        question: "Как вернуть JSON ответ во Flask?",
        options: [
          "jsonify(data)",
          "json.dumps(data)",
          "return_json(data)",
          "send_json(data)"
        ],
        correctAnswer: 0
      },
      {
        question: "Какой код состояния HTTP для успешного создания ресурса?",
        options: [
          "201",
          "200",
          "204",
          "202"
        ],
        correctAnswer: 0
      },
      {
        question: "Как обработать ошибку 404 во Flask?",
        options: [
          "@app.errorhandler(404)",
          "app.handle_404()",
          "@error(404)",
          "app.on_404()"
        ],
        correctAnswer: 0
      }
    ],
    2: [ // Работа с внешними API
      {
        question: "Как сделать GET запрос с помощью requests?",
        options: [
          "requests.get(url)",
          "requests.fetch(url)",
          "requests.request(url)",
          "requests.send(url)"
        ],
        correctAnswer: 0
      },
      {
        question: "Как добавить заголовки в запрос?",
        options: [
          "headers={'Authorization': 'Bearer token'}",
          "set_headers('Authorization', 'Bearer token')",
          "add_header('Authorization: Bearer token')",
          "with_headers({'auth': 'token'})"
        ],
        correctAnswer: 0
      },
      {
        question: "Как получить JSON из ответа API?",
        options: [
          "response.json()",
          "response.get_json()",
          "response.to_json()",
          "response.parse_json()"
        ],
        correctAnswer: 0
      },
      {
        question: "Как обработать ошибки в requests?",
        options: [
          "try-except requests.exceptions.RequestException",
          "on_error(callback)",
          "requests.handle_error()",
          "catch_errors()"
        ],
        correctAnswer: 0
      },
      {
        question: "Как сделать асинхронный запрос?",
        options: [
          "async with aiohttp.ClientSession()",
          "requests.async_get()",
          "await requests.get()",
          "requests.get_async()"
        ],
        correctAnswer: 0
      }
    ]
  };

  return questions[lessonIndex] || [];
};