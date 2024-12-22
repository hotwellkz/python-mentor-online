import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const routes: { [key: string]: { title: string; parent?: string } } = {
  "/program": { title: "Программа курса Python" },
  "/python-course": { title: "Изучайте Python" },
  "/devops": { title: "DevOps-инженер" },
  "/devops-program": { title: "Программа курса DevOps", parent: "/devops" },
  "/business-analyst": { title: "Бизнес-аналитик" },
  "/business-analyst-program": { title: "Программа курса Бизнес-аналитик", parent: "/business-analyst" },
  "/auth": { title: "Авторизация" },
  "/privacy": { title: "Политика конфиденциальности" },
  "/terms": { title: "Публичная оферта" },
  "/pricing": { title: "Тарифы" },
  "/admin": { title: "Панель администратора" },
  "/profile": { title: "Профиль" },
  "/settings": { title: "Настройки аккаунта" },
  "/faq": { title: "Часто задаваемые вопросы" }
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
    let parentTitle = null;
    let parentPath = null;

    if (lessonId?.startsWith('devops-')) {
      courseTitle = "Программа курса DevOps";
      coursePath = "/devops-program";
      parentTitle = "DevOps-инженер";
      parentPath = "/devops";
    } else if (lessonId?.startsWith('ba-')) {
      courseTitle = "Программа курса Бизнес-аналитик";
      coursePath = "/business-analyst-program";
      parentTitle = "Бизнес-аналитик";
      parentPath = "/business-analyst";
    }

    return (
      <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <Link to="/" className="hover:text-primary transition-colors">
              Главная
            </Link>
            <ChevronRight className="h-4 w-4" />
            {parentTitle && parentPath && (
              <>
                <Link to={parentPath} className="hover:text-primary transition-colors">
                  {parentTitle}
                </Link>
                <ChevronRight className="h-4 w-4" />
              </>
            )}
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

  // Build breadcrumb trail
  const buildBreadcrumbTrail = () => {
    const trail = [];
    let currentPath = location.pathname;
    
    while (currentPath) {
      const route = routes[currentPath];
      if (route) {
        trail.unshift({
          path: currentPath,
          title: route.title
        });
        currentPath = route.parent || '';
      } else {
        break;
      }
    }
    
    return trail;
  };

  const breadcrumbTrail = buildBreadcrumbTrail();

  return (
    <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
          <Link to="/" className="hover:text-primary transition-colors">
            Главная
          </Link>
          {breadcrumbTrail.map((item, index) => (
            <div key={item.path} className="flex items-center space-x-2">
              <ChevronRight className="h-4 w-4" />
              {index === breadcrumbTrail.length - 1 ? (
                <span className="font-medium text-gray-900 dark:text-white">
                  {item.title}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-primary transition-colors"
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};