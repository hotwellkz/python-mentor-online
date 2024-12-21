import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Pause, Play, Share2, MessageCircle, Send, Copy, FileDown, StopCircle } from "lucide-react";
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
  onStopPlayback?: () => void;
  isPlaying?: boolean;
}

const cleanText = (text: string) => {
  return text
    .replace(/#{1,6}\s(.*?)(?:\n|$)/g, (_, title) => `<h3 class="text-xl font-semibold my-4">${title}</h3>`)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/```(.*?)```/gs, (_, code) => `<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto"><code>${code}</code></pre>`)
    .replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">$1</code>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
    .replace(/^\s*[-*+]\s+(.*?)(?:\n|$)/gm, '<li class="ml-4">$1</li>')
    .replace(/^\s*\d+\.\s+(.*?)(?:\n|$)/gm, '<li class="ml-4">$1</li>')
    .replace(/(<li.*?>.*?<\/li>)\n(<li.*?>.*?<\/li>)/gs, '<ul class="list-disc my-4">$1$2</ul>')
    .split('\n\n')
    .map(paragraph => {
      if (!paragraph.trim()) return '';
      if (paragraph.startsWith('<')) return paragraph;
      return `<p class="my-4">${paragraph}</p>`;
    })
    .join('\n')
    .trim();
};

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
}: LessonContentProps) => {
  const { toast } = useToast();

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(generatedText);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const shareToTelegram = () => {
    const text = encodeURIComponent(generatedText);
    window.open(`https://t.me/share/url?url=${window.location.href}&text=${text}`, '_blank');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedText);
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
    element.innerHTML = cleanText(generatedText);
    
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

      {generatedText && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-xl prose-headings:font-semibold prose-p:my-4 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:p-4 prose-pre:rounded-lg prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:rounded prose-a:text-primary hover:prose-a:underline prose-li:ml-4 prose-ul:list-disc prose-ul:my-4">
            <div dangerouslySetInnerHTML={{ __html: cleanText(generatedText) }} />
          </div>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Button variant="outline" onClick={shareToWhatsApp} className="w-full">
                <MessageCircle className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">WhatsApp</span>
              </Button>
              <Button variant="outline" onClick={shareToTelegram} className="w-full">
                <Send className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">Telegram</span>
              </Button>
              <Button variant="outline" onClick={copyToClipboard} className="w-full">
                <Copy className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">Копировать</span>
              </Button>
              <Button variant="outline" onClick={downloadPDF} className="w-full">
                <FileDown className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">Скачать PDF</span>
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <Button 
                onClick={onShowTest}
                className="w-full sm:w-auto"
              >
                Пройти тест
              </Button>
              <Button
                variant="destructive"
                onClick={onFinishLesson}
                className="w-full sm:w-auto"
              >
                Завершить урок
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Floating playback controls */}
      {generatedText && (onTogglePlayback || onStopPlayback) && (
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
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>
          )}
          {onStopPlayback && (
            <Button
              onClick={onStopPlayback}
              variant="secondary"
              size="lg"
              className="rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <StopCircle className="h-6 w-6" />
            </Button>
          )}
        </motion.div>
      )}
    </>
  );
};