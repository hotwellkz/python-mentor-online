import { motion, AnimatePresence } from "framer-motion";
import { ContentActions } from "./content/ContentActions";
import { PlaybackControls } from "./content/PlaybackControls";
import { cleanText } from "./content/TextFormatter";

interface LessonContentProps {
  loading: boolean;
  generatedText: string;
  userPrompt: string;
  onUserPromptChange: (value: string) => void;
  onShowTest: () => void;
  onFinishLesson: () => void;
  topQuestions: string[];
  onTogglePlayback?: () => void;
  onStopPlayback?: () => void;
  isPlaying?: boolean;
  isPaused?: boolean;
}

export const LessonContent = ({
  loading,
  generatedText,
  userPrompt,
  onUserPromptChange,
  onShowTest,
  onFinishLesson,
  topQuestions,
  onTogglePlayback,
  onStopPlayback,
  isPlaying,
  isPaused,
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-xl prose-headings:font-semibold prose-p:my-4 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:p-4 prose-pre:rounded-lg prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:rounded prose-a:text-primary hover:prose-a:underline prose-li:ml-4 prose-ul:list-disc prose-ul:my-4">
            <div dangerouslySetInnerHTML={{ __html: cleanText(generatedText) }} />
          </div>

          <ContentActions
            generatedText={generatedText}
            onShowTest={onShowTest}
            onFinishLesson={onFinishLesson}
          />
        </motion.div>
      )}

      <PlaybackControls
        onTogglePlayback={onTogglePlayback}
        onStopPlayback={onStopPlayback}
        isPlaying={isPlaying}
        isPaused={isPaused}
      />
    </>
  );
};