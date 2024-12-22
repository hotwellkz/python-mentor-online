import { Helmet } from "react-helmet";

interface LessonSEOProps {
  lessonTitle: string;
  topQuestions: string[];
  isDevOpsLesson: boolean;
}

export const LessonSEO = ({ lessonTitle, topQuestions, isDevOpsLesson }: LessonSEOProps) => {
  const courseType = isDevOpsLesson ? 'DevOps' : 'Python';
  
  return (
    <Helmet>
      <title>{lessonTitle} | {isDevOpsLesson ? 'DevOps-инженер PRO' : 'Python'} с ИИ-учителем</title>
      <meta
        name="description"
        content={`${lessonTitle}. ${topQuestions.join(". ")}. Интерактивное обучение ${courseType} с ИИ-учителем.`}
      />
      <meta 
        name="keywords" 
        content={`${isDevOpsLesson ? 'devops' : 'python'} урок, ${topQuestions.join(", ")}, обучение ${isDevOpsLesson ? 'devops' : 'python'}`} 
      />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={window.location.href} />
      <meta property="og:title" content={`${lessonTitle} | ${isDevOpsLesson ? 'DevOps-инженер PRO' : 'Python'} с ИИ-учителем`} />
      <meta property="og:description" content={`${lessonTitle}. ${topQuestions.join(". ")}. Интерактивное обучение ${courseType} с ИИ-учителем.`} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={window.location.href} />
    </Helmet>
  );
};