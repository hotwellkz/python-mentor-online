import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "AI Старт",
      price: "3,250",
      tokens: 100,
      description: "Достаточно для знакомства с платформой и изучения основ Python",
      gradient: "from-blue-500 to-purple-500",
      popular: false,
      paymentLink: "https://c.tiptoppay.kz/payments/5434c62cf0114fb4922930d095b94ac4"
    },
    {
      name: "AI Прорыв",
      price: "5,500",
      tokens: 300,
      description: "Оптимальный набор для полноценного изучения Python с помощью ИИ",
      gradient: "from-blue-400 to-purple-600",
      popular: true,
      paymentLink: "https://c.tiptoppay.kz/payments/1382f3739cc34b31adfe037f87856585"
    },
    {
      name: "AI Эксперт",
      price: "12,250",
      tokens: 1000,
      description: "Максимальный набор для полного курса и будущих обновлений",
      gradient: "from-purple-500 to-pink-500",
      popular: false,
      paymentLink: "https://c.tiptoppay.kz/payments/47f48b6c07bf4e67b6ab53015aa0429b"
    }
  ];

  const handlePayment = (link: string) => {
    window.location.href = link;
  };

  return (
    <>
      <Helmet>
        <title>Тарифы на обучение | Курсы программирования с ИИ-учителем</title>
        <meta
          name="description"
          content="Выберите подходящий тарифный план для обучения программированию с ИИ-учителем. Доступные цены, гибкие условия оплаты."
        />
        <meta
          name="keywords"
          content="тарифы на обучение программированию, стоимость курсов python, цены devops курсы, data science обучение цена"
        />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Тарифные планы
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Выберите подходящий тарифный план и начните обучение уже сегодня
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`relative rounded-2xl bg-gray-800 p-8 shadow-xl transition-transform hover:scale-105 ${
                  plan.popular ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1 text-sm font-semibold text-white">
                    Популярный выбор
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline text-white">
                    <span className="text-5xl font-bold tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-xl font-semibold">₸</span>
                  </div>
                </div>

                <p className="text-gray-400 mb-6">{plan.description}</p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePayment(plan.paymentLink)}
                  className={`w-full rounded-xl bg-gradient-to-r ${plan.gradient} py-3 text-white font-semibold shadow-lg transition-all hover:shadow-xl`}
                >
                  Начать обучение
                </motion.button>

                <div className="mt-6 flex items-center text-white">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>{plan.tokens} токенов</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;
