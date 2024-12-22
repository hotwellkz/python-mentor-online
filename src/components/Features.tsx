import { GraduationCap, BookOpen, ListOrdered, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const Features = () => {
  const scrollToCategories = (e: React.MouseEvent) => {
    e.preventDefault();
    const categoriesSection = document.querySelector('#categories-section');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Новая эра обучения */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 p-8 md:p-12">
          <div className="relative z-10 grid gap-8 md:grid-cols-2 items-center">
            <div className="text-white space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Новая эра обучения</h2>
              <p className="text-lg opacity-90">
                Погрузитесь в мир программирования с персональным ИИ-наставником, который адаптируется под ваш темп обучения
              </p>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-6 h-6" />
                <span>Персонализированный подход</span>
              </div>
            </div>
            <div className="flex justify-center">
              <BookOpen className="w-32 h-32 text-white opacity-80 animate-float" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 to-indigo-600/50 backdrop-blur-sm" />
        </section>

        {/* Пройти обучение */}
        <section className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-2xl p-8 md:p-12 shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Пройти обучение</h2>
            <p className="text-lg text-gray-600">
              Начните свой путь в программировании прямо сейчас. Первый урок бесплатно!
            </p>
            <Button size="lg" className="group" onClick={scrollToCategories}>
              Начать обучение
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" />
              <BookOpen className="w-32 h-32 text-primary relative z-10" />
            </div>
          </div>
        </section>

        {/* Топ 10 вопросов */}
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Топ 10 вопросов</h2>
              <p className="text-lg opacity-90">
                Ответы на самые популярные вопросы о курсе и обучении программированию
              </p>
              <Link to="/faq">
                <Button variant="secondary" className="text-white hover:bg-secondary/90">
                  Смотреть все вопросы
                  <ListOrdered className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  className="bg-white/10 p-4 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer animate-fade-up"
                  style={{ animationDelay: `${num * 100}ms` }}
                >
                  <span className="text-2xl font-bold">#{num}</span>
                  <p className="text-sm mt-2 opacity-80">Популярный вопрос</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};