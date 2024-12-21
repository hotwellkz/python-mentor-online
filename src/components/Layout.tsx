import { Link, Outlet } from "react-router-dom";
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-900 text-white py-4">
        <div className="container mx-auto px-4">
          <Link to="/" className="text-2xl font-bold hover:text-primary transition-colors">
            Python с ИИ-учителем
          </Link>
        </div>
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};