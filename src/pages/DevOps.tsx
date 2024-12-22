import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, Code2, Database, Network, Server, Cloud, Container, BookOpen } from "lucide-react";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

const DevOps = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        navigate('/devops-program');
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Курс DevOps-инженер PRO | Обучение с ИИ-учителем</title>
        <meta
          name="description"
          content="Бесплатный курс DevOps-инженера с персональным ИИ-учителем. Изучайте DevOps практики, CI/CD, контейнеризацию и облачные технологии. Начните обучение прямо сейчас!"
        />
        <meta
          name="keywords"
          content="курс DevOps-инженер бесплатно, DevOps обучение, DevOps практики, CI/CD, Docker, Kubernetes, облачные технологии"
        />
      </Helmet>

      <main className="min-h-screen bg-[#1A1F2C]">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#243949] to-[#517fa4] text-white py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-up">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  DevOps-инженер PRO с Персональным ИИ-учителем
                </h1>
                <p className="text-xl opacity-90">
                  Освойте современные DevOps практики и инструменты под руководством ИИ-наставника
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/devops-program">
                    <Button size="lg" className="bg-[#6E59A5] hover:bg-[#8B5CF6] transition-all duration-300">
                      Начать обучение
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/pricing">
                    <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-[#D6BCFA]">
                      Тарифы
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative hidden md:block">
                <div className="absolute inset-0 bg-[#D6BCFA]/5 rounded-lg backdrop-blur-sm"></div>
                <div className="grid grid-cols-2 gap-4 relative">
                  {[
                    { icon: Code2, text: "CI/CD Pipeline" },
                    { icon: Container, text: "Docker" },
                    { icon: Server, text: "Kubernetes" },
                    { icon: Network, text: "Мониторинг" },
                    { icon: Database, text: "База данных" },
                    { icon: Cloud, text: "Облака" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-lg bg-[#403E43]/30 backdrop-blur-sm hover:bg-[#403E43]/50 transition-all animate-fade-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <item.icon className="h-8 w-8 mb-2 text-[#D6BCFA]" />
                      <p className="font-medium">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Новая эра обучения */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="relative bg-gradient-to-br from-[#6E59A5] to-[#403E43] rounded-2xl p-8 md:p-12 overflow-hidden">
              <div className="absolute inset-0 bg-[#D6BCFA]/5 backdrop-blur-sm"></div>
              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div className="text-white space-y-6">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-bold"
                  >
                    Новая эра обучения DevOps
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg opacity-90"
                  >
                    Изучайте DevOps с персональным ИИ-наставником, который адаптируется под ваш темп обучения
                  </motion.p>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <div className="p-2 bg-[#D6BCFA]/20 rounded-lg">
                      <BookOpen className="h-6 w-6 text-[#D6BCFA]" />
                    </div>
                    <span>Персонализированный подход к обучению</span>
                  </motion.div>
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
            </div>
          </div>
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
                  <Link to="/devops-program">
                    <Button size="lg" className="bg-[#6E59A5] hover:bg-[#8B5CF6] group">
                      Начать обучение
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
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
                    onClick={() => navigate('/faq')}
                  >
                    Смотреть все вопросы
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 1, question: "Что такое DevOps?" },
                    { id: 2, question: "Какие инструменты изучим?" },
                    { id: 3, question: "Нужен ли опыт?" },
                    { id: 4, question: "Как проходит обучение?" },
                  ].map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: item.id * 0.1 }}
                      className="bg-[#D6BCFA]/10 p-4 rounded-lg backdrop-blur-sm hover:bg-[#D6BCFA]/20 transition-colors cursor-pointer"
                      onClick={() => navigate('/faq')}
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
      </main>
    </>
  );
};

export default DevOps;