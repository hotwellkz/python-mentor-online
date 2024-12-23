import { Code, Database, ChartBar, Users, Globe, DollarSign, Paintbrush, Brain, Shield, Calculator, Briefcase, Monitor, TestTube, UserCircle, BarChart2, Palette, Building2, Bot } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Python-разработчик",
    duration: "10 мес",
    icon: Code,
    bg: "bg-[#E5DEFF]",
    link: "/python-course",
    isHot: true,
  },
  {
    title: "Data Scientist",
    duration: "12 мес",
    icon: Brain,
    bg: "bg-[#FDE1D3]",
    link: "/data-science",
    isHot: true,
  },
  {
    title: "Бизнес-аналитик",
    duration: "8 мес",
    icon: ChartBar,
    bg: "bg-[#D3E4FD]",
    link: "/business-analyst",
    isHot: true,
  },
  {
    title: "DevOps-инженер PRO",
    duration: "12 мес",
    icon: Database,
    bg: "bg-[#FFDEE2]",
    link: "/devops",
    isHot: true,
  },
  {
    title: "Продакт-менеджер",
    duration: "6 мес",
    icon: Users,
    bg: "bg-[#F2FCE2]",
    link: "/product-management",
    isHot: true,
  },
];

export const Categories = () => {
  return (
    <div id="categories-section" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Выберите свою профессию
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.link}
              className={`${category.bg} rounded-xl p-6 transition-transform hover:scale-105 relative group min-h-[140px] flex flex-col justify-between`}
            >
              {category.isHot && (
                <span className="absolute bottom-4 right-4 bg-[#F97316]/80 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                  Хит продаж
                </span>
              )}
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1 pr-4">
                  <h3 className="font-semibold text-gray-900">{category.title}</h3>
                  <p className="text-sm text-gray-600">{category.duration}</p>
                </div>
                <category.icon className="w-6 h-6 text-gray-700 shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
