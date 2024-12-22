import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Users } from "lucide-react";

export const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [dailyCount, setDailyCount] = useState(0);

  useEffect(() => {
    // Initial fetch of visitor counts
    const fetchVisitorCounts = async () => {
      const { data, error } = await supabase
        .from('visitors')
        .select('visitor_count, daily_count')
        .single();

      if (error) {
        console.error('Error fetching visitor counts:', error);
        return;
      }

      if (data) {
        setVisitorCount(data.visitor_count);
        setDailyCount(data.daily_count);
      }
    };

    fetchVisitorCounts();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'visitors'
        },
        (payload) => {
          if (payload.new) {
            setVisitorCount(payload.new.visitor_count);
            setDailyCount(payload.new.daily_count);
          }
        }
      )
      .subscribe();

    // Update visitor count when component mounts
    const updateVisitorCount = async () => {
      const { data, error } = await supabase
        .from('visitors')
        .update({ visitor_count: supabase.sql`visitor_count + 1` })
        .eq('id', '1')
        .select()
        .single();

      if (error) console.error('Error updating visitor count:', error);
    };

    updateVisitorCount();

    // Cleanup subscription and decrement count when component unmounts
    return () => {
      const cleanup = async () => {
        const { error } = await supabase
          .from('visitors')
          .update({ visitor_count: supabase.sql`GREATEST(visitor_count - 1, 0)` })
          .eq('id', '1');
        
        if (error) console.error('Error decrementing visitor count:', error);
        supabase.removeChannel(channel);
      };
      cleanup();
    };
  }, []);

  return (
    <div className="flex items-center gap-4 text-sm text-gray-300">
      <div className="flex items-center gap-1">
        <Users className="h-4 w-4" />
        <span>Онлайн: {visitorCount}</span>
      </div>
      <div>
        <span>Сегодня: {dailyCount}</span>
      </div>
    </div>
  );
};