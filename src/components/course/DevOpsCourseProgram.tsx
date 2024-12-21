import { useEffect, useState } from "react";
import { Accordion } from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, Code2, Server, Shield, Cloud, Container, GitBranch, Workflow, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { DevOpsModule } from "./devops/DevOpsModule";

export const modules = [
  {
    title: "Модуль 1: Введение в DevOps",
    icon: BookOpen,
    topics: [
      "Что такое DevOps и зачем он нужен?",
      "Основные концепции DevOps",
      "Культура DevOps: взаимодействие команд",
      "Основные задачи DevOps-инженера",
      "Обзор инструментов DevOps",
      "Jenkins, Docker, Kubernetes, Ansible, Terraform и другие",
      "Выбор технологий для различных проектов",
      "Основы систем администрирования",
      "Linux и Windows для DevOps",
      "Управление процессами, правами доступа и сетями"
    ]
  },
  {
    title: "Модуль 2: Контроль версий и управление исходным кодом",
    icon: GitBranch,
    topics: [
      "Основы Git и GitHub/GitLab",
      "Создание репозиториев, работа с ветками",
      "Ревью кода и pull requests",
      "GitOps и управление инфраструктурой через код",
      "Концепция \"Infrastructure as Code\" (IaC)",
      "Инструменты: Terraform, Pulumi"
    ]
  },
  {
    title: "Модуль 3: Контейнеризация и управление контейнерами",
    icon: Container,
    topics: [
      "Docker",
      "Создание и управление контейнерами",
      "Работа с Docker Compose",
      "Kubernetes",
      "Основные концепции: Pods, Deployments, Services",
      "Управление кластерами: Helm Charts, Kustomize",
      "Практика: настройка кластера Kubernetes"
    ]
  },
  {
    title: "Модуль 4: CI/CD (Непрерывная интеграция и доставка)",
    icon: Workflow,
    topics: [
      "Jenkins",
      "Установка и настройка Jenkins",
      "Создание пайплайнов",
      "GitHub Actions",
      "Автоматизация с помощью GitHub Actions",
      "Настройка workflow для проектов",
      "Практика: создание полного CI/CD пайплайна"
    ]
  },
  {
    title: "Модуль 5: Мониторинг и логирование",
    icon: Activity,
    topics: [
      "Основы мониторинга",
      "Инструменты: Prometheus, Grafana",
      "Настройка алертов и визуализации данных",
      "Логирование",
      "Инструменты: ELK Stack (Elasticsearch, Logstash, Kibana), Loki",
      "Анализ логов для устранения ошибок"
    ]
  },
  {
    title: "Модуль 6: Безопасность в DevOps",
    icon: Shield,
    topics: [
      "Основы DevSecOps",
      "Интеграция безопасности в CI/CD",
      "Сканирование уязвимостей (Snyk, Trivy)",
      "Управление секретами",
      "HashiCorp Vault, AWS Secrets Manager",
      "Шифрование и безопасное хранение"
    ]
  },
  {
    title: "Модуль 7: Работа с облачными платформами",
    icon: Cloud,
    topics: [
      "Введение в облака",
      "AWS, Azure, Google Cloud: сравнение возможностей",
      "Управление инфраструктурой в облаке",
      "Terraform и CloudFormation",
      "Развертывание приложений в облаке",
      "Практика: настройка инфраструктуры для облачного проекта"
    ]
  },
  {
    title: "Модуль 8: Оркестрация и автоматизация",
    icon: Server,
    topics: [
      "Ansible",
      "Написание playbooks",
      "Автоматизация конфигурации серверов",
      "HashiCorp Tools",
      "Consul для сервисной сети",
      "Nomad для оркестрации задач",
      "Практика: автоматизация развертывания приложения"
    ]
  },
  {
    title: "Модуль 9: Финальный проект",
    icon: Code2,
    topics: [
      "Постановка задачи",
      "Разработка и автоматизация CI/CD для веб-приложения",
      "Настройка мониторинга, логирования и безопасности",
      "Реализация проекта",
      "Работа над проектом в командах",
      "Презентация решений",
      "Сертификация",
      "Тестирование знаний",
      "Сертификат \"DevOps Engineer Pro\""
    ]
  }
];

export const DevOpsCourseProgram = () => {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    fetchCompletedLessons();

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        fetchCompletedLessons();
      } else if (event === 'SIGNED_OUT') {
        setCompletedLessons([]);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const fetchCompletedLessons = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setCompletedLessons([]);
      return;
    }

    const { data } = await supabase
      .from('devops_progress')
      .select('lesson_id')
      .eq('user_id', user.id);

    if (data) {
      setCompletedLessons(data.map(item => item.lesson_id));
    }
  };

  return (
    <div className="mb-12">
      <Accordion type="single" collapsible className="w-full">
        {modules.map((module, moduleIndex) => (
          <motion.div
            key={moduleIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: moduleIndex * 0.1 }}
          >
            <DevOpsModule
              title={module.title}
              topics={module.topics}
              icon={module.icon}
              moduleIndex={moduleIndex}
              completedLessons={completedLessons}
            />
          </motion.div>
        ))}
      </Accordion>
    </div>
  );
};
