import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const NavLinks = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="text-white hover:text-primary transition-colors group flex items-center gap-1">
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
        </DropdownMenuContent>
      </DropdownMenu>
      <Link 
        to="/pricing"
        className="text-white hover:text-primary transition-colors"
      >
        Тарифы
      </Link>
    </>
  );
};