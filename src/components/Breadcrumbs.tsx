import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const routes: { [key: string]: string } = {
  "/program": "Программа курса Python",
  "/python-course": "Изучайте Python",
  "/devops": "Программа курса DevOps",
  "/devops-program": "Программа курса DevOps",
  "/business-analyst": "Программа курса Бизнес-аналитик",
  "/business-analyst-program": "Программа курса Бизнес-аналитик",
  "/auth": "Авторизация",
  "/privacy": "Политика конфиденциальности",
  "/terms": "Публичная оферта",
  "/pricing": "Тарифы",
  "/admin": "Панель администратора",
  "/profile": "Профиль",
  "/settings": "Настройки аккаунта",
  "/faq": "Часто задаваемые вопросы"
};

export const Breadcrumbs = () => {
  const location = useLocation();
  
  // Don't show breadcrumbs on home page
  if (location.pathname === "/") return null;

  // Handle lesson pages
  if (location.pathname.startsWith('/lesson/')) {
    const lessonId = location.pathname.split('/').pop();
    let courseTitle = "Программа курса Python";
    let coursePath = "/program";

    if (lessonId?.startsWith('devops-')) {
      courseTitle = "Программа курса DevOps";
      coursePath = "/devops-program";
    } else if (lessonId?.startsWith('ba-')) {
      courseTitle = "Программа курса Бизнес-аналитик";
      coursePath = "/business-analyst-program";
    }

    return (
      <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <Link to="/" className="hover:text-primary transition-colors">
              Главная
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link to={coursePath} className="hover:text-primary transition-colors">
              {courseTitle}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-gray-900 dark:text-white">
              Урок {lessonId}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
          <Link to="/" className="hover:text-primary transition-colors">
            Главная
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-gray-900 dark:text-white">
            {routes[location.pathname] || "404"}
          </span>
        </div>
      </div>
    </div>
  );
};