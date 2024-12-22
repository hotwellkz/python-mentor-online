import { Helmet } from "react-helmet";
import { DevOpsCourseProgram } from "@/components/course/DevOpsCourseProgram";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { AuthCheck } from "@/components/AuthCheck";
import { motion } from "framer-motion";

const DevOpsProgram = () => {
  return (
    <>
      <Helmet>
        <title>Программа курса DevOps | Полное руководство по DevOps</title>
        <meta
          name="description"
          content="Изучите DevOps практики от основ до продвинутого уровня. CI/CD, контейнеризация, облачные технологии - всё в одном курсе с ИИ-учителем."
        />
        <meta
          name="keywords"
          content="программа devops, devops практики, ci cd pipeline, docker kubernetes обучение, облачные технологии курс"
        />
        <link rel="canonical" href={window.location.origin + "/devops-program"} />
      </Helmet>
      <AuthCheck />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8">Программа курса DevOps-инженер PRO</h1>
          <p className="text-lg text-gray-600 mb-8">
            Изучите все аспекты DevOps: от основ до продвинутых практик. Каждый модуль включает
            практические задания и поддержку ИИ-учителя 24/7.
          </p>
        </motion.div>
        <DevOpsCourseProgram />
        <ChatInterface />
      </div>
    </>
  );
};

export default DevOpsProgram;