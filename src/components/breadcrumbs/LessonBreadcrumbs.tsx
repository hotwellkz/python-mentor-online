import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

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
  }

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
      <Link to="/" className="hover:text-primary transition-colors">
        Главная
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link to={parentPath} className="hover:text-primary transition-colors">
        {parentTitle}
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
  );
};