import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { courseBlocks } from "@/data/courseData";

export const CourseProgram = () => {
  return (
    <div className="mb-12">
      <Accordion type="single" collapsible className="w-full">
        {courseBlocks.map((block, blockIndex) => (
          <AccordionItem key={blockIndex} value={`block-${blockIndex}`}>
            <AccordionTrigger className="text-lg font-semibold">
              {block.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pl-4">
                {block.lessons.map((lesson, lessonIndex) => (
                  <div key={lessonIndex} className="border-l-2 border-gray-200 pl-4">
                    <Link
                      to={`/lesson/${blockIndex + 1}-${lessonIndex + 1}`}
                      className="font-medium text-primary hover:text-primary/80 transition-colors mb-2 block"
                    >
                      {lesson.title}
                    </Link>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {lesson.topics.map((topic, topicIndex) => (
                        <li key={topicIndex}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};