import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { CourseProgram } from "@/components/course/CourseProgram";
import { ChatInterface } from "@/components/chat/ChatInterface";

const DataScienceProgram = () => {
  return (
    <>
      <Helmet>
        <title>Программа курса Data Science | Полное руководство по анализу данных</title>
        <meta
          name="description"
          content="Изучите Data Science от основ до продвинутого уровня. Анализ данных, машинное обучение, визуализация - всё в одном курсе с ИИ-учителем."
        />
        <meta
          name="keywords"
          content="программа data science, анализ данных курс, машинное обучение обучение, визуализация данных, python для data science"
        />
        <link rel="canonical" href={window.location.origin + "/data-science-program"} />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Программа курса Data Science
          </h1>
        </motion.div>
        <CourseProgram courseType="data-science" />
        <ChatInterface />
      </div>
    </>
  );
};

export default DataScienceProgram;