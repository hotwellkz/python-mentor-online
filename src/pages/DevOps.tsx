import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Code2, Database, Network, Server, Cloud, Container } from "lucide-react";

const DevOps = () => {
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

      <main className="min-h-screen">
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
                  <Link to="/auth">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      Начать обучение
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/pricing">
                    <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20">
                      Тарифы
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative hidden md:block">
                <div className="absolute inset-0 bg-white/5 rounded-lg backdrop-blur-sm"></div>
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
                      className="p-6 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all animate-fade-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <item.icon className="h-8 w-8 mb-2" />
                      <p className="font-medium">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Преимущества */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Почему стоит выбрать наш курс
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Персональный ИИ-наставник",
                  description: "Получите поддержку 24/7 от вашего личного ИИ-учителя",
                },
                {
                  title: "Практические проекты",
                  description: "Работайте над реальными DevOps задачами и кейсами",
                },
                {
                  title: "Современные технологии",
                  description: "Изучайте актуальные инструменты и практики DevOps",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle2 className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default DevOps;