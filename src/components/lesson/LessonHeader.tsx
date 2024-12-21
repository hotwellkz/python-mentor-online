import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Play, Pause, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LessonHeaderProps {
  loading: boolean;
  generatedText: string;
  isPlaying: boolean;
  isPremiumPlaying: boolean;
  onStartLesson: () => Promise<void>;
  onPlayText: (text: string, isPremium?: boolean) => void;
  onShare: () => Promise<void>;
}

export const LessonHeader = ({
  loading,
  generatedText,
  isPlaying,
  isPremiumPlaying,
  onStartLesson,
  onPlayText,
  onShare,
}: LessonHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        Урок 1: Переменные и типы данных
      </h1>
      <div className="flex flex-wrap gap-4">
        <Button
          className="start-lesson-button"
          onClick={onStartLesson}
          disabled={loading}
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Sparkles className="h-5 w-5 mr-2" />
            </motion.div>
          ) : (
            "Начать урок"
          )}
        </Button>
        {generatedText && (
          <>
            <Button
              variant="outline"
              onClick={() => onPlayText(generatedText)}
              disabled={isPlaying || isPremiumPlaying}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 mr-2" />
              ) : (
                <Play className="h-5 w-5 mr-2" />
              )}
              Озвучить бесплатно
            </Button>
            <Button
              variant="secondary"
              onClick={() => onPlayText(generatedText, true)}
              disabled={isPlaying || isPremiumPlaying}
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Озвучить красивым голосом
            </Button>
            <Button variant="ghost" onClick={onShare}>
              <Share2 className="h-5 w-5 mr-2" />
              Поделиться
            </Button>
          </>
        )}
      </div>
    </motion.div>
  );
};