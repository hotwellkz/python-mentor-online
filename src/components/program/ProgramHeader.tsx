import { motion } from "framer-motion";

export const ProgramHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Программа курса Python
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
        Изучите Python с нуля до профессионального уровня с помощью нашей структурированной программы обучения
      </p>
    </motion.div>
  );
};