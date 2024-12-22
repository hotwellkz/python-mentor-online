import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
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

    getProfile();
  }, [navigate, toast]);

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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Личный кабинет</h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Информация профиля</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Email: {userEmail}
            </p>
            <Button variant="outline" onClick={handleLogout}>
              Выйти из аккаунта
            </Button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Прогресс обучения</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Пройдено уроков: {completedLessons.length}
            </p>
            <div className="space-y-4">
              {completedLessons.map((lessonId) => (
                <div
                  key={lessonId}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  Урок {lessonId}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;