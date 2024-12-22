import { GraduationCap, BookOpen, ListOrdered, ArrowRight, Container, Server } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const DevOpsFeatures = () => {
  const navigate = useNavigate();
  
  const scrollToCategories = (e: React.MouseEvent) => {
    e.preventDefault();
    const categoriesSection = document.querySelector('#categories-section');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const questions = [
    {
      id: 1,
      question: "Что такое DevOps?",
    },
    {
      id: 2,
      question: "Какие инструменты изучим?",
    },
    {
      id: 3,
      question: "Нужен ли опыт?",
    },
    {
      id: 4,
      question: "Как проходит обучение?",
    }
  ];

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Новая эра обучения */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#6E59A5] to-[#8B5CF6] p-8 md:p-12">
          <div className="relative z-10 grid gap-8 md:grid-cols-2 items-center">
            <div className="text-white space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Новая эра обучения DevOps</h2>
              <p className="text-lg opacity-90">
                Изучите DevOps с персональным ИИ-наставником, который адаптируется под ваш темп обучения
              </p>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#D6BCFA]/20 rounded-lg">
                  <BookOpen className="h-6 w-6 text-[#D6BCFA]" />
                </div>
                <span>Персонализированный подход к обучению</span>
              </div>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-[#D6BCFA]/20 rounded-full blur-2xl"></div>
                <Container className="w-32 h-32 text-[#D6BCFA] animate-float" />
              </div>
            </motion.div>
          </div>
          <div className="absolute inset-0 bg-[#D6BCFA]/5 backdrop-blur-sm"></div>
        </section>

        {/* Пройти обучение */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#1A1F2C]">
                    Пройти обучение DevOps
                  </h2>
                  <p className="text-lg text-gray-600">
                    Начните свой путь в DevOps прямо сейчас. Первый урок бесплатно!
                  </p>
                  <Button size="lg" className="bg-[#6E59A5] hover:bg-[#8B5CF6] group">
                    Начать обучение
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="flex justify-center">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-[#6E59A5]/10 rounded-full animate-pulse"></div>
                    <Server className="w-32 h-32 text-[#6E59A5] relative z-10" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Топ 10 вопросов */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-[#403E43] to-[#1A1F2C] rounded-2xl p-8 md:p-12 text-white"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold">Топ 10 вопросов о DevOps</h2>
                  <p className="text-lg opacity-90">
                    Ответы на самые популярные вопросы о курсе DevOps и обучении с ИИ-учителем
                  </p>
                  <Button 
                    variant="secondary" 
                    className="bg-[#6E59A5] text-white hover:bg-[#8B5CF6]"
                    onClick={() => navigate('/devops-faq')}
                  >
                    Смотреть вопросы
                    <ListOrdered className="ml-2 w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {questions.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: item.id * 0.1 }}
                      className="bg-[#D6BCFA]/10 p-4 rounded-lg backdrop-blur-sm hover:bg-[#D6BCFA]/20 transition-colors cursor-pointer"
                      onClick={() => navigate('/devops-faq')}
                    >
                      <span className="text-2xl font-bold text-[#D6BCFA]">#{item.id}</span>
                      <p className="text-sm mt-2 opacity-80">{item.question}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};