import { Star } from "lucide-react";

interface ReviewCardProps {
  name: string;
  rating: number;
  date: string;
  text: string;
}

export const ReviewCard = ({ name, rating, date, text }: ReviewCardProps) => {
  return (
    <div className="flex-shrink-0 w-[300px] md:w-[350px] bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-gray-600 mb-4">{text}</p>
      <div className="flex justify-between items-center">
        <span className="font-semibold text-gray-900">{name}</span>
        <span className="text-sm text-gray-500">
          {new Date(date).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};