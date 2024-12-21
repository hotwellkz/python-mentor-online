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
  // Заменяем маркеры заголовков на HTML-теги
  let cleanedText = text
    .replace(/#{1,6}\s(.*?)(?:\n|$)/g, (_, title) => `<h3 class="text-xl font-semibold my-4">${title}</h3>`)
    // Заменяем жирный текст
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Заменяем курсив
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Заменяем блоки кода
    .replace(/```(.*?)```/gs, (_, code) => `<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto"><code>${code}</code></pre>`)
    // Заменяем инлайн-код
    .replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">$1</code>')
    // Заменяем ссылки
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
    // Заменяем маркированные списки
    .replace(/^\s*[-*+]\s+(.*?)(?:\n|$)/gm, '<li class="ml-4">$1</li>')
    // Заменяем нумерованные списки
    .replace(/^\s*\d+\.\s+(.*?)(?:\n|$)/gm, '<li class="ml-4">$1</li>')
    // Оборачиваем последовательные li в ul или ol
    .replace(/(<li.*?>.*?<\/li>)\n(<li.*?>.*?<\/li>)/gs, '<ul class="list-disc my-4">$1$2</ul>');

  // Добавляем параграфы для текста, который не обработан другими правилами
  cleanedText = cleanedText
    .split('\n\n')
    .map(paragraph => {
      if (!paragraph.trim()) return '';
      if (paragraph.startsWith('<')) return paragraph;
      return `<p class="my-4">${paragraph}</p>`;
    })
    .join('\n');

  return cleanedText;
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
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: cleanText(generatedText) }} />
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