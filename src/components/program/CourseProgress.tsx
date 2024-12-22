import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

export const CourseProgress = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-12"
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Прогресс обучения
      </h2>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Общий прогресс</span>
            <span>0%</span>
          </div>
          <Progress value={0} className="h-2" />
        </div>
      </div>
    </motion.div>
  );
};