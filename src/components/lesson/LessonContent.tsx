import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface LessonContentProps {
  loading: boolean;
  generatedText: string;
  userPrompt: string;
  onUserPromptChange: (value: string) => void;
  onShowTest: () => void;
  onFinishLesson: () => void;
  topQuestions: string[];
}

export const LessonContent = ({
  loading,
  generatedText,
  onShowTest,
  onFinishLesson,
}: LessonContentProps) => {
  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8"
          >
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            <p className="mt-4 text-lg">Готовлю урок...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {generatedText && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: generatedText }}
          />

          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <Button onClick={onShowTest}>
                Пройти тест
              </Button>
              <Button
                variant="destructive"
                onClick={onFinishLesson}
              >
                Завершить урок
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};