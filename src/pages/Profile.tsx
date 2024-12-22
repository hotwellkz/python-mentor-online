import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) throw userError;
      
      if (!user) {
        navigate('/auth');
        return;
      }

      setUserEmail(user.email);

      const { data: lessonsData, error: lessonsError } = await supabase
        .from('completed_lessons')
        .select('lesson_id')
        .eq('user_id', user.id);

      if (lessonsError) throw lessonsError;

      setCompletedLessons(lessonsData.map(lesson => lesson.lesson_id));
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось загрузить профиль",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Пароли не совпадают",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Пароль должен содержать минимум 6 символов",
      });
      return;
    }

    try {
      setChangingPassword(true);
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;

      toast({
        title: "Успешно",
        description: "Пароль успешно изменен",
      });
      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error('Password change error:', error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message || "Не удалось изменить пароль",
      });
    } finally {
      setChangingPassword(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось выйти из системы",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const calculateProgress = () => {
    // Всего 40 уроков в курсе
    return Math.round((completedLessons.length / 40) * 100);
  };

  return (
    <>
      <Helmet>
        <title>Личный кабинет | Курсы программирования с ИИ-учителем</title>
        <meta
          name="description"
          content="Управляйте своим обучением, отслеживайте прогресс и настраивайте персональные параметры в личном кабинете."
        />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold">Личный кабинет</h1>
          
          <div className="grid gap-8 md:grid-cols-2">
            {/* Профиль пользователя */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Информация профиля</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Email: {userEmail}
                </p>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <h3 className="text-lg font-medium">Изменить пароль</h3>
                <div>
                  <Label htmlFor="password">Новый пароль</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Минимум 6 символов"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Повторите пароль"
                    className="mt-1"
                  />
                </div>
                <Button type="submit" disabled={changingPassword}>
                  {changingPassword ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Сохранение...
                    </>
                  ) : (
                    "Изменить пароль"
                  )}
                </Button>
              </form>

              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full"
              >
                Выйти из аккаунта
              </Button>
            </div>

            {/* Прогресс обучения */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Прогресс обучения</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>Общий прогресс</span>
                    <span>{calculateProgress()}%</span>
                  </div>
                  <Progress value={calculateProgress()} className="h-2" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Пройденные уроки</h3>
                  {completedLessons.length > 0 ? (
                    <div className="grid gap-3">
                      {completedLessons.map((lessonId) => (
                        <div
                          key={lessonId}
                          className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <span>Урок {lessonId}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">
                      Вы еще не прошли ни одного урока
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;