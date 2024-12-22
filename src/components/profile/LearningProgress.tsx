import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";

interface LearningProgressProps {
  completedLessons: string[];
}

export const LearningProgress = ({ completedLessons }: LearningProgressProps) => {
  const calculateProgress = () => {
    return Math.round((completedLessons.length / 40) * 100);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Прогресс обучения</h2>
      <div className="space-y-6">
        <div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Общий прогресс</span>
            <span>{calculateProgress()}%</span>
          </div>
          <Progress value={calculateProgress()} className="h-2" />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Пройденные уроки</h3>
          {completedLessons.length > 0 ? (
            <div className="grid gap-3">
              {completedLessons.map((lessonId) => (
                <div
                  key={lessonId}
                  className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Урок {lessonId}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              Вы еще не прошли ни одного урока
            </p>
          )}
        </div>
      </div>
    </div>
  );
};