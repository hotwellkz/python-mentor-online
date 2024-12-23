import { useState } from "react";
import { Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PromptEditorProps {
  lessonId: string;
}

export const PromptEditor = ({ lessonId }: PromptEditorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('lesson_prompts')
        .upsert({
          lesson_id: lessonId,
          prompt: prompt,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'lesson_id'
        });

      if (error) throw error;

      toast({
        title: "Успешно",
        description: "Промпт урока обновлен",
      });
      setIsOpen(false);
    } catch (error: any) {
      console.error('Save error:', error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:absolute md:top-4 md:right-4 w-8 h-8 p-0"
        >
          <Lock className="h-4 w-4" />
          <span className="sr-only">Редактировать промпт</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Редактирование промпта</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="Промпт урока"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[200px] w-full"
          />
          <Button onClick={handleSave} className="w-full">
            Сохранить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};