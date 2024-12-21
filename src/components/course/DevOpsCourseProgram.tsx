import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";
import { Check, BookOpen, Code2, Server, Shield, Cloud, Container, GitBranch, Workflow, Activity } from "lucide-react";
import { motion } from "framer-motion";

const modules = [
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
        {modules.map((module, moduleIndex) => {
          const ModuleIcon = module.icon;
          return (
            <motion.div
              key={moduleIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: moduleIndex * 0.1 }}
            >
              <AccordionItem value={`module-${moduleIndex}`}>
                <AccordionTrigger className="text-lg font-semibold">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <ModuleIcon className="h-5 w-5 text-primary" />
                    </div>
                    {module.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pl-4">
                    <div className="border-l-2 border-gray-200 pl-4">
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        {module.topics.map((topic, topicIndex) => {
                          const lessonId = `devops-${moduleIndex + 1}-${topicIndex + 1}`;
                          const isCompleted = completedLessons.includes(lessonId);

                          return (
                            <li
                              key={topicIndex}
                              className="flex items-start gap-2 group hover:text-primary transition-colors"
                            >
                              <Link
                                to={`/lesson/${lessonId}`}
                                className="flex-grow hover:text-primary transition-colors"
                              >
                                {topic}
                              </Link>
                              {isCompleted && (
                                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          );
        })}
      </Accordion>
    </div>
  );
};