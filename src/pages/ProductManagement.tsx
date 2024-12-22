import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Lightbulb, Target, Users, Clock, CheckCircle, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const ProductManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleStartLearning = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      navigate('/product-management-program');
    } else {
      navigate('/auth', { state: { from: '/product-management-program' } });
    }
  };

  return (
    <>
      <Helmet>
        <title>Курс Продукт-менеджмент Бесплатно | Обучение с ИИ-учителем</title>
        <meta
          name="description"
          content="Бесплатный курс по продукт-менеджменту с персональным ИИ-учителем. Изучите управление продуктом, аналитику, стратегию развития. Начните обучение сейчас!"
        />
        <meta
          name="keywords"
          content="курс продукт менеджмент бесплатно, обучение продакт менеджер, product management курс, управление продуктом обучение, product owner курсы"
        />
        <link rel="canonical" href={window.location.origin + "/product-management"} />
        <meta property="og:title" content="Курс Продукт-менеджмент Бесплатно | Обучение с ИИ-учителем" />
        <meta property="og:description" content="Бесплатный курс по продукт-менеджменту с персональным ИИ-учителем. Начните обучение сейчас!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.origin + "/product-management"} />
      </Helmet>

      <main className="min-h-screen">
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00B894] to-[#0984E3] opacity-90" />
          
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
                  <span className="bg-gradient-to-r from-[#74B9FF] via-[#81ECEC] to-[#55EFC4] bg-clip-text text-transparent">
                    Продукт-менеджмент
                  </span>{" "}
                  с Персональным ИИ-учителем
                </h1>
                <p className="text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto leading-relaxed">
                  Станьте востребованным продакт-менеджером с поддержкой 24/7. Изучите управление продуктом, аналитику и стратегию развития!
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 pt-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="lg" 
                      className="bg-[#00B894] text-white hover:bg-[#00A388] font-semibold text-lg px-8"
                      onClick={handleStartLearning}
                    >
                      Начать обучение
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12"
                >
                  {[
                    { number: "6 мес", label: "Длительность" },
                    { number: "24/7", label: "Поддержка" },
                    { number: "100%", label: "Практики" },
                    { number: "500+", label: "Выпускников" }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-[#81ECEC]">{stat.number}</div>
                      <div className="text-gray-200 mt-2">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                О курсе Продукт-менеджмента
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="flex items-start space-x-4">
                  <Users className="h-6 w-6 text-[#00B894] mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Для кого</h3>
                    <p className="text-gray-600">Начинающие специалисты без опыта в управлении продуктом</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-[#00B894] mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Длительность</h3>
                    <p className="text-gray-600">6 месяцев при занятиях 2-3 часа в день</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#F8FFFE] to-[#F0FFFC] rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">Чему вы научитесь:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Управлению продуктом",
                    "Проведению исследований",
                    "Построению метрик",
                    "Работе с командой",
                    "Развитию продукта",
                    "Анализу рынка"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-[#00B894]" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-[#00B894] to-[#0984E3] text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Готовы стать продакт-менеджером?
            </h2>
            <Button 
              size="lg" 
              className="bg-white text-[#00B894] hover:bg-gray-100"
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

export default ProductManagement;
