import { useLocation } from "react-router-dom";
import { LessonBreadcrumbs } from "./breadcrumbs/LessonBreadcrumbs";
import { RouteBreadcrumbs } from "./breadcrumbs/RouteBreadcrumbs";

export const Breadcrumbs = () => {
  const location = useLocation();
  
  // Don't show breadcrumbs on home page
  if (location.pathname === "/") return null;

  // Handle lesson pages
  if (location.pathname.startsWith('/lesson/')) {
    const lessonId = location.pathname.split('/').pop();
    return (
      <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-2">
          <LessonBreadcrumbs lessonId={lessonId || ''} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-2">
        <RouteBreadcrumbs currentPath={location.pathname} />
      </div>
    </div>
  );
};