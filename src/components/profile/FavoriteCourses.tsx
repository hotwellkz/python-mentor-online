import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Star, StarOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FavoriteCoursesProps {
  userId: string | undefined;
}

interface Course {
  id: string;
  title: string;
  type: string;
  path: string;
}

const courses: Course[] = [
  { id: '1', title: 'Python', type: 'python', path: '/program' },
  { id: '2', title: 'DevOps', type: 'devops', path: '/devops' },
  { id: '3', title: 'Data Science', type: 'data-science', path: '/data-science' },
  { id: '4', title: 'Бизнес-аналитик', type: 'business-analyst', path: '/business-analyst' },
];

export const FavoriteCourses = ({ userId }: FavoriteCoursesProps) => {
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchFavorites();
    }
  }, [userId]);

  const fetchFavorites = async () => {
    try {
      const { data, error } = await supabase
        .from('favorite_courses')
        .select('course_type')
        .eq('user_id', userId);

      if (error) throw error;

      setFavorites(data.map(f => f.course_type));
    } catch (error: any) {
      console.error('Error fetching favorites:', error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось загрузить избранные курсы",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (courseType: string) => {
    try {
      if (favorites.includes(courseType)) {
        // Remove from favorites
        const { error } = await supabase
          .from('favorite_courses')
          .delete()
          .eq('user_id', userId)
          .eq('course_type', courseType);

        if (error) throw error;

        setFavorites(favorites.filter(f => f !== courseType));
        toast({
          title: "Готово",
          description: "Курс удален из избранного",
        });
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('favorite_courses')
          .insert([
            { user_id: userId, course_type: courseType }
          ]);

        if (error) throw error;

        setFavorites([...favorites, courseType]);
        toast({
          title: "Готово",
          description: "Курс добавлен в избранное",
        });
      }
    } catch (error: any) {
      console.error('Error toggling favorite:', error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось обновить избранное",
      });
    }
  };

  if (loading) {
    return <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Избранные курсы</h2>
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
        ))}
      </div>
    </div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Избранные курсы</h2>
      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <span className="text-gray-900 dark:text-gray-100">{course.title}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleFavorite(course.type)}
              className="hover:bg-transparent"
            >
              {favorites.includes(course.type) ? (
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              ) : (
                <StarOff className="h-5 w-5 text-gray-400" />
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};