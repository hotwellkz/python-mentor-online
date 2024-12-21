import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getDevOpsQuestions } from './test/TestQuestions';
import { TestScore } from './test/TestScore';
import { TestQuestion } from './test/TestQuestion';

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
  const { lessonId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const isDevOpsLesson = lessonId?.startsWith('devops-');
  
  let questions: Question[] = [];
  
  if (isDevOpsLesson) {
    const [, moduleIndex, topicIndex] = (lessonId || "").split("-").map(Number);
    questions = getDevOpsQuestions(moduleIndex, topicIndex);
  } else {
    questions = [
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
  }

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