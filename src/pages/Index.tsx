import { Helmet } from "react-helmet";
import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { Features } from "@/components/Features";
import { TargetAudience } from "@/components/TargetAudience";
import { Reviews } from "@/components/Reviews";
import { StartLearning } from "@/components/StartLearning";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Курс Python Бесплатно | Изучайте Python с ИИ-учителем</title>
        <meta
          name="description"
          content="Бесплатный курс Python с персональным ИИ-учителем. Начните изучать программирование прямо сейчас! Индивидуальный подход, практические задания и поддержка 24/7."
        />
        <meta
          name="keywords"
          content="курс Python бесплатно, изучение Python, программирование, ИИ учитель, обучение Python"
        />
        <meta
          property="og:title"
          content="Курс Python Бесплатно | Изучайте Python с ИИ-учителем"
        />
        <meta
          property="og:description"
          content="Бесплатный курс Python с персональным ИИ-учителем. Начните изучать программирование прямо сейчас!"
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://your-domain.com" />
      </Helmet>
      <main className="min-h-screen bg-gray-900">
        <Hero />
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