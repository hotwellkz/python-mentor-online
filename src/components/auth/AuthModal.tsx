import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AuthForm } from "./AuthForm";
import { useState } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [showGiftModal, setShowGiftModal] = useState(false);

  const handleClose = () => {
    onClose();
    // Add a small delay before refreshing to ensure the modal is fully closed
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <AuthForm 
          isLogin={true}
          setIsLogin={() => {}}
          setShowGiftModal={setShowGiftModal}
          onSuccess={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
};