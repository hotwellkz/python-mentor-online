import { Question } from "@/types/question";

export const getQuestionsForLesson3_1 = (): Question[] => {
  return [
    {
      question: "Что такое УТП (уникальное торговое предложение)?",
      options: [
        "Особенность продукта, отличающая его от конкурентов",
        "Цена продукта",
        "Название продукта",
        "Логотип компании"
      ],
      correctAnswer: 0
    },
    {
      question: "Как определить ценность продукта для пользователя?",
      options: [
        "Только по цене продукта",
        "Через исследование проблем и потребностей пользователей",
        "По количеству функций",
        "По отзывам конкурентов"
      ],
      correctAnswer: 1
    },
    {
      question: "Что включает в себя продуктовая стратегия?",
      options: [
        "Только маркетинговый план",
        "Только технические характеристики",
        "Видение, цели, метрики и план развития продукта",
        "Только бюджет проекта"
      ],
      correctAnswer: 2
    },
    {
      question: "Как оценить эффективность продуктовой стратегии?",
      options: [
        "По ключевым метрикам и достижению поставленных целей",
        "Только по прибыли",
        "Только по количеству пользователей",
        "По мнению руководства"
      ],
      correctAnswer: 0
    }
  ];
};