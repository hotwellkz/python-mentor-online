import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Helmet } from "react-helmet";

interface DevOpsModuleTopicsProps {
  topics: string[];
  moduleIndex: number;
  completedLessons: string[];
}

export const DevOpsModuleTopics = ({ topics, moduleIndex, completedLessons }: DevOpsModuleTopicsProps) => {
  return (
    <ul className="list-disc list-inside space-y-2 text-gray-600">
      {topics.map((topic, topicIndex) => {
        const lessonId = `devops-${moduleIndex + 1}-${topicIndex + 1}`;
        const isCompleted = completedLessons.includes(lessonId);
        const lessonUrl = `/lesson/${lessonId}`;
        const seoTitle = `${topic} | DevOps-инженер PRO с ИИ-учителем`;
        const seoDescription = `Изучите ${topic.toLowerCase()} с персональным ИИ-учителем. Интерактивные уроки DevOps с практическими заданиями и поддержкой 24/7.`;

        return (
          <li
            key={topicIndex}
            className="flex items-start gap-2 group hover:text-primary transition-colors"
          >
            {lessonUrl === window.location.pathname && (
              <Helmet>
                <title>{seoTitle}</title>
                <meta name="description" content={seoDescription} />
                <meta name="keywords" content={`devops урок, ${topic.toLowerCase()}, обучение devops, курсы devops инженер`} />
                <link rel="canonical" href={window.location.origin + lessonUrl} />
                <meta property="og:title" content={seoTitle} />
                <meta property="og:description" content={seoDescription} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={window.location.origin + lessonUrl} />
              </Helmet>
            )}
            <Link
              to={lessonUrl}
              className="flex-grow hover:text-primary transition-colors"
            >
              {topic}
            </Link>
            {isCompleted && (
              <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
            )}
          </li>
        );
      })}
    </ul>
  );
};