import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { CourseBlock } from "@/components/program/CourseBlock";
import { ProgramHeader } from "@/components/program/ProgramHeader";
import { CourseProgress } from "@/components/program/CourseProgress";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { courseBlocks } from "@/data/courseData";

const Program = () => {
  return (
    <>
      <Helmet>
        <title>Программа курса Python | Изучение Python с ИИ-учителем</title>
        <meta
          name="description"
          content="Подробная программа курса Python для начинающих. Изучите основы программирования, ООП, работу с базами данных, веб-разработку и многое другое с персональным ИИ-учителем."
        />
        <meta
          name="keywords"
          content="python курс, программа обучения python, python для начинающих, изучение python, уроки python"
        />
        <link rel="canonical" href={window.location.origin + "/program"} />
        <meta property="og:title" content="Программа курса Python | Изучение Python с ИИ-учителем" />
        <meta property="og:description" content="Подробная программа курса Python для начинающих. Изучите основы программирования, ООП, работу с базами данных, веб-разработку и многое другое с персональным ИИ-учителем." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.origin + "/program"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Программа курса Python | Изучение Python с ИИ-учителем" />
        <meta name="twitter:description" content="Подробная программа курса Python для начинающих. Изучите Python с персональным ИИ-учителем." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 dark:bg-gray-900"
      >
        <div className="container mx-auto px-4 py-12">
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