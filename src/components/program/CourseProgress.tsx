import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const CourseProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchProgress = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: completedLessons } = await supabase
        .from("completed_lessons")
        .select("*")
        .eq("user_id", user.id);

      if (completedLessons) {
        // Всего 40 уроков в курсе
        const totalProgress = (completedLessons.length / 40) * 100;
        setProgress(Math.round(totalProgress));
      }
    };

    fetchProgress();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Ваш прогресс
      </h2>
      <div className="space-y-2">
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Пройдено {progress}% курса
        </p>
      </div>
    </motion.div>
  );
};