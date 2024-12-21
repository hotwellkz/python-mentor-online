import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";

interface LessonContentProps {
  loading: boolean;
  generatedText: string;
  userPrompt: string;
  onUserPromptChange: (value: string) => void;
  onShowTest: () => void;
  onFinishLesson: () => void;
  topQuestions: string[];
  onTogglePlayback?: () => void;
  isPlaying?: boolean;
}

const cleanText = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
    .replace(/\*(.*?)\*/g, '$1') // Italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links
    .replace(/#{1,6}\s/g, '') // Headers
    .replace(/`(.*?)`/g, '$1') // Code
    .replace(/<[^>]*>/g, '') // HTML tags
    .replace(/\n\s*[-*+]\s/g, '\n') // Lists
    .replace(/\n\s*\d+\.\s/g, '\n') // Numbered lists
    .replace(/\n{2,}/g, '\n') // Multiple newlines
    .trim();
};

export const LessonContent = ({
  loading,
  generatedText,
  onShowTest,
  onFinishLesson,
  onTogglePlayback,
  isPlaying,
}: LessonContentProps) => {
  const cleanedText = cleanText(generatedText);

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

      {cleanedText && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: cleanedText }} />
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4">
            {onTogglePlayback && (
              <Button 
                onClick={onTogglePlayback}
                variant="outline"
                className="flex items-center gap-2"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isPlaying ? "Пауза" : "Продолжить"}
              </Button>
            )}
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
        </motion.div>
      )}
    </>
  );
};