import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings2, Shield, User } from "lucide-react";
import { TokenDisplay } from "@/components/TokenDisplay";

interface MobileUserMenuProps {
  userEmail: string | null;
  onLogout: () => Promise<void>;
  onLoginClick: () => void;
  onLinkClick: () => void;
}

export const MobileUserMenu = ({ userEmail, onLogout, onLoginClick, onLinkClick }: MobileUserMenuProps) => {
  return (
    <div className="flex flex-col gap-4">
      {userEmail && (
        <Link
          to="/settings"
          className="text-foreground hover:text-primary transition-colors flex items-center gap-2"
          onClick={onLinkClick}
        >
          <Settings2 className="h-5 w-5" />
          Настройки
        </Link>
      )}
      <Link
        to="/admin"
        className="text-foreground hover:text-primary transition-colors flex items-center gap-2"
        onClick={onLinkClick}
      >
        <Shield className="h-5 w-5" />
        Администратор
      </Link>
      {userEmail && (
        <Link
          to="/profile"
          className="text-foreground hover:text-primary transition-colors flex items-center gap-2"
          onClick={onLinkClick}
        >
          <User className="h-5 w-5" />
          Профиль
        </Link>
      )}
      <TokenDisplay />
      {userEmail ? (
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => {
            onLogout();
            onLinkClick();
          }}
        >
          Выйти
        </Button>
      ) : (
        <Button 
          className="w-full" 
          onClick={() => {
            onLoginClick();
            onLinkClick();
          }}
        >
          Войти
        </Button>
      )}
    </div>
  );
};