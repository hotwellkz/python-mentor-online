import { useState } from "react";
import { Star, Mail, MessageSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const Reviews = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const reviews = [
    {
      id: 1,
      name: "Александр П.",
      rating: 5,
      date: "2024-03-15",
      text: "Отличный курс! Очень понятное объяснение материала.",
    },
    {
      id: 2,
      name: "Мария С.",
      rating: 5,
      date: "2024-03-14",
      text: "ИИ-учитель всегда отвечает на мои вопросы, очень удобно.",
    },
    {
      id: 3,
      name: "Дмитрий К.",
      rating: 4,
      date: "2024-03-13",
      text: "Хороший курс для начинающих программистов.",
    },
    {
      id: 4,
      name: "Елена В.",
      rating: 5,
      date: "2024-03-12",
      text: "Прекрасная подача материала и поддержка.",
    },
  ];

  const handleSubmit = async (type: "review" | "director") => {
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
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось отправить сообщение. Попробуйте позже.",
      });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Отзывы</h2>
          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Оставить отзыв
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Оставить отзыв</DialogTitle>
                </DialogHeader>
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
                    placeholder="Ваш отзыв"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button onClick={() => handleSubmit("review")}>Отправить</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Mail className="w-4 h-4" />
                  Написать директору
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Написать директору</DialogTitle>
                </DialogHeader>
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
                    placeholder="Ваше сообщение"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button onClick={() => handleSubmit("director")}>
                    Отправить
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="relative">
          <div
            className="flex gap-6 animate-scroll"
            style={{
              animation: `scroll ${
                window.innerWidth < 768 ? "10s" : "30s"
              } linear infinite`,
            }}
          >
            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[300px] md:w-[350px] bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{review.text}</p>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">
                    {review.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};