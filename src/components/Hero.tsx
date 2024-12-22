import { GraduationCap, Code, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  const scrollToCategories = (e: React.MouseEvent) => {
    e.preventDefault();
    const categoriesSection = document.querySelector('#categories-section');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartLearning = () => {
    navigate('/program');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-[#E5DEFF]">
            Изучайте курсы с{" "}
            <span className="bg-gradient-to-r from-[#D6BCFA] to-[#F1F1F1] bg-clip-text text-transparent">
              Персональным ИИ-учителем
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-[#F1F1F1] max-w-2xl mx-auto font-light">
            Погрузитесь в мир технологий с персональным наставником, который адаптируется под ваш темп обучения
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Button 
            size="lg" 
            className="bg-white text-blue-800 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            onClick={scrollToCategories}
          >
            Начать обучение
            <ArrowRight className="ml-2" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-[#9b87f5] text-white hover:bg-[#8B5CF6] border-none"
            onClick={scrollToCategories}
          >
            Узнать больше
            <Code className="ml-2" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { icon: GraduationCap, text: "Персональный подход" },
            { icon: Code, text: "Практика с первого дня" },
            { icon: ArrowRight, text: "Быстрый старт" }
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center space-y-2 text-white"
            >
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <item.icon className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/60 text-sm"
          >
            Прокрутите вниз
            <ArrowRight className="h-4 w-4 mx-auto mt-2 rotate-90" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};