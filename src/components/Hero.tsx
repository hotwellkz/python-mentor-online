import { GraduationCap, Code, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
            Изучайте программирование с{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Персональным ИИ-учителем
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto font-light">
            Погрузитесь в мир технологий с персональным наставником, который адаптируется под ваш темп обучения
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link to="/program">
            <Button 
              size="lg" 
              className="bg-white text-blue-800 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Начать бесплатно
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
          <Link to="/program">
            <Button 
              size="lg" 
              variant="outline" 
              className="text-white border-white hover:bg-white/10"
            >
              Узнать больше
              <Code className="ml-2" />
            </Button>
          </Link>
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