import { Bot, Zap, Users, Brain } from "lucide-react";

const benefits = [
  {
    icon: Bot,
    title: "Персональный ИИ-учитель",
    description: "Индивидуальный подход к обучению с адаптивной программой",
  },
  {
    icon: Zap,
    title: "Быстрый старт",
    description: "Начните программировать уже сегодня без предварительной подготовки",
  },
  {
    icon: Users,
    title: "Сообщество",
    description: "Присоединяйтесь к сообществу начинающих программистов",
  },
  {
    icon: Brain,
    title: "Практика",
    description: "Решайте реальные задачи и создавайте проекты с первого дня",
  },
];

export const Benefits = () => {
  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Преимущества обучения с ИИ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
            >
              <benefit.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-300">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};