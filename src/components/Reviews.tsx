import { Mail, MessageSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReviewCard } from "./review/ReviewCard";
import { ReviewForm } from "./review/ReviewForm";

export const Reviews = () => {
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

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Отзывы</h2>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Оставить отзыв</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Оставить отзыв</DialogTitle>
                </DialogHeader>
                <ReviewForm type="review" />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Написать директору</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Написать директору</DialogTitle>
                </DialogHeader>
                <ReviewForm type="director" />
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
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};