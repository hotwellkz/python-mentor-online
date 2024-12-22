import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { routes } from "@/config/routes";

interface BreadcrumbItem {
  path: string;
  title: string;
}

interface RouteBreadcrumbsProps {
  currentPath: string;
}

export const RouteBreadcrumbs = ({ currentPath }: RouteBreadcrumbsProps) => {
  const buildBreadcrumbTrail = (): BreadcrumbItem[] => {
    const trail = [];
    let path = currentPath;
    
    while (path) {
      const route = routes[path];
      if (route) {
        trail.unshift({
          path,
          title: route.title
        });
        path = route.parent || '';
      } else {
        break;
      }
    }
    
    return trail;
  };

  const breadcrumbTrail = buildBreadcrumbTrail();

  return (
    <div className="flex items-center flex-wrap gap-1 md:gap-2 text-xs md:text-sm text-gray-600 dark:text-gray-300">
      <Link 
        to="/" 
        className="hover:text-primary transition-colors inline-flex items-center"
        aria-label="Главная"
      >
        <Home className="h-4 w-4 md:h-5 md:w-5" />
        <span className="hidden md:inline ml-1">Главная</span>
      </Link>
      {breadcrumbTrail.map((item, index) => (
        <div key={item.path} className="flex items-center">
          <ChevronRight className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
          {index === breadcrumbTrail.length - 1 ? (
            <span className="font-medium text-gray-900 dark:text-white line-clamp-1">
              {item.title}
            </span>
          ) : (
            <Link
              to={item.path}
              className="hover:text-primary transition-colors line-clamp-1"
            >
              {item.title}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};