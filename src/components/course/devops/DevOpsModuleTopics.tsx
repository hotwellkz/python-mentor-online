import { Link } from "react-router-dom";
import { Check } from "lucide-react";

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

        return (
          <li
            key={topicIndex}
            className="flex items-start gap-2 group hover:text-primary transition-colors"
          >
            <Link
              to={`/lesson/${lessonId}`}
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