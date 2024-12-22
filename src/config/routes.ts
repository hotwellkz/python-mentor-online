export const routes: { [key: string]: { title: string; parent?: string } } = {
  "/program": { title: "Программа курса Python", parent: "/python-course" },
  "/python-course": { title: "Изучайте Python" },
  "/devops": { title: "DevOps-инженер" },
  "/devops-program": { title: "Программа курса DevOps", parent: "/devops" },
  "/business-analyst": { title: "Бизнес-аналитик" },
  "/business-analyst-program": { title: "Программа курса Бизнес-аналитик", parent: "/business-analyst" },
  "/auth": { title: "Авторизация" },
  "/privacy": { title: "Политика конфиденциальности" },
  "/terms": { title: "Публичная оферта" },
  "/pricing": { title: "Тарифы" },
  "/admin": { title: "Панель администратора" },
  "/profile": { title: "Профиль" },
  "/settings": { title: "Настройки аккаунта" },
  "/faq": { title: "Часто задаваемые вопросы" }
};