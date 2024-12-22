import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { UserInfo } from "@/components/profile/UserInfo";
import { LearningProgress } from "@/components/profile/LearningProgress";
import { FavoriteCourses } from "@/components/profile/FavoriteCourses";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>();
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

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
      setUserId(user.id);

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
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold">Личный кабинет</h1>
          
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-8">
              <UserInfo userEmail={userEmail} onLogout={handleLogout} />
              <FavoriteCourses userId={userId} />
            </div>
            <LearningProgress completedLessons={completedLessons} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;