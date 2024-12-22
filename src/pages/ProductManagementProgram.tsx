import { Helmet } from "react-helmet";
import { CourseProgram } from "@/components/course/CourseProgram";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { FavoriteButton } from "@/components/course/FavoriteButton";

const ProductManagementProgram = () => {
  return (
    <>
      <Helmet>
        <title>Программа курса | Продукт-менеджмент с ИИ-учителем</title>
        <meta
          name="description"
          content="Подробная программа курса продукт-менеджмента с персональным ИИ-учителем. 6 месяцев обучения, практические задания и поддержка 24/7."
        />
        <meta
          name="keywords"
          content="программа курса продукт менеджмент, product management обучение, курс продакт менеджер, product owner программа"
        />
      </Helmet>
      <div className="container mx-auto px-4 py-8 relative">
        <FavoriteButton courseType="product-management" />
        <h1 className="text-4xl font-bold mb-8">Программа курса Продукт-менеджмент</h1>
        <CourseProgram courseType="product-management" />
        <ChatInterface />
      </div>
    </>
  );
};

export default ProductManagementProgram;