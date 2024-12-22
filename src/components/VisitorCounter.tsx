import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Users } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type Visitor = Database['public']['Tables']['visitors']['Row'];
type VisitorResponse = {
  visitor_count: number;
  daily_count: number;
  date: string;
};

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
        setVisitorCount(data.visitor_count || 0);
        setDailyCount(data.daily_count || 0);
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
        (payload: { new: Visitor }) => {
          if (payload.new) {
            setVisitorCount(payload.new.visitor_count || 0);
            setDailyCount(payload.new.daily_count || 0);
          }
        }
      )
      .subscribe();

    // Update visitor count when component mounts
    const updateVisitorCount = async () => {
      const { data, error } = await supabase.rpc<VisitorResponse>('increment_visitor_count');

      if (error) {
        console.error('Error updating visitor count:', error);
        return;
      }

      if (data) {
        setVisitorCount(data.visitor_count || 0);
        setDailyCount(data.daily_count || 0);
      }
    };

    updateVisitorCount();

    // Cleanup subscription and decrement count when component unmounts
    return () => {
      const cleanup = async () => {
        const { error } = await supabase.rpc('decrement_visitor_count');
        
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