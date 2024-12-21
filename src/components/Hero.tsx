import { GraduationCap, Code } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-primary text-white px-4 py-20">
      <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-up">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Изучайте Python с Персональным ИИ-учителем
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
          Погрузитесь в мир программирования с персональным ИИ-наставником, который адаптируется под ваш темп обучения
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/program">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Начать бесплатно
              <GraduationCap className="ml-2" />
            </Button>
          </Link>
          <Link to="/program">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Узнать больше
              <Code className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};