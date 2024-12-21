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
}: TestQuestionProps) => {
  return (
    <div className="p-2 sm:p-4">
      <h3 className="text-base sm:text-lg font-semibold mb-4">
        Вопрос {questionNumber + 1} из {totalQuestions}
      </h3>
      <p className="mb-4 text-sm sm:text-base">{question}</p>
      <div className="space-y-2">
        {options.map((option, index) => (
          <Button
            key={index}
            variant={selectedAnswer === index ? "default" : "outline"}
            className="w-full justify-start text-sm sm:text-base py-2 px-3 sm:px-4"
            onClick={() => onAnswer(index)}
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