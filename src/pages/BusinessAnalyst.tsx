import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart2, Brain, ChartBar, LineChart, Users } from "lucide-react";

const BusinessAnalyst = () => {
  return (
    <>
      <Helmet>
        <title>Курс Бизнес-аналитик Бесплатно | Обучение с ИИ-учителем</title>
        <meta
          name="description"
          content="Бесплатный курс Бизнес-аналитика с персональным ИИ-учителем. Начните обучение прямо сейчас! Практические задания, поддержка 24/7, сертификат по окончании."
        />
        <meta
          name="keywords"
          content="курс бизнес аналитик бесплатно, обучение бизнес аналитике, бизнес аналитик обучение, курсы бизнес аналитики, стать бизнес аналитиком"
        />
        <link rel="canonical" href="https://your-domain.com/business-analyst" />
      </Helmet>

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#243949] to-[#517fa4] text-white py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-up">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Станьте Бизнес-аналитиком с Персональным ИИ-учителем
                </h1>
                <p className="text-xl text-gray-200">
                  Освойте профессию бизнес-аналитика за 8 месяцев с поддержкой ИИ 24/7
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/program">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      Начать бесплатно
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 animate-fade-up delay-200">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <ChartBar className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Аналитика данных</h3>
                  <p className="text-gray-200">Научитесь анализировать бизнес-процессы и данные</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <Users className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Работа с клиентами</h3>
                  <p className="text-gray-200">Освойте навыки коммуникации и сбора требований</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <LineChart className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Визуализация</h3>
                  <p className="text-gray-200">Создавайте понятные отчеты и презентации</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <Brain className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">ИИ-поддержка</h3>
                  <p className="text-gray-200">Персональный ИИ-учитель доступен 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Чему вы научитесь
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Анализ требований",
                  description: "Научитесь собирать и анализировать требования заказчика",
                  icon: Users,
                },
                {
                  title: "Бизнес-процессы",
                  description: "Освоите методологии описания и оптимизации бизнес-процессов",
                  icon: ChartBar,
                },
                {
                  title: "Работа с данными",
                  description: "Изучите SQL и методы анализа данных",
                  icon: BarChart2,
                },
                {
                  title: "Проектирование",
                  description: "Научитесь создавать прототипы и документацию",
                  icon: Brain,
                },
                {
                  title: "Agile и Scrum",
                  description: "Освоите гибкие методологии разработки",
                  icon: Users,
                },
                {
                  title: "Soft Skills",
                  description: "Разовьёте навыки коммуникации и презентации",
                  icon: Brain,
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow group"
                >
                  <feature.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default BusinessAnalyst;