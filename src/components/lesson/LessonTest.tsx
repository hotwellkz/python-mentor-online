import { TestContainer } from './test/TestContainer';

interface LessonTestProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LessonTest = ({ open, onOpenChange }: LessonTestProps) => {
  return <TestContainer open={open} onOpenChange={onOpenChange} />;
};