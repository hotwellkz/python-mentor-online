import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm">
            © {new Date().getFullYear()} Python с ИИ-учителем. Все права защищены.
          </div>
          <nav className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <Link to="/program" className="hover:text-primary transition-colors">
              Программа курса
            </Link>
            <Link to="/pricing" className="hover:text-primary transition-colors">
              Тарифы
            </Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Политика конфиденциальности
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Публичная оферта
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};