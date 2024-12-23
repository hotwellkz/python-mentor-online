import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AuthForm } from "./AuthForm";
import { useState } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <AuthForm 
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          setShowGiftModal={setShowGiftModal}
          onSuccess={onClose}
          onBack={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};