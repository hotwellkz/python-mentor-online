import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const routes: { [key: string]: string } = {
  "/program": "Программа курса",
  "/privacy": "Политика конфиденциальности",
  "/terms": "Публичная оферта"
};

export const Breadcrumbs = () => {
  const location = useLocation();
  
  if (location.pathname === "/") return null;

  return (
    <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
          <Link to="/" className="hover:text-primary transition-colors">
            Главная
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-gray-900 dark:text-white">
            {routes[location.pathname]}
          </span>
        </div>
      </div>
    </div>
  );
};