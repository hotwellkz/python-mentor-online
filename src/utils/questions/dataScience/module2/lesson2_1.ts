import { Question } from "@/types/question";

export const getQuestionsForLesson2_1 = (): Question[] => [
  {
    question: "Какой тип данных в Python представляет список?",
    options: [
      "dict",
      "list",
      "set",
      "str"
    ],
    correctAnswer: 1
  },
  {
    question: "Какая библиотека Python используется для работы с таблицами?",
    options: [
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Scikit-learn"
    ],
    correctAnswer: 1
  },
  {
    question: "Какой метод в Pandas используется для фильтрации данных?",
    options: [
      "sort()",
      "filter()",
      "query()",
      "merge()"
    ],
    correctAnswer: 2
  },
  {
    question: "Что делает функция numpy.mean()?",
    options: [
      "Считает среднее значение",
      "Умножает матрицы",
      "Удаляет пустые строки",
      "Построение графиков"
    ],
    correctAnswer: 0
  },
  {
    question: "Какой синтаксис используется для импортирования библиотеки NumPy?",
    options: [
      "import numpy as np",
      "from numpy import pandas",
      "import pandas as pd",
      "import numpytools"
    ],
    correctAnswer: 0
  }
];