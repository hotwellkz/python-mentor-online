import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { MobileCoursesMenu } from "./mobile/MobileCoursesMenu";
import { MobileUserMenu } from "./mobile/MobileUserMenu";

interface MobileMenuProps {
  userEmail: string | null;
  onLogout: () => Promise<void>;
  onLoginClick: () => void;
}

export const MobileMenu = ({ userEmail, onLogout, onLoginClick }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col gap-4">
          <MobileCoursesMenu onLinkClick={handleLinkClick} />
          <Link 
            to="/pricing"
            className="text-foreground hover:text-primary transition-colors"
            onClick={handleLinkClick}
          >
            Тарифы
          </Link>
          <MobileUserMenu 
            userEmail={userEmail}
            onLogout={onLogout}
            onLoginClick={onLoginClick}
            onLinkClick={handleLinkClick}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};