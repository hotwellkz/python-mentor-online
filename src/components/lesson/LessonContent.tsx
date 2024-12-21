import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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
  userPrompt,
  onUserPromptChange,
  onShowTest,
  onFinishLesson,
  topQuestions,
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
            <h3 className="text-xl font-semibold">Популярные вопросы</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-left"
                  onClick={() => onUserPromptChange(question)}
                >
                  {question}
                </Button>
              ))}
            </div>

            <div className="mt-8">
              <Textarea
                value={userPrompt}
                onChange={(e) => onUserPromptChange(e.target.value)}
                placeholder="Задайте свой вопрос..."
                className="min-h-[100px]"
              />
            </div>

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