import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface LessonTestProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LessonTest = ({ open, onOpenChange }: LessonTestProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const questions: Question[] = [
    {
      question: "Какой редактор кода рекомендуется для начинающих Python разработчиков?",
      options: [
        "VS Code",
        "Блокнот Windows",
        "Notepad++",
        "Word"
      ],
      correctAnswer: 0
    },
    {
      question: "Какое расширение необходимо установить в VS Code для работы с Python?",
      options: [
        "JavaScript",
        "Python",
        "Java",
        "C++"
      ],
      correctAnswer: 1
    },
    {
      question: "Какая среда разработки является специализированной для Python?",
      options: [
        "VS Code",
        "Sublime Text",
        "PyCharm",
        "Atom"
      ],
      correctAnswer: 2
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[500px] p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>
            {showScore ? "Результаты теста" : "Тест по теме урока"}
          </DialogTitle>
        </DialogHeader>
        
        {showScore ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center p-4 sm:p-6"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4">
              Ваш результат: {Math.round((score / questions.length) * 10)}/10
            </h3>
            <Button onClick={handleReset}>Закрыть</Button>
          </motion.div>
        ) : (
          <div className="p-2 sm:p-4">
            <h3 className="text-base sm:text-lg font-semibold mb-4">
              Вопрос {currentQuestion + 1} из {questions.length}
            </h3>
            <p className="mb-4 text-sm sm:text-base">{questions[currentQuestion].question}</p>
            <div className="space-y-2">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className="w-full justify-start text-sm sm:text-base py-2 px-3 sm:px-4"
                  onClick={() => handleAnswer(index)}
                >
                  {option}
                </Button>
              ))}
            </div>
            <div className="mt-4 sm:mt-6 flex justify-end">
              <Button
                onClick={handleNext}
                disabled={selectedAnswer === null}
              >
                {currentQuestion === questions.length - 1 ? "Завершить" : "Далее"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};