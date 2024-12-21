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
  const blocks = courseType === 'business-analyst' ? businessAnalystBlocks : courseBlocks;

  useEffect(() => {
    fetchCompletedLessons();

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        fetchCompletedLessons();
      } else if (event === 'SIGNED_OUT') {
        setCompletedLessons([]);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const fetchCompletedLessons = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setCompletedLessons([]);
      return;
    }

    const table = courseType === 'business-analyst' ? 'business_analyst_progress' : 'completed_lessons';
    const { data } = await supabase
      .from(table)
      .select('lesson_id')
      .eq('user_id', user.id);

    if (data) {
      setCompletedLessons(data.map(item => item.lesson_id));
    }
  };

  return (
    <div className="mb-12">
      <Accordion type="single" collapsible className="w-full">
        {blocks.map((block, blockIndex) => (
          <AccordionItem key={blockIndex} value={`block-${blockIndex}`}>
            <AccordionTrigger className="text-lg font-semibold">
              {block.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pl-4">
                {block.lessons.map((lesson, lessonIndex) => {
                  const lessonId = `${blockIndex + 1}-${lessonIndex + 1}`;
                  const isCompleted = completedLessons.includes(lessonId);

                  return (
                    <div key={lessonIndex} className="border-l-2 border-gray-200 pl-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/lesson/${lessonId}`}
                          className="font-medium text-primary hover:text-primary/80 transition-colors mb-2 flex-grow"
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