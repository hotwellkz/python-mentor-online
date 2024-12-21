import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Settings2, User } from "lucide-react";
import { TokenDisplay } from "@/components/TokenDisplay";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MobileMenuProps {
  userEmail: string | null;
  onLogout: () => Promise<void>;
}

export const MobileMenu = ({ userEmail, onLogout }: MobileMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-foreground hover:text-primary transition-colors text-left group flex items-center gap-1">
              <span>Курсы</span>
              <svg
                className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
                fill="none"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="animate-scale-in bg-white rounded-lg shadow-lg border border-gray-200 p-1 min-w-[150px]">
              <DropdownMenuItem className="rounded hover:bg-gray-100 transition-colors">
                <Link to="/" className="w-full px-3 py-2 text-gray-700 hover:text-primary">
                  Python
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded hover:bg-gray-100 transition-colors">
                <Link to="/devops" className="w-full px-3 py-2 text-gray-700 hover:text-primary">
                  DevOps
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded hover:bg-gray-100 transition-colors">
                <Link to="/business-analyst" className="w-full px-3 py-2 text-gray-700 hover:text-primary">
                  Бизнес-аналитик
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link 
            to="/pricing"
            className="text-foreground hover:text-primary transition-colors"
          >
            Тарифы
          </Link>
          {userEmail && (
            <Link
              to="/settings"
              className="text-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              <Settings2 className="h-5 w-5" />
              Настройки
            </Link>
          )}
          <Link
            to="/admin"
            className="text-foreground hover:text-primary transition-colors"
          >
            Администратор
          </Link>
          {userEmail && (
            <Link
              to="/profile"
              className="text-foreground hover:text-primary transition-colors flex items-center gap-2"
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
              onClick={onLogout}
            >
              Выйти
            </Button>
          ) : (
            <Link to="/auth" className="w-full">
              <Button className="w-full">Войти</Button>
            </Link>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};