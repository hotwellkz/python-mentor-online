import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { CourseProgram } from "@/components/course/CourseProgram";
import { ChatInterface } from "@/components/chat/ChatInterface";

const DataScienceProgram = () => {
  return (
    <>
      <Helmet>
        <title>Программа курса | Data Science с ИИ-учителем</title>
        <meta
          name="description"
          content="Подробная программа курса Data Science с персональным ИИ-учителем. 12 месяцев обучения, практические задания и поддержка 24/7."
        />
        <meta
          name="keywords"
          content="data science курс, программа обучения data science, data science для начинающих, изучение data science, уроки data science"
        />
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