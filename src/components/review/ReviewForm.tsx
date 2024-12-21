import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ReviewFormProps {
  type: "review" | "director";
  onClose?: () => void;
}

export const ReviewForm = ({ type, onClose }: ReviewFormProps) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const { error } = await supabase.functions.invoke("send-email", {
        body: {
          to: ["a777mmm@mail.ru"],
          subject: type === "review" ? "Новый отзыв" : "Сообщение директору",
          html: `
            <h2>${type === "review" ? "Новый отзыв" : "Сообщение директору"}</h2>
            <p><strong>Имя:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Сообщение:</strong> ${message}</p>
          `,
        },
      });

      if (error) throw error;

      toast({
        title: "Успешно отправлено",
        description: "Спасибо за ваше сообщение!",
      });

      setName("");
      setEmail("");
      setMessage("");
      onClose?.();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось отправить сообщение. Попробуйте позже.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Ваше имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="email"
        placeholder="Ваш email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Textarea
        placeholder={type === "review" ? "Ваш отзыв" : "Ваше сообщение"}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button onClick={handleSubmit}>Отправить</Button>
    </div>
  );
};