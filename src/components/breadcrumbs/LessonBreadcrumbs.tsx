import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface LessonBreadcrumbsProps {
  lessonId: string;
}

export const LessonBreadcrumbs = ({ lessonId }: LessonBreadcrumbsProps) => {
  let courseTitle = "Программа курса Python";
  let coursePath = "/program";
  let parentTitle = "Изучайте Python";
  let parentPath = "/python-course";

  if (lessonId.startsWith('devops-')) {
    courseTitle = "Программа курса DevOps";
    coursePath = "/devops-program";
    parentTitle = "DevOps-инженер";
    parentPath = "/devops";
  } else if (lessonId.startsWith('ba-')) {
    courseTitle = "Программа курса Бизнес-аналитик";
    coursePath = "/business-analyst-program";
    parentTitle = "Бизнес-аналитик";
    parentPath = "/business-analyst";
  } else if (lessonId.startsWith('ds-')) {
    courseTitle = "Программа курса Data Science";
    coursePath = "/data-science-program";
    parentTitle = "Изучайте Data Science";
    parentPath = "/data-science";
  } else if (lessonId.startsWith('pm-')) {
    courseTitle = "Программа курса Продукт-менеджмент";
    coursePath = "/product-management-program";
    parentTitle = "Изучайте Продукт-менеджмент";
    parentPath = "/product-management";
  }

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
      <ChevronRight className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
      <Link 
        to={parentPath} 
        className="hover:text-primary transition-colors line-clamp-1"
      >
        {parentTitle}
      </Link>
      <ChevronRight className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
      <Link 
        to={coursePath} 
        className="hover:text-primary transition-colors line-clamp-1"
      >
        {courseTitle}
      </Link>
      <ChevronRight className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
      <span className="font-medium text-gray-900 dark:text-white line-clamp-1">
        Урок {lessonId}
      </span>
    </div>
  );
};