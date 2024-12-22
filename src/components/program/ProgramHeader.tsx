import { motion } from "framer-motion";

export const ProgramHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12 text-center"
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
        Программа курса Python
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        Изучите Python с нуля до профессионального уровня. Курс включает теорию, практику и работу над реальными проектами.
      </p>
    </motion.div>
  );
};