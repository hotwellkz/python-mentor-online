import { Helmet } from "react-helmet";
import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { Features } from "@/components/Features";
import { TargetAudience } from "@/components/TargetAudience";
import { Reviews } from "@/components/Reviews";
import { StartLearning } from "@/components/StartLearning";
import { Categories } from "@/components/Categories";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Курсы программирования с ИИ-учителем | Python, DevOps, Data Science</title>
        <meta
          name="description"
          content="Изучайте программирование с персональным ИИ-учителем. Python, DevOps, Data Science - интерактивные онлайн курсы с поддержкой 24/7. Начните обучение бесплатно!"
        />
        <meta
          name="keywords"
          content="курсы программирования, обучение python, devops курсы, data science обучение, ии учитель, онлайн обучение"
        />
        <link rel="canonical" href={window.location.origin} />
        <meta property="og:title" content="Курсы программирования с ИИ-учителем | Python, DevOps, Data Science" />
        <meta property="og:description" content="Изучайте программирование с персональным ИИ-учителем. Начните обучение бесплатно!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.origin} />
      </Helmet>
      <main className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-800">
        <h1 className="sr-only">Курсы программирования с ИИ-учителем</h1>
        <Hero />
        <Categories />
        <Features />
        <TargetAudience />
        <StartLearning />
        <Reviews />
        <Benefits />
      </main>
    </>
  );
};

export default Index;