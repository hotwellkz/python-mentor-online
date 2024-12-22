import { motion, AnimatePresence } from "framer-motion";
import { ContentActions } from "./content/ContentActions";
import { PlaybackControls } from "./content/PlaybackControls";
import { formatMessage } from "@/utils/messageFormatter";

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
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#333333]" />
            <p className="mt-4 text-lg text-[#333333] dark:text-gray-200">Готовлю урок...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {generatedText && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div 
              className="lesson-content"
              dangerouslySetInnerHTML={{ __html: formatMessage(generatedText) }}
            />
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