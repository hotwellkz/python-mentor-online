import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { courseBlocks, businessAnalystBlocks } from "@/data/courseData";
import { supabase } from "@/integrations/supabase/client";
import { Check } from "lucide-react";

interface CourseProgramProps {
  courseType?: 'python' | 'business-analyst';
}

export const CourseProgram = ({ courseType = 'python' }: CourseProgramProps) => {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const blocks = courseType === 'business-analyst' ? businessAnalystBlocks : courseBlocks;

  const calculateProgress = (completedCount: number) => {
    const totalLessons = blocks.reduce((acc, block) => acc + block.lessons.length, 0);
    return Math.round((completedCount / totalLessons) * 100);
  };

  useEffect(() => {
    fetchCompletedLessons();

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        fetchCompletedLessons();
      } else if (event === 'SIGNED_OUT') {
        setCompletedLessons([]);
        setProgress(0);
      }
    });

    // Подписываемся на изменения в таблице completed_lessons
    const channel = supabase
      .channel('completed_lessons_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: courseType === 'business-analyst' ? 'business_analyst_progress' : 'completed_lessons',
        },
        () => {
          fetchCompletedLessons();
        }
      )
      .subscribe();

    return () => {
      authListener?.subscription.unsubscribe();
      supabase.removeChannel(channel);
    };
  }, [courseType]);

  const fetchCompletedLessons = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setCompletedLessons([]);
      setProgress(0);
      return;
    }

    const table = courseType === 'business-analyst' ? 'business_analyst_progress' : 'completed_lessons';
    const { data } = await supabase
      .from(table)
      .select('lesson_id')
      .eq('user_id', user.id);

    if (data) {
      setCompletedLessons(data.map(item => item.lesson_id));
      setProgress(calculateProgress(data.length));
    }
  };

  return (
    <div className="mb-12">
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Ваш прогресс
        </h2>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-2">
          <div 
            className="bg-primary h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Пройдено {progress}% курса
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {blocks.map((block, blockIndex) => (
          <AccordionItem key={blockIndex} value={`block-${blockIndex}`}>
            <AccordionTrigger className="text-lg font-semibold">
              {block.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pl-4">
                {block.lessons.map((lesson, lessonIndex) => {
                  const lessonId = courseType === 'business-analyst' 
                    ? `ba-${blockIndex + 1}-${lessonIndex + 1}`
                    : `${blockIndex + 1}-${lessonIndex + 1}`;
                  const isCompleted = completedLessons.includes(lessonId);

                  return (
                    <div key={lessonIndex} className="border-l-2 border-gray-200 pl-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/lesson/${lessonId}`}
                          className={`font-medium hover:text-primary/80 transition-colors mb-2 flex-grow ${
                            isCompleted ? 'text-green-500' : 'text-primary'
                          }`}
                        >
                          {lesson.title}
                        </Link>
                        {isCompleted && (
                          <Check className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {lesson.topics.map((topic, topicIndex) => (
                          <li key={topicIndex}>{topic}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};