import { GraduationCap } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const StartLearning = () => {
  const navigate = useNavigate();

  const handleStartLearning = () => {
    navigate('/devops-program');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center space-y-8 bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Начни проходить обучение прямо сейчас бесплатно
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600">
            Присоединяйтесь к нашему курсу и начните свой путь в программировании с персональным ИИ-наставником
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
              onClick={handleStartLearning}
            >
              Начать бесплатно
              <GraduationCap className="ml-2 h-6 w-6" />
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
            <motion.div
              whileHover={{ y: -5 }}
              className="flex items-start space-x-4"
            >
              <div className="bg-primary/10 p-3 rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Персональный подход</h3>
                <p className="text-gray-600">Обучение адаптируется под ваш темп</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="flex items-start space-x-4"
            >
              <div className="bg-primary/10 p-3 rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Практика сразу</h3>
                <p className="text-gray-600">Применяйте знания на реальных задачах</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="flex items-start space-x-4"
            >
              <div className="bg-primary/10 p-3 rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Поддержка 24/7</h3>
                <p className="text-gray-600">ИИ-наставник всегда на связи</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};