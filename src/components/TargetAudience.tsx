import { Brain, Code, Star, Users } from "lucide-react";

export const TargetAudience = () => {
  const audiences = [
    {
      icon: <Code className="w-12 h-12 text-primary" />,
      title: "Начинающие программисты",
      description: "Идеально подходит для тех, кто хочет начать карьеру в программировании с нуля"
    },
    {
      icon: <Brain className="w-12 h-12 text-primary" />,
      title: "Студенты",
      description: "Отличное дополнение к учебной программе для углубления знаний в Python"
    },
    {
      icon: <Star className="w-12 h-12 text-primary" />,
      title: "Специалисты по смене карьеры",
      description: "Для тех, кто хочет сменить профессию и войти в IT-сферу"
    },
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: "Энтузиасты технологий",
      description: "Для всех, кто интересуется программированием и хочет развиваться в этом направлении"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Кому подходит обучение
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {audiences.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-blue-50 rounded-full">{item.icon}</div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};