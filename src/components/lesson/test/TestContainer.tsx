import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getDevOpsQuestions } from '@/utils/testQuestions';
import { getPythonQuestions } from '@/utils/testQuestions';
import { TestScore } from './TestScore';
import { TestQuestion } from './TestQuestion';

interface TestContainerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TestContainer = ({ open, onOpenChange }: TestContainerProps) => {
  const { lessonId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const isDevOpsLesson = lessonId?.startsWith('devops-');
  
  let questions = isDevOpsLesson
    ? getDevOpsQuestions(
        Number(lessonId?.split('-')[1] || 0),
        Number(lessonId?.split('-')[2] || 0)
      )
    : getPythonQuestions();

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
          <TestScore
            score={score}
            totalQuestions={questions.length}
            onReset={handleReset}
          />
        ) : (
          <TestQuestion
            questionNumber={currentQuestion}
            totalQuestions={questions.length}
            question={questions[currentQuestion].question}
            options={questions[currentQuestion].options}
            selectedAnswer={selectedAnswer}
            onAnswer={handleAnswer}
            onNext={handleNext}
            isLastQuestion={currentQuestion === questions.length - 1}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};