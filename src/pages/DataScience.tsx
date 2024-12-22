import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Brain, Star, Users, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@supabase/auth-helpers-react";

const DataScience = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleStartLearning = () => {
    if (auth?.user) {
      navigate('/data-science-program');
    } else {
      navigate('/auth', { state: { returnTo: '/data-science-program' } });
    }
  };

  return (
    <>
      <Helmet>
        <title>Изучайте Data Science Бесплатно | Курс Data Science с ИИ-учителем</title>
        <meta
          name="description"
          content="Бесплатный курс Data Science с персональным ИИ-учителем. Начните изучать Data Science прямо сейчас! Интерактивные уроки, практические задания и поддержка 24/7."
        />
        <meta
          name="keywords"
          content="изучайте data science бесплатно, data science курс бесплатно, обучение data science, data science для начинающих, data science уроки"
        />
        <meta property="og:title" content="Изучайте Data Science Бесплатно | Курс Data Science с ИИ-учителем" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Бесплатный курс Data Science с персональным ИИ-учителем. Начните изучать Data Science прямо сейчас!" />
        <link rel="canonical" href="https://your-domain.com/data-science" />
      </Helmet>

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A1F2C] to-[#221F26]" />
          
          {/* Animated background patterns */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,#ffffff20_1px,transparent_1px)] bg-[length:40px_40px]" />
            <div className="absolute inset-0 bg-[linear-gradient(-45deg,#ffffff15_1px,transparent_1px)] bg-[length:40px_40px]" />
          </div>
          
          <div className="container relative mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                  Освойте{" "}
                  <span className="bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                    Data Science
                  </span>{" "}
                  с Персональным ИИ-учителем
                </h1>
                <p className="text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto leading-relaxed">
                  Погрузитесь в мир анализа данных с поддержкой 24/7. Начните свой путь в Data Science прямо сейчас!
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 pt-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="lg" 
                      className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-semibold text-lg px-8"
                      onClick={handleStartLearning}
                    >
                      Начать обучение
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12"
                >
                  {[
                    { number: "500+", label: "Уроков" },
                    { number: "24/7", label: "Поддержка" },
                    { number: "100%", label: "Практики" },
                    { number: "1000+", label: "Студентов" }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-yellow-300">{stat.number}</div>
                      <div className="text-gray-200 mt-2">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Course Info Section */}
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
                О курсе Data Science
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="flex items-start space-x-4">
                  <Users className="h-6 w-6 text-yellow-400 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Для кого</h3>
                    <p className="text-gray-300">Начинающие специалисты без опыта в анализе данных</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-yellow-400 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Длительность</h3>
                    <p className="text-gray-300">12 месяцев при занятиях 2-3 часа в день</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-semibold mb-4 text-white">Чему вы научитесь:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Анализу данных с Python",
                    "Машинному обучению",
                    "Визуализации данных",
                    "Статистическому анализу",
                    "Deep Learning",
                    "Работе с Big Data"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-200">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-[#1A1F2C] to-[#221F26] text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Готовы начать свой путь в Data Science?
            </h2>
            <Button 
              size="lg" 
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-300"
              onClick={handleStartLearning}
            >
              Начать бесплатно
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default DataScience;
