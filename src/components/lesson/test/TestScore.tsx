import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface TestScoreProps {
  score: number;
  totalQuestions: number;
  onReset: () => void;
}

export const TestScore = ({ score, totalQuestions, onReset }: TestScoreProps) => {
  const scoreOutOfFive = Math.round((score / totalQuestions) * 5);
  
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="text-center p-4 sm:p-6"
    >
      <h3 className="text-xl sm:text-2xl font-bold mb-4">
        Ваш результат: {scoreOutOfFive}/5
      </h3>
      <Button onClick={onReset}>Закрыть</Button>
    </motion.div>
  );
};