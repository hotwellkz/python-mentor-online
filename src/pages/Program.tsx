import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { CourseBlock } from "@/components/program/CourseBlock";
import { ProgramHeader } from "@/components/program/ProgramHeader";
import { CourseProgress } from "@/components/program/CourseProgress";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { courseBlocks } from "@/data/courseData";
import { FavoriteButton } from "@/components/course/FavoriteButton";

const Program = () => {
  return (
    <>
      <Helmet>
        <title>Программа курса Python | Полное руководство по Python</title>
        <meta
          name="description"
          content="Изучите Python от основ до продвинутого уровня с персональным ИИ-учителем. Подробная программа курса, практические задания и проекты."
        />
        <meta
          name="keywords"
          content="программа курса python, уроки python, обучение python программированию, python для начинающих"
        />
        <link rel="canonical" href={window.location.origin + "/program"} />
        <meta property="og:title" content="Программа курса Python | Полное руководство по Python" />
        <meta property="og:description" content="Изучите Python от основ до продвинутого уровня с персональным ИИ-учителем." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.origin + "/program"} />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 dark:bg-gray-900"
      >
        <div className="container mx-auto px-4 py-12 relative">
          <FavoriteButton courseType="python" />
          <ProgramHeader />
          <CourseProgress />
          
          <div className="grid grid-cols-1 gap-8">
            {courseBlocks.map((block, index) => (
              <CourseBlock
                key={index}
                index={index}
                title={block.title}
                lessons={block.lessons}
              />
            ))}
          </div>

          <div className="mt-12">
            <ChatInterface />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Program;