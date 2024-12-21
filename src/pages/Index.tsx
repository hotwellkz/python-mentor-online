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
        <title>Курсы с ИИ-учителем Бесплатно | Изучайте программирование онлайн</title>
        <meta
          name="description"
          content="Бесплатные курсы программирования с персональным ИИ-учителем. Python, DevOps и другие направления. Начните обучение прямо сейчас! Индивидуальный подход и поддержка 24/7."
        />
        <meta
          name="keywords"
          content="курсы с ИИ-учителем бесплатно, обучение программированию, Python курсы, DevOps курсы, ИИ учитель"
        />
        <meta
          property="og:title"
          content="Курсы с ИИ-учителем Бесплатно | Изучайте программирование онлайн"
        />
        <meta
          property="og:description"
          content="Бесплатные курсы программирования с персональным ИИ-учителем. Начните обучение прямо сейчас!"
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://your-domain.com" />
      </Helmet>
      <main className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-800">
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