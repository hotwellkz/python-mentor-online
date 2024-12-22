import { Helmet } from "react-helmet";

interface LessonSEOProps {
  lessonTitle: string;
  topQuestions: string[];
  isDevOpsLesson: boolean;
  isDataScienceLesson?: boolean;
  isProductManagementLesson?: boolean;
}

export const LessonSEO = ({ 
  lessonTitle, 
  topQuestions, 
  isDevOpsLesson,
  isDataScienceLesson,
  isProductManagementLesson
}: LessonSEOProps) => {
  const courseType = isDevOpsLesson 
    ? 'DevOps' 
    : isDataScienceLesson
    ? 'Data Science'
    : isProductManagementLesson
    ? 'Продукт-менеджмент'
    : 'Python';
  
  return (
    <Helmet>
      <title>{lessonTitle} | {courseType} с ИИ-учителем</title>
      <meta
        name="description"
        content={`${lessonTitle}. ${topQuestions.join(". ")}. Интерактивное обучение ${courseType} с ИИ-учителем.`}
      />
      <meta 
        name="keywords" 
        content={`${courseType.toLowerCase()} урок, ${topQuestions.join(", ")}, обучение ${courseType.toLowerCase()}`} 
      />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={window.location.href} />
      <meta property="og:title" content={`${lessonTitle} | ${courseType} с ИИ-учителем`} />
      <meta property="og:description" content={`${lessonTitle}. ${topQuestions.join(". ")}. Интерактивное обучение ${courseType} с ИИ-учителем.`} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={window.location.href} />
    </Helmet>
  );
};