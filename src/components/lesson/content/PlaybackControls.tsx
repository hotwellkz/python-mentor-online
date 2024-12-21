import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Pause, Play, StopCircle } from "lucide-react";

interface PlaybackControlsProps {
  onTogglePlayback?: () => void;
  onStopPlayback?: () => void;
  isPlaying?: boolean;
  isPaused?: boolean;
}

export const PlaybackControls = ({
  onTogglePlayback,
  onStopPlayback,
  isPlaying,
  isPaused,
}: PlaybackControlsProps) => {
  if (!onTogglePlayback && !onStopPlayback) return null;

  const getButtonLabel = () => {
    if (isPlaying && !isPaused) return "Пауза";
    if (isPaused) return "Продолжить";
    return "Воспроизвести";
  };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-50"
    >
      {onTogglePlayback && (
        <Button
          onClick={onTogglePlayback}
          variant="secondary"
          size="lg"
          className="rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200"
          title={getButtonLabel()}
        >
          {isPlaying && !isPaused ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>
      )}
      {onStopPlayback && isPlaying && (
        <Button
          onClick={onStopPlayback}
          variant="secondary"
          size="lg"
          className="rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200"
          title="Остановить"
        >
          <StopCircle className="h-6 w-6" />
        </Button>
      )}
    </motion.div>
  );
};