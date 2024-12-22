import { Question } from '@/types/question';

export const getBlock9Questions = (lessonIndex: number): Question[] => {
  const questions: { [key: number]: Question[] } = {
    1: [
      {
        question: "Как импортировать модуль для написания unit-тестов?",
        options: [
          "import unittest",
          "import pytest",
          "import testing",
          "import test"
        ],
        correctAnswer: 0
      },
      {
        question: "Как определить класс тестов в unittest?",
        options: [
          "Класс должен наследоваться от unittest.TestCase",
          "Класс должен наследоваться от test.UnitTest",
          "Класс должен начинаться с Test",
          "Не нужно наследование"
        ],
        correctAnswer: 0
      },
      {
        question: "Как называется метод для проверки равенства значений в unittest?",
        options: [
          "check_equal()",
          "assertEqual()",
          "testEqual()",
          "compare()"
        ],
        correctAnswer: 1
      },
      {
        question: "Как запустить тесты из файла?",
        options: [
          "python -m unittest test_file.py",
          "python test_file.py",
          "unittest run test_file",
          "pytest test_file.py"
        ],
        correctAnswer: 0
      },
      {
        question: "Какой метод выполняется перед каждым тестовым методом?",
        options: [
          "setUp()",
          "prepare()",
          "beforeTest()",
          "initTest()"
        ],
        correctAnswer: 0
      }
    ]
  };

  return questions[lessonIndex] || [];
};