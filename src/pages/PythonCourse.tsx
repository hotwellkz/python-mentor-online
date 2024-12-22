import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Brain, Star, Users, Clock, CheckCircle } from "lucide-react";
import { Features } from "@/components/Features";

const PythonCourse = () => {
  return (
    <>
      <Helmet>
        <title>Изучайте Python Бесплатно | Курс Python с ИИ-учителем</title>
        <meta
          name="description"
          content="Бесплатный курс Python программирования с персональным ИИ-учителем. Начните изучать Python прямо сейчас! Интерактивные уроки, практические задания и поддержка 24/7."
        />
        <meta
          name="keywords"
          content="изучайте python бесплатно, python курс бесплатно, обучение python, python для начинающих, python уроки"
        />
        <meta property="og:title" content="Изучайте Python Бесплатно | Курс Python с ИИ-учителем" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Бесплатный курс Python программирования с персональным ИИ-учителем. Начните изучать Python прямо сейчас!" />
        <link rel="canonical" href="https://your-domain.com/python-course" />
      </Helmet>

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-400 to-blue-800 text-white py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up">
                Изучайте Python с Персональным ИИ-учителем
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                Начните свой путь в программировании с самого популярного языка. Бесплатно.
              </p>
              <div className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
                <Link to="/program">
                  <Button size="lg" className="bg-white text-blue-800 hover:bg-blue-50">
                    Начать обучение
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <Features />

        {/* Course Info Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                О курсе Python
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="flex items-start space-x-4">
                  <Users className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Для кого</h3>
                    <p className="text-gray-600">Начинающие программисты без опыта разработки</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Длительность</h3>
                    <p className="text-gray-600">10 месяцев при занятиях 2-3 часа в день</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-8">
                <h3 className="text-2xl font-semibold mb-4">Чему вы научитесь:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Основам программирования на Python",
                    "Работе с базами данных",
                    "Созданию веб-приложений",
                    "Анализу данных",
                    "Автоматизации процессов",
                    "Работе с API"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-blue-400 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Готовы начать свой путь в программировании?
            </h2>
            <Link to="/program">
              <Button size="lg" className="bg-white text-blue-800 hover:bg-blue-50">
                Начать бесплатно
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default PythonCourse;