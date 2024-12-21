import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Pause, Play, Share2, MessageCircle, Send, Copy, FileDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2pdf from 'html2pdf.js';

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
  const { toast } = useToast();
  const cleanedText = cleanText(generatedText);

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(cleanedText);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const shareToTelegram = () => {
    const text = encodeURIComponent(cleanedText);
    window.open(`https://t.me/share/url?url=${window.location.href}&text=${text}`, '_blank');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(cleanedText);
      toast({
        title: "Успешно скопировано",
        description: "Текст урока скопирован в буфер обмена",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось скопировать текст",
      });
    }
  };

  const downloadPDF = () => {
    const element = document.createElement('div');
    element.innerHTML = cleanedText;
    
    const opt = {
      margin: 1,
      filename: 'lesson.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().catch(error => {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось скачать PDF",
      });
    });
  };

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

          <div className="flex flex-wrap gap-4">
            <div className="flex gap-2">
              <Button variant="outline" onClick={shareToWhatsApp}>
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp
              </Button>
              <Button variant="outline" onClick={shareToTelegram}>
                <Send className="h-5 w-5 mr-2" />
                Telegram
              </Button>
              <Button variant="outline" onClick={copyToClipboard}>
                <Copy className="h-5 w-5 mr-2" />
                Копировать
              </Button>
              <Button variant="outline" onClick={downloadPDF}>
                <FileDown className="h-5 w-5 mr-2" />
                Скачать PDF
              </Button>
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-4 w-full">
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
          </div>
        </motion.div>
      )}
    </>
  );
};