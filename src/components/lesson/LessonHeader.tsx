import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Play, Pause, Share2, MessageCircle, Send, Copy, FileDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect } from "react";

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
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const controls = useAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      controls.start({
        scale: [1, 1.1, 1],
        transition: { duration: 1 }
      });
    }, 15000);

    return () => clearInterval(interval);
  }, [controls]);

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(generatedText);
    const url = `https://wa.me/?text=${text}`;
    window.open(url, '_blank');
  };

  const shareToTelegram = () => {
    const text = encodeURIComponent(generatedText);
    const url = `https://t.me/share/url?url=${window.location.href}&text=${text}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 space-y-6"
    >
      <div className="flex flex-wrap gap-4">
        <motion.div
          animate={controls}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
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
        </motion.div>
        
        {generatedText && (
          <div className="flex flex-wrap gap-4 w-full md:w-auto">
            <Button
              variant="outline"
              onClick={() => onPlayText(generatedText)}
              disabled={isPlaying || isPremiumPlaying}
              className="flex-1 md:flex-none"
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
              className="flex-1 md:flex-none"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Озвучить красивым голосом (45 токенов)
            </Button>
            
            <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" onClick={shareToWhatsApp}>
                <MessageCircle className="h-5 w-5" />
                <span className="hidden sm:inline ml-2">WhatsApp</span>
              </Button>
              <Button variant="outline" onClick={shareToTelegram}>
                <Send className="h-5 w-5" />
                <span className="hidden sm:inline ml-2">Telegram</span>
              </Button>
              <Button variant="ghost" onClick={onShare}>
                {isMobile ? (
                  <Copy className="h-5 w-5" />
                ) : (
                  <>
                    <Share2 className="h-5 w-5 mr-2" />
                    Копировать ссылку
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};