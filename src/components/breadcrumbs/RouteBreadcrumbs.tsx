import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
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
  );
};