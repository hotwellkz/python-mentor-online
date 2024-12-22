import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email || "");
      }
    } catch (error: any) {
      console.error("Error loading user data:", error.message);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({ email });

      if (error) throw error;

      toast({
        title: "Успешно",
        description: "Профиль обновлен",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Вы уверены, что хотите удалить аккаунт? Это действие необратимо."
    );

    if (confirmed) {
      try {
        setLoading(true);
        const { error } = await supabase.auth.admin.deleteUser(
          (await supabase.auth.getUser()).data.user?.id || ""
        );

        if (error) throw error;

        await supabase.auth.signOut();
        navigate("/");
        
        toast({
          title: "Аккаунт удален",
          description: "Ваш аккаунт был успешно удален",
        });
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: error.message,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Настройки аккаунта | Курсы программирования с ИИ-учителем</title>
        <meta
          name="description"
          content="Настройте параметры своего аккаунта, управляйте уведомлениями и персонализируйте опыт обучения."
        />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Настройки аккаунта</h1>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Основные настройки</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>

              <Button
                onClick={handleUpdateProfile}
                disabled={loading}
                className="w-full"
              >
                {loading ? "Сохранение..." : "Сохранить изменения"}
              </Button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-red-600">Опасная зона</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Удаление аккаунта приведет к потере всех данных и прогресса обучения.
              Это действие необратимо.
            </p>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Удаление..." : "Удалить аккаунт"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
