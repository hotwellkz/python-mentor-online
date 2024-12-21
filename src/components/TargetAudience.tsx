import { Check } from "lucide-react";

export const TargetAudience = () => {
  const audiences = [
    {
      title: "Начинающие программисты",
      description: "Те, кто хочет начать карьеру в IT с нуля",
      icon: "🚀",
    },
    {
      title: "Студенты",
      description: "Учащиеся, желающие углубить свои знания в программировании",
      icon: "📚",
    },
    {
      title: "Профессионалы",
      description: "Разработчики, желающие освоить Python",
      icon: "💼",
    },
    {
      title: "Энтузиасты",
      description: "Люди, интересующиеся автоматизацией и анализом данных",
      icon: "🔍",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          Кому подходит обучение
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {audiences.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
              <div className="mt-4 flex items-center text-primary">
                <Check className="w-5 h-5 mr-2" />
                <span className="text-sm">Подходит вам</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};