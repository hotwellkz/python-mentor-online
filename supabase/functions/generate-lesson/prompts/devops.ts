export const getDevOpsLessonPrompt = (lessonId: string) => {
  const [, moduleIndex, topicIndex] = lessonId.split("-").map(Number);
  
  const modules = [
    {
      title: "Введение в DevOps",
      topics: [
        "Что такое DevOps и зачем он нужен?",
        "Основные концепции DevOps",
        "Культура DevOps: взаимодействие команд",
        "Основные задачи DevOps-инженера",
        "Обзор инструментов DevOps"
      ]
    },
    {
      title: "Контроль версий и управление исходным кодом",
      topics: [
        "Основы Git и GitHub/GitLab",
        "Создание репозиториев, работа с ветками",
        "Ревью кода и pull requests",
        "GitOps и управление инфраструктурой через код",
        "Концепция Infrastructure as Code (IaC)"
      ]
    },
    {
      title: "Контейнеризация и управление контейнерами",
      topics: [
        "Docker: основы и практика",
        "Работа с Docker Compose",
        "Kubernetes: основы и архитектура",
        "Управление кластерами Kubernetes",
        "Практика работы с контейнерами"
      ]
    },
    {
      title: "CI/CD (Непрерывная интеграция и доставка)",
      topics: [
        "Основы CI/CD",
        "Jenkins: установка и настройка",
        "GitHub Actions",
        "Автоматизация процессов",
        "Практика создания пайплайнов"
      ]
    },
    {
      title: "Мониторинг и логирование",
      topics: [
        "Основы мониторинга",
        "Prometheus и Grafana",
        "Системы логирования",
        "ELK Stack",
        "Практика настройки мониторинга"
      ]
    },
    {
      title: "Безопасность в DevOps",
      topics: [
        "Основы DevSecOps",
        "Сканирование уязвимостей",
        "Управление секретами",
        "Безопасность контейнеров",
        "Практика безопасной разработки"
      ]
    },
    {
      title: "Работа с облачными платформами",
      topics: [
        "Введение в облачные технологии",
        "AWS основы",
        "Azure и Google Cloud",
        "Terraform",
        "Практика работы с облаком"
      ]
    },
    {
      title: "Оркестрация и автоматизация",
      topics: [
        "Ansible основы",
        "Написание playbooks",
        "HashiCorp инструменты",
        "Consul и Nomad",
        "Практика автоматизации"
      ]
    },
    {
      title: "Финальный проект",
      topics: [
        "Планирование DevOps проекта",
        "Реализация CI/CD",
        "Настройка мониторинга",
        "Обеспечение безопасности",
        "Защита проекта"
      ]
    }
  ];

  const module = modules[moduleIndex - 1];
  const topic = module?.topics[topicIndex - 1];

  if (!module || !topic) {
    throw new Error('Invalid lesson ID');
  }

  return `Расскажи подробно как будто ты преподаватель и преподаешь курс DevOps-инженер PRO, урок из модуля "${module.title}" на тему: "${topic}". Используй много практических примеров и объясняй сложные концепции простым языком. Добавь примеры кода где это уместно.`;
};