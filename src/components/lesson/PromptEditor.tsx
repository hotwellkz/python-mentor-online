import { useState } from "react";
import { Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PromptEditorProps {
  lessonId: string;
}

export const PromptEditor = ({ lessonId }: PromptEditorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [prompt, setPrompt] = useState("");
  const { toast } = useToast();

  const handleAuth = async () => {
    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("password", password)
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setIsAuthenticated(true);
        // Здесь нужно загрузить текущий промпт
        const response = await supabase.functions.invoke("get-lesson-prompt", {
          body: { lessonId },
        });
        if (response.data?.prompt) {
          setPrompt(response.data.prompt);
        }
      } else {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: "Неверный пароль",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
      });
    }
  };

  const handleSave = async () => {
    try {
      const response = await supabase.functions.invoke("update-lesson-prompt", {
        body: { lessonId, prompt },
      });

      if (response.error) throw response.error;

      toast({
        title: "Успешно",
        description: "Промпт урока обновлен",
      });
      setIsOpen(false);
      setIsAuthenticated(false);
      setPassword("");
    } catch (error: any) {
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
          <DialogTitle>
            {isAuthenticated ? "Редактирование промпта" : "Введите пароль"}
          </DialogTitle>
        </DialogHeader>
        {!isAuthenticated ? (
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
            <Button onClick={handleAuth} className="w-full">
              Войти
            </Button>
          </div>
        ) : (
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
        )}
      </DialogContent>
    </Dialog>
  );
};