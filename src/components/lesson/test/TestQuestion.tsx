import { Button } from "@/components/ui/button";

interface TestQuestionProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  options: string[];
  selectedAnswer: number | null;
  onAnswer: (index: number) => void;
  onNext: () => void;
  isLastQuestion: boolean;
  correctAnswer: number;
}

export const TestQuestion = ({
  questionNumber,
  totalQuestions,
  question,
  options,
  selectedAnswer,
  onAnswer,
  onNext,
  isLastQuestion,
  correctAnswer,
}: TestQuestionProps) => {
  const getButtonVariant = (index: number) => {
    if (selectedAnswer === null) return "outline";
    if (index === correctAnswer) return "success";
    if (index === selectedAnswer) return "destructive";
    return "outline";
  };

  const getButtonStyle = (index: number) => {
    if (selectedAnswer === null) return "";
    if (index === correctAnswer) return "bg-green-500 hover:bg-green-600 text-white border-green-500";
    if (index === selectedAnswer && index !== correctAnswer) return "bg-red-500 hover:bg-red-600 text-white border-red-500";
    return "";
  };

  return (
    <div className="p-2 sm:p-4">
      <h3 className="text-base sm:text-lg font-semibold mb-4">
        Вопрос {questionNumber + 1} из {totalQuestions}
      </h3>
      <p className="mb-4 text-sm sm:text-base break-words whitespace-pre-wrap">{question}</p>
      <div className="space-y-2">
        {options.map((option, index) => (
          <Button
            key={index}
            variant={getButtonVariant(index)}
            className={`w-full justify-start text-sm sm:text-base py-2 px-3 sm:px-4 whitespace-normal h-auto break-words ${getButtonStyle(index)}`}
            onClick={() => onAnswer(index)}
            disabled={selectedAnswer !== null}
          >
            {option}
          </Button>
        ))}
      </div>
      <div className="mt-4 sm:mt-6 flex justify-end">
        <Button
          onClick={onNext}
          disabled={selectedAnswer === null}
        >
          {isLastQuestion ? "Завершить" : "Далее"}
        </Button>
      </div>
    </div>
  );
};