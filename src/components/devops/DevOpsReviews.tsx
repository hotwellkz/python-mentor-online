import { Star, MessageSquare, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReviewForm } from "../review/ReviewForm";
import { motion } from "framer-motion";

export const DevOpsReviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Михаил К.",
      rating: 5,
      date: "2024-03-15",
      text: "Отличный курс по DevOps! Очень структурированная подача материала.",
    },
    {
      id: 2,
      name: "Анна С.",
      rating: 5,
      date: "2024-03-14",
      text: "ИИ-учитель помогает разобраться в сложных концепциях DevOps.",
    },
    {
      id: 3,
      name: "Павел Д.",
      rating: 4,
      date: "2024-03-13",
      text: "Практические задания действительно помогают освоить инструменты.",
    },
    {
      id: 4,
      name: "Елена М.",
      rating: 5,
      date: "2024-03-12",
      text: "Отличная поддержка и обратная связь во время обучения.",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-[#1A1F2C] to-[#403E43]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Отзывы</h2>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto gap-2 bg-[#6E59A5] text-white hover:bg-[#8B5CF6] border-none"
                >
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
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto gap-2 bg-[#403E43] text-white hover:bg-[#4A4852] border-none"
                >
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

        <div className="relative overflow-hidden">
          <div className="flex gap-6 animate-scroll" style={{
            animation: `scroll ${window.innerWidth < 768 ? "10s" : "30s"} linear infinite`
          }}>
            {[...reviews, ...reviews].map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-[300px] md:w-[350px] bg-[#403E43]/30 backdrop-blur-sm p-6 rounded-xl"
              >
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#D6BCFA] fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">{review.text}</p>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-white">{review.name}</span>
                  <span className="text-sm text-gray-400">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};