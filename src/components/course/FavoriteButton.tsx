import { useState, useEffect } from "react";
import { Star, StarOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FavoriteButtonProps {
  courseType: string;
}

export const FavoriteButton = ({ courseType }: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    checkFavoriteStatus();
  }, [courseType]);

  const checkFavoriteStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('favorite_courses')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_type', courseType)
        .maybeSingle();

      if (error) throw error;
      setIsFavorite(!!data);
    } catch (error) {
      console.error('Error checking favorite status:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Требуется авторизация",
          description: "Войдите в систему, чтобы добавить курс в избранное",
          variant: "destructive",
        });
        return;
      }

      if (isFavorite) {
        const { error } = await supabase
          .from('favorite_courses')
          .delete()
          .eq('user_id', user.id)
          .eq('course_type', courseType);

        if (error) throw error;

        setIsFavorite(false);
        toast({
          title: "Готово",
          description: "Курс удален из избранного",
        });
      } else {
        const { error } = await supabase
          .from('favorite_courses')
          .insert([
            { user_id: user.id, course_type: courseType }
          ]);

        if (error) throw error;

        setIsFavorite(true);
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
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleFavorite}
      className="absolute top-4 right-4 hover:bg-transparent"
    >
      {isFavorite ? (
        <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
      ) : (
        <StarOff className="h-6 w-6 text-gray-400" />
      )}
    </Button>
  );
};