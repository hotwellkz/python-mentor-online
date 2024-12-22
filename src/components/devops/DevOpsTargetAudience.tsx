import { Brain, Code2, Server, Cloud } from "lucide-react";
import { motion } from "framer-motion";

export const DevOpsTargetAudience = () => {
  const audiences = [
    {
      icon: <Code2 className="w-12 h-12 text-[#D6BCFA]" />,
      title: "DevOps специалисты",
      description: "Идеально подходит для тех, кто хочет углубить свои знания в DevOps практиках"
    },
    {
      icon: <Brain className="w-12 h-12 text-[#D6BCFA]" />,
      title: "Разработчики",
      description: "Для программистов, желающих освоить инструменты и практики DevOps"
    },
    {
      icon: <Server className="w-12 h-12 text-[#D6BCFA]" />,
      title: "Системные администраторы",
      description: "Для тех, кто хочет развиваться в направлении современной разработки"
    },
    {
      icon: <Cloud className="w-12 h-12 text-[#D6BCFA]" />,
      title: "Начинающие в DevOps",
      description: "Для всех, кто хочет войти в мир DevOps с нуля"
    }
  ];

  return (
    <section className="py-16 bg-[#1A1F2C]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
          Кому подходит обучение DevOps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {audiences.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#403E43]/30 backdrop-blur-sm p-6 rounded-xl hover:bg-[#403E43]/50 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-[#6E59A5]/10 rounded-full">{item.icon}</div>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};