import { Helmet } from "react-helmet";
import { CourseProgram } from "@/components/course/CourseProgram";
import { ChatInterface } from "@/components/chat/ChatInterface";

const Program = () => {
  return (
    <>
      <Helmet>
        <title>Программа курса | Python с ИИ-учителем</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Программа курса</h1>
        <CourseProgram />
        <ChatInterface />
      </div>
    </>
  );
};

export default Program;