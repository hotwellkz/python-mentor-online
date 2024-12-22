import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const DevOpsFaq = () => {
  const faqs = [
    {
      question: "Что такое DevOps и почему это важно?",
      answer: "DevOps — это методология разработки программного обеспечения, которая объединяет разработку (Dev) и IT-операции (Ops). Это важно для оптимизации процессов разработки, тестирования и развертывания приложений, что приводит к более быстрой и качественной доставке продукта."
    },
    {
      question: "Какие инструменты изучаются в курсе DevOps?",
      answer: "В курсе вы изучите ключевые инструменты: Git для контроля версий, Docker для контейнеризации, Kubernetes для оркестрации контейнеров, Jenkins для непрерывной интеграции и доставки (CI/CD), а также инструменты мониторинга и облачные платформы."
    },
    {
      question: "Нужен ли опыт программирования для изучения DevOps?",
      answer: "Базовые знания программирования будут полезны, но не обязательны. Курс построен так, чтобы даже начинающие могли освоить DevOps практики. Важнее иметь желание учиться и понимать принципы работы современной разработки ПО."
    },
    {
      question: "Как проходит обучение с ИИ-учителем?",
      answer: "Обучение проходит в интерактивном формате, где ИИ-учитель адаптируется под ваш темп и стиль обучения. Вы получаете теоретические материалы, практические задания и мгновенную обратную связь. ИИ-учитель доступен 24/7 для ответов на вопросы."
    },
    {
      question: "Какие карьерные перспективы после курса?",
      answer: "DevOps-инженеры высоко востребованы на рынке труда. После курса вы сможете претендовать на позиции Junior DevOps Engineer, Cloud Engineer или Site Reliability Engineer в ведущих компаниях."
    },
    {
      question: "Сколько времени занимает обучение?",
      answer: "Курс рассчитан на 3-6 месяцев при занятиях 10-15 часов в неделю. Благодаря гибкому формату обучения с ИИ-учителем, вы можете адаптировать график под себя."
    },
    {
      question: "Есть ли практические задания в курсе?",
      answer: "Да, курс включает множество практических заданий, где вы будете работать с реальными инструментами и решать типичные задачи DevOps-инженера. Каждый модуль завершается практическим проектом."
    },
    {
      question: "Как происходит тестирование знаний?",
      answer: "Знания проверяются через интерактивные тесты, практические задания и проекты. ИИ-учитель оценивает ваш прогресс и даёт рекомендации по улучшению результатов."
    },
    {
      question: "Предоставляется ли поддержка при обучении?",
      answer: "Да, вы получаете круглосуточную поддержку от ИИ-учителя, который может ответить на любые вопросы по материалу курса и помочь решить возникающие проблемы."
    },
    {
      question: "Можно ли получить сертификат после окончания курса?",
      answer: "Да, после успешного завершения всех модулей и выполнения итогового проекта вы получаете сертификат о прохождении курса DevOps-инженер PRO."
    }
  ];

  return (
    <>
      <Helmet>
        <title>FAQ | DevOps-инженер PRO с ИИ-учителем</title>
        <meta
          name="description"
          content="Ответы на часто задаваемые вопросы о курсе DevOps-инженер PRO. Узнайте больше о обучении, программе курса и карьерных перспективах."
        />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 text-gray-900">
            Часто задаваемые вопросы о курсе DevOps-инженер PRO
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Ответы на самые популярные вопросы о курсе DevOps-инженер PRO с Персональным ИИ-учителем
          </p>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`} className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <AccordionTrigger className="px-6 py-4 text-left hover:bg-gray-50 rounded-t-lg">
                    <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </>
  );
};

export default DevOpsFaq;