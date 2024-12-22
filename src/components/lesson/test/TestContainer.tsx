import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getDevOpsQuestions } from '@/utils/testQuestions';
import { getBusinessAnalystQuestions } from '@/utils/questions/businessAnalyst';
import { getPythonQuestions } from '@/utils/questions/pythonQuestions';
import { TestScore } from './TestScore';
import { TestQuestion } from './TestQuestion';
import { useToast } from '@/hooks/use-toast';

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
  const [questions, setQuestions] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (!open) return;

    try {
      let loadedQuestions = [];
      const isDevOpsLesson = lessonId?.startsWith('devops-');
      const isBusinessAnalystLesson = lessonId?.startsWith('ba-');

      if (isBusinessAnalystLesson) {
        const [, blockIndex, lessonIndex] = (lessonId || "").split("-").map(Number);
        loadedQuestions = getBusinessAnalystQuestions(blockIndex, lessonIndex);
      } else if (isDevOpsLesson) {
        const [, moduleIndex, topicIndex] = (lessonId || "").split("-").map(Number);
        loadedQuestions = getDevOpsQuestions(moduleIndex, topicIndex);
      } else {
        const [blockIndex, lessonIndex] = (lessonId || "").split("-").map(Number);
        loadedQuestions = getPythonQuestions(blockIndex, lessonIndex);
      }

      if (!loadedQuestions || loadedQuestions.length === 0) {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: "Тестовые вопросы для этого урока не найдены",
        });
        onOpenChange(false);
        return;
      }

      setQuestions(loadedQuestions);
    } catch (error) {
      console.error('Error loading questions:', error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось загрузить тестовые вопросы",
      });
      onOpenChange(false);
    }
  }, [lessonId, open, toast, onOpenChange]);

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

  if (!questions.length) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[500px] p-4 sm:p-6 overflow-y-auto max-h-[90vh]">
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
            correctAnswer={questions[currentQuestion].correctAnswer}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};