import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AuthForm } from "./AuthForm";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [showGiftModal, setShowGiftModal] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <button
          onClick={onClose}
          className="absolute left-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Назад"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <AuthForm 
          isLogin={true}
          setIsLogin={() => {}}
          setShowGiftModal={setShowGiftModal}
          onSuccess={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};