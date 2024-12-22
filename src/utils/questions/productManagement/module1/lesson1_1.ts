import { Question } from "@/types/question";

export const getQuestionsForLesson1_1 = (): Question[] => {
  return [
    {
      question: "Какова основная роль продукт-менеджера?",
      options: [
        "Только разработка программного кода",
        "Определение видения продукта и управление его развитием",
        "Только тестирование продукта",
        "Только продажи продукта"
      ],
      correctAnswer: 1
    },
    {
      question: "Что НЕ входит в обязанности продукт-менеджера?",
      options: [
        "Анализ рынка",
        "Определение требований к продукту",
        "Написание программного кода",
        "Приоритизация задач"
      ],
      correctAnswer: 2
    },
    {
      question: "Какой навык наиболее важен для продукт-менеджера?",
      options: [
        "Умение программировать",
        "Стратегическое мышление и анализ",
        "Знание бухгалтерского учета",
        "Навыки продаж"
      ],
      correctAnswer: 1
    }
  ];
};