import { Button } from "@/components/ui/button";
import { MessageCircle, Send, Copy, FileDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2pdf from 'html2pdf.js';
import { cleanText } from "./TextFormatter";

interface ContentActionsProps {
  generatedText: string;
  onShowTest: () => void;
  onFinishLesson: () => void;
}

export const ContentActions = ({
  generatedText,
  onShowTest,
  onFinishLesson,
}: ContentActionsProps) => {
  const { toast } = useToast();

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(generatedText);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const shareToTelegram = () => {
    const text = encodeURIComponent(generatedText);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
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
  );
};