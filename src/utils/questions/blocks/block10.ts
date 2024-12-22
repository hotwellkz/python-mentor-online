import { Question } from '@/types/question';

export const getBlock10Questions = (lessonIndex: number): Question[] => {
  const questions: { [key: number]: Question[] } = {
    1: [ // Асинхронное программирование
      {
        question: "Что такое асинхронное программирование?",
        options: [
          "Параллельное выполнение задач",
          "Одновременное выполнение задач в разных потоках",
          "Выполнение задач, не блокируя основного потока",
          "Управление процессами операционной системы"
        ],
        correctAnswer: 2
      },
      {
        question: "Какие ключевые слова используются для асинхронного программирования в Python?",
        options: [
          "async, await",
          "async, yield",
          "def, await",
          "await, return"
        ],
        correctAnswer: 0
      },
      {
        question: "Как создать асинхронную функцию?",
        options: [
          "async my_function()",
          "def my_function(async):",
          "async def my_function():",
          "def async my_function():"
        ],
        correctAnswer: 2
      },
      {
        question: "Как выполнить асинхронную функцию?",
        options: [
          "asyncio.run(my_function())",
          "await my_function()",
          "async_run(my_function())",
          "a и b"
        ],
        correctAnswer: 3
      },
      {
        question: "Как называется объект, который возвращается асинхронной функцией?",
        options: [
          "Future",
          "Coroutine",
          "AsyncTask",
          "EventLoop"
        ],
        correctAnswer: 1
      }
    ],
    2: [ // Многопоточность и многопроцессорность
      {
        question: "Какой модуль используется для работы с потоками в Python?",
        options: [
          "threading",
          "multiprocessing",
          "async",
          "parallel"
        ],
        correctAnswer: 0
      },
      {
        question: "Какой модуль используется для работы с процессами?",
        options: [
          "threading",
          "multiprocessing",
          "asyncio",
          "subprocess"
        ],
        correctAnswer: 1
      },
      {
        question: "Как создать поток с использованием модуля threading?",
        options: [
          "Thread.run()",
          "thread.start()",
          "Thread.create()",
          "thread.run()"
        ],
        correctAnswer: 1
      },
      {
        question: "Чем отличается поток от процесса?",
        options: [
          "Поток работает в рамках одного процесса",
          "Процесс может содержать несколько потоков",
          "Процессы изолированы друг от друга",
          "Все перечисленные ответы верны"
        ],
        correctAnswer: 3
      },
      {
        question: "Как завершить процесс в модуле multiprocessing?",
        options: [
          "process.terminate()",
          "process.kill()",
          "process.stop()",
          "process.shutdown()"
        ],
        correctAnswer: 0
      }
    ],
    3: [ // Работа с API
      {
        question: "Что означает API?",
        options: [
          "Application Programming Interface",
          "Application Program Integration",
          "Advanced Programming Interface",
          "Advanced Protocol Integration"
        ],
        correctAnswer: 0
      },
      {
        question: "Какой метод HTTP используется для получения данных?",
        options: [
          "POST",
          "GET",
          "PUT",
          "DELETE"
        ],
        correctAnswer: 1
      },
      {
        question: "Какой формат данных чаще всего используется при работе с API?",
        options: [
          "XML",
          "JSON",
          "CSV",
          "YAML"
        ],
        correctAnswer: 1
      },
      {
        question: "Как отправить POST-запрос с помощью библиотеки requests?",
        options: [
          "requests.send()",
          "requests.post()",
          "requests.upload()",
          "requests.send_post()"
        ],
        correctAnswer: 1
      },
      {
        question: "Что такое токен доступа (access token) в API?",
        options: [
          "Инструмент для тестирования API",
          "Ключ для аутентификации клиента",
          "Программное обеспечение для работы с API",
          "Пароль для доступа к серверу"
        ],
        correctAnswer: 1
      }
    ]
  };

  return questions[lessonIndex] || [];
};