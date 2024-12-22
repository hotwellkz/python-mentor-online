import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Lesson {
  title: string;
  topics: string[];
}

interface CourseBlockProps {
  title: string;
  lessons: Lesson[];
  index: number;
}

export const CourseBlock = ({ title, lessons, index }: CourseBlockProps) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8"
      >
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value={`block-${index}`}>
            <AccordionTrigger className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 hover:text-primary transition-colors">
              {title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-6 mt-4">
                {lessons.map((lesson, lessonIndex) => {
                  const lessonId = `${index + 1}-${lessonIndex + 1}`;
                  const lessonUrl = `/lesson/${lessonId}`;
                  const seoDescription = `${lesson.title}. ${lesson.topics.join(". ")}. Изучите Python с персональным ИИ-учителем.`;
                  
                  return (
                    <div
                      key={lessonIndex}
                      className="border-l-4 border-primary pl-4 py-2"
                    >
                      {lessonUrl === window.location.pathname && (
                        <Helmet>
                          <title>{`${lesson.title} | Python с ИИ-учителем`}</title>
                          <meta name="description" content={seoDescription} />
                          <meta name="keywords" content={`python урок, ${lesson.topics.join(", ")}, обучение python, курсы программирования`} />
                          <link rel="canonical" href={window.location.origin + lessonUrl} />
                          <meta property="og:title" content={`${lesson.title} | Python с ИИ-учителем`} />
                          <meta property="og:description" content={seoDescription} />
                          <meta property="og:type" content="article" />
                          <meta property="og:url" content={window.location.origin + lessonUrl} />
                        </Helmet>
                      )}
                      <Link
                        to={lessonUrl}
                        className="block"
                      >
                        <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 hover:text-primary transition-colors">
                          {lesson.title}
                        </h3>
                      </Link>
                      <ul className="space-y-2">
                        {lesson.topics.map((topic, topicIndex) => (
                          <li
                            key={topicIndex}
                            className="text-gray-600 dark:text-gray-400 flex items-start"
                          >
                            <ChevronDown className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </>
  );
};