import { Button } from "@/components/ui/button";

interface TopQuestionsProps {
  questions: string[];
  onAskQuestion: (question: string) => void;
  loading: boolean;
}

export const TopQuestions = ({ questions, onAskQuestion, loading }: TopQuestionsProps) => {
  return (
    <div className="grid grid-cols-1 gap-2">
      {questions.map((q, i) => (
        <Button
          key={i}
          variant="outline"
          className="whitespace-normal h-auto text-left py-2"
          onClick={() => onAskQuestion(q)}
          disabled={loading}
        >
          {q}
        </Button>
      ))}
    </div>
  );
};