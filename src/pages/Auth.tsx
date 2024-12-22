import { useState } from "react";
import { Helmet } from "react-helmet";
import { AuthForm } from "@/components/auth/AuthForm";
import { useAuthForm } from "@/hooks/useAuthForm";

const Auth = () => {
  const [showGiftModal, setShowGiftModal] = useState(false);
  const authFormProps = useAuthForm(setShowGiftModal);

  return (
    <>
      <Helmet>
        <title>Авторизация | Курсы программирования с ИИ-учителем</title>
        <meta
          name="description"
          content="Войдите в свой аккаунт или зарегистрируйтесь для доступа к курсам программирования с ИИ-учителем. Безопасная авторизация и персональный кабинет."
        />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Войти в аккаунт</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Продолжите обучение с персональным ИИ-учителем
            </p>
          </div>
          <AuthForm {...authFormProps} setShowGiftModal={setShowGiftModal} />
        </div>
      </div>
    </>
  );
};

export default Auth;