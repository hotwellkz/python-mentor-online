import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const AuthCheck = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h1 className="text-3xl font-bold">Доступ к уроку</h1>
        <p className="text-lg text-gray-600">
          Для доступа к урокам необходимо войти в систему или зарегистрироваться
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/auth">
            <Button size="lg">
              Войти в систему
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};