import { Gift } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface WelcomeGiftModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WelcomeGiftModal = ({ open, onOpenChange }: WelcomeGiftModalProps) => {
  const navigate = useNavigate();

  const handleStart = () => {
    onOpenChange(false);
    navigate("/program");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center flex flex-col items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Gift className="h-8 w-8 text-primary animate-bounce" />
            </div>
            Добро пожаловать!
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            Вам начислено 100 токенов для начала обучения!
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <Button onClick={handleStart} size="lg" className="animate-pulse">
            Начать обучение
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};