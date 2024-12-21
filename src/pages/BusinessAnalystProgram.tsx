import { Helmet } from "react-helmet";
import { CourseProgram } from "@/components/course/CourseProgram";
import { ChatInterface } from "@/components/chat/ChatInterface";

const BusinessAnalystProgram = () => {
  return (
    <>
      <Helmet>
        <title>Программа курса | Бизнес-аналитик с ИИ-учителем</title>
        <meta
          name="description"
          content="Подробная программа курса бизнес-аналитика с персональным ИИ-учителем. 8 месяцев обучения, практические задания и поддержка 24/7."
        />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Программа курса Бизнес-аналитик</h1>
        <CourseProgram courseType="business-analyst" />
        <ChatInterface />
      </div>
    </>
  );
};

export default BusinessAnalystProgram;