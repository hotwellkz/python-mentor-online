import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useParams } from 'react-router-dom';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface LessonTestProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getDevOpsQuestions = (moduleIndex: number, topicIndex: number): Question[] => {
  const moduleQuestions: { [key: string]: { [key: string]: Question[] } } = {
    1: { // Модуль 1: Введение в DevOps
      1: [
        {
          question: "Что такое DevOps?",
          options: [
            "Методология разработки ПО, объединяющая разработку и эксплуатацию",
            "Язык программирования",
            "Операционная система",
            "Система управления базами данных"
          ],
          correctAnswer: 0
        },
        {
          question: "Какая основная цель DevOps?",
          options: [
            "Увеличение скорости разработки в ущерб качеству",
            "Сокращение штата сотрудников",
            "Ускорение и улучшение процесса доставки ПО",
            "Полная автоматизация без участия человека"
          ],
          correctAnswer: 2
        },
        {
          question: "Что НЕ является принципом DevOps?",
          options: [
            "Непрерывная интеграция",
            "Автоматизация",
            "Изоляция команд разработки и эксплуатации",
            "Мониторинг и обратная связь"
          ],
          correctAnswer: 2
        },
        {
          question: "Какой инструмент НЕ относится к экосистеме DevOps?",
          options: [
            "Jenkins",
            "Microsoft Word",
            "Docker",
            "Kubernetes"
          ],
          correctAnswer: 1
        },
        {
          question: "Что такое CI/CD в контексте DevOps?",
          options: [
            "Непрерывная интеграция и доставка",
            "Компьютерные инструкции и документация",
            "Контроль изменений и дебаггинг",
            "Централизованная идентификация и доступ"
          ],
          correctAnswer: 0
        }
      ],
      2: [
        {
          question: "Какие навыки необходимы DevOps-инженеру?",
          options: [
            "Только знание программирования",
            "Только знание систем администрирования",
            "Комбинация технических и soft skills",
            "Только коммуникативные навыки"
          ],
          correctAnswer: 2
        },
        {
          question: "Что такое культура DevOps?",
          options: [
            "Строгая иерархия в команде",
            "Сотрудничество и общая ответственность",
            "Работа в изоляции",
            "Конкуренция между отделами"
          ],
          correctAnswer: 1
        },
        {
          question: "Как измеряется успех DevOps?",
          options: [
            "Только по скорости доставки",
            "Только по количеству исправленных ошибок",
            "По комбинации метрик производительности и качества",
            "По количеству строк кода"
          ],
          correctAnswer: 2
        },
        {
          question: "Какой подход к безопасности используется в DevOps?",
          options: [
            "DevSecOps - интеграция безопасности на всех этапах",
            "Проверка безопасности только перед релизом",
            "Безопасность не входит в scope DevOps",
            "Ручное тестирование безопасности"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое Infrastructure as Code?",
          options: [
            "Написание документации к инфраструктуре",
            "Управление инфраструктурой через код",
            "Кодирование на инфраструктурном уровне",
            "Инфраструктурное программирование"
          ],
          correctAnswer: 1
        }
      ]
    },
    2: { // Модуль 2: Контроль версий
      1: [
        {
          question: "Что такое Git?",
          options: [
            "Система контроля версий",
            "База данных",
            "Язык программирования",
            "Операционная система"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое коммит в Git?",
          options: [
            "Удаление файла",
            "Создание новой ветки",
            "Сохранение изменений в репозитории",
            "Слияние веток"
          ],
          correctAnswer: 2
        },
        {
          question: "Для чего используется команда git pull?",
          options: [
            "Для отправки изменений на сервер",
            "Для получения изменений с сервера",
            "Для создания новой ветки",
            "Для удаления ветки"
          ],
          correctAnswer: 1
        },
        {
          question: "Что такое merge conflict?",
          options: [
            "Ошибка в коде",
            "Конфликт при слиянии веток",
            "Проблема с сервером",
            "Отсутствие интернета"
          ],
          correctAnswer: 1
        },
        {
          question: "Что такое pull request?",
          options: [
            "Запрос на удаление кода",
            "Запрос на добавление изменений",
            "Запрос на создание ветки",
            "Запрос на откат изменений"
          ],
          correctAnswer: 1
        }
      ],
      2: [
        {
          question: "Что такое GitOps?",
          options: [
            "Методология управления инфраструктурой через Git",
            "Графический интерфейс Git",
            "Операционная система для Git",
            "Система контроля версий"
          ],
          correctAnswer: 0
        },
        {
          question: "Какой инструмент используется для GitOps?",
          options: [
            "Word",
            "Excel",
            "ArgoCD",
            "Photoshop"
          ],
          correctAnswer: 2
        },
        {
          question: "Что такое Infrastructure as Code?",
          options: [
            "Код для инфраструктуры",
            "Управление инфраструктурой через код",
            "Инфраструктура для кода",
            "Кодирование инфраструктуры"
          ],
          correctAnswer: 1
        },
        {
          question: "Какой инструмент НЕ используется для IaC?",
          options: [
            "Terraform",
            "Ansible",
            "Photoshop",
            "CloudFormation"
          ],
          correctAnswer: 2
        },
        {
          question: "Что такое state file в Terraform?",
          options: [
            "Файл состояния инфраструктуры",
            "Файл конфигурации",
            "Лог-файл",
            "Файл с переменными"
          ],
          correctAnswer: 0
        }
      ]
    },
    3: { // Модуль 3: Контейнеризация
      1: [
        {
          question: "Что такое Docker?",
          options: [
            "Система виртуализации",
            "Платформа для контейнеризации",
            "Операционная система",
            "База данных"
          ],
          correctAnswer: 1
        },
        {
          question: "Что такое Docker image?",
          options: [
            "Картинка Docker",
            "Шаблон для создания контейнера",
            "Графический интерфейс Docker",
            "Документация Docker"
          ],
          correctAnswer: 1
        },
        {
          question: "Для чего используется Dockerfile?",
          options: [
            "Для запуска контейнеров",
            "Для создания образов",
            "Для удаления контейнеров",
            "Для просмотра логов"
          ],
          correctAnswer: 1
        },
        {
          question: "Что такое Docker Hub?",
          options: [
            "Локальное хранилище образов",
            "Публичный реестр Docker образов",
            "Инструмент для создания контейнеров",
            "Система мониторинга Docker"
          ],
          correctAnswer: 1
        },
        {
          question: "Что такое Docker Compose?",
          options: [
            "Инструмент для работы с несколькими контейнерами",
            "Система сборки Docker",
            "Графический интерфейс Docker",
            "Система мониторинга Docker"
          ],
          correctAnswer: 0
        }
      ],
      2: [
        {
          question: "Что такое Kubernetes?",
          options: [
            "Система контейнеризации",
            "Платформа оркестрации контейнеров",
            "База данных",
            "Операционная система"
          ],
          correctAnswer: 1
        },
        {
          question: "Что такое Pod в Kubernetes?",
          options: [
            "Группа узлов",
            "Наименьшая единица развертывания",
            "Система хранения",
            "Сетевой протокол"
          ],
          correctAnswer: 1
        },
        {
          question: "Для чего используется Service в Kubernetes?",
          options: [
            "Для хранения данных",
            "Для доступа к подам",
            "Для мониторинга",
            "Для создания подов"
          ],
          correctAnswer: 1
        },
        {
          question: "Что такое Deployment в Kubernetes?",
          options: [
            "Развертывание приложения",
            "Удаление приложения",
            "Система мониторинга",
            "База данных"
          ],
          correctAnswer: 0
        },
        {
          question: "Для чего используется ConfigMap?",
          options: [
            "Для хранения конфигурации",
            "Для хранения секретов",
            "Для мониторинга",
            "Для логирования"
          ],
          correctAnswer: 0
        }
      ]
    },
    4: { // Модуль 4: CI/CD
      1: [
        {
          question: "Что такое CI?",
          options: [
            "Continuous Integration",
            "Computer Interface",
            "Control Interface",
            "Continuous Implementation"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое CD?",
          options: [
            "Continuous Deployment",
            "Control Development",
            "Computer Development",
            "Continuous Design"
          ],
          correctAnswer: 0
        },
        {
          question: "Для чего используется Jenkins?",
          options: [
            "Для автоматизации сборки и доставки",
            "Для разработки",
            "Для тестирования",
            "Для документации"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое pipeline?",
          options: [
            "Последовательность этапов CI/CD",
            "База данных",
            "Система контроля версий",
            "Система мониторинга"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое артефакт в CI/CD?",
          options: [
            "Результат сборки",
            "Ошибка в коде",
            "Система контроля версий",
            "Документация"
          ],
          correctAnswer: 0
        }
      ],
      2: [
        {
          question: "Что такое GitHub Actions?",
          options: [
            "Сервис CI/CD от GitHub",
            "Система контроля версий",
            "База данных",
            "Система мониторинга"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое workflow в GitHub Actions?",
          options: [
            "Последовательность действий",
            "База данных",
            "Система контроля версий",
            "Документация"
          ],
          correctAnswer: 0
        },
        {
          question: "Для чего используются secrets в GitHub Actions?",
          options: [
            "Для хранения секретных данных",
            "Для хранения кода",
            "Для хранения документации",
            "Для хранения логов"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое runner в GitHub Actions?",
          options: [
            "Сервер для выполнения workflow",
            "Система контроля версий",
            "База данных",
            "Система мониторинга"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое event в GitHub Actions?",
          options: [
            "Событие, запускающее workflow",
            "Система контроля версий",
            "База данных",
            "Система мониторинга"
          ],
          correctAnswer: 0
        }
      ]
    },
    5: { // Модуль 5: Мониторинг
      1: [
        {
          question: "Что такое Prometheus?",
          options: [
            "Система мониторинга",
            "База данных",
            "Система контроля версий",
            "Система логирования"
          ],
          correctAnswer: 0
        },
        {
          question: "Для чего используется Grafana?",
          options: [
            "Для визуализации метрик",
            "Для сбора метрик",
            "Для хранения метрик",
            "Для генерации метрик"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое алерт в Prometheus?",
          options: [
            "Оповещение о событии",
            "База данных",
            "Система контроля версий",
            "Система логирования"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое метрика?",
          options: [
            "Измеряемый показатель",
            "База данных",
            "Система контроля версий",
            "Система логирования"
          ],
          correctAnswer: 0
        },
        {
          question: "Для чего используется PromQL?",
          options: [
            "Для запросов к метрикам",
            "Для создания метрик",
            "Для хранения метрик",
            "Для визуализации метрик"
          ],
          correctAnswer: 0
        }
      ],
      2: [
        {
          question: "Что такое ELK Stack?",
          options: [
            "Стек для логирования",
            "База данных",
            "Система контроля версий",
            "Система мониторинга"
          ],
          correctAnswer: 0
        },
        {
          question: "Для чего используется Elasticsearch?",
          options: [
            "Для поиска и анализа логов",
            "Для сбора логов",
            "Для визуализации логов",
            "Для генерации логов"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое Logstash?",
          options: [
            "Инструмент для обработки логов",
            "База данных",
            "Система контроля версий",
            "Система мониторинга"
          ],
          correctAnswer: 0
        },
        {
          question: "Для чего используется Kibana?",
          options: [
            "Для визуализации логов",
            "Для сбора логов",
            "Для хранения логов",
            "Для генерации логов"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое индекс в Elasticsearch?",
          options: [
            "Коллекция документов",
            "База данных",
            "Система контроля версий",
            "Система мониторинга"
          ],
          correctAnswer: 0
        }
      ]
    },
    6: { // Модуль 6: Безопасность
      1: [
        {
          question: "Что такое DevSecOps?",
          options: [
            "Интеграция безопасности в DevOps",
            "Система безопасности",
            "База данных",
            "Система мониторинга"
          ],
          correctAnswer: 0
        },
        {
          question: "Для чего используется Vault?",
          options: [
            "Для управления секретами",
            "Для хранения кода",
            "Для хранения логов",
            "Для мониторинга"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое SAST?",
          options: [
            "Статический анализ безопасности",
            "Система мониторинга",
            "База данных",
            "Система логирования"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое DAST?",
          options: [
            "Динамический анализ безопасности",
            "Система мониторинга",
            "База данных",
            "Система логирования"
          ],
          correctAnswer: 0
        },
        {
          question: "Для чего используется Snyk?",
          options: [
            "Для поиска уязвимостей",
            "Для мониторинга",
            "Для логирования",
            "Для тестирования"
          ],
          correctAnswer: 0
        }
      ],
      2: [
        {
          question: "Что такое IAM?",
          options: [
            "Управление идентификацией и доступом",
            "Система мониторинга",
            "База данных",
            "Система логирования"
          ],
          correctAnswer: 0
        },
        {
          question: "Для чего используется SSL/TLS?",
          options: [
            "Для шифрования данных",
            "Для мониторинга",
            "Для логирования",
            "Для тестирования"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое WAF?",
          options: [
            "Web Application Firewall",
            "Web Application Framework",
            "Web Access Filter",
            "Web Authentication Framework"
          ],
          correctAnswer: 0
        },
        {
          question: "Для чего используется OAuth?",
          options: [
            "Для авторизации",
            "Для мониторинга",
            "Для логирования",
            "Для тестирования"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое RBAC?",
          options: [
            "Role-Based Access Control",
            "Remote Backend Access Control",
            "Runtime Backend Access Control",
            "Remote Basic Access Control"
          ],
          correctAnswer: 0
        }
      ]
    },
    7: { // Модуль 7: Облачные платформы
      1: [
        {
          question: "Что такое облачные вычисления?",
          options: [
            "Предоставление вычислительных ресурсов через интернет",
            "Локальные вычисления",
            "Система мониторинга",
            "База данных"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое IaaS?",
          options: [
            "Infrastructure as a Service",
            "Internet as a Service",
            "Integration as a Service",
            "Interface as a Service"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое PaaS?",
          options: [
            "Platform as a Service",
            "Programming as a Service",
            "Process as a Service",
            "Protocol as a Service"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое SaaS?",
          options: [
            "Software as a Service",
            "System as a Service",
            "Storage as a Service",
            "Security as a Service"
          ],
          correctAnswer: 0
        },
        {
          question: "Какой сервис НЕ является облачным провайдером?",
          options: [
            "Microsoft Word",
            "AWS",
            "Azure",
            "Google Cloud"
          ],
          correctAnswer: 0
        }
      ],
      2: [
        {
          question: "Что такое AWS?",
          options: [
            "Amazon Web Services",
            "Automated Web System",
            "Advanced Web Services",
            "Application Web Services"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое EC2?",
          options: [
            "Elastic Compute Cloud",
            "Electronic Computer Control",
            "Enterprise Cloud Computing",
            "Enhanced Cloud Control"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое S3?",
          options: [
            "Simple Storage Service",
            "Secure Storage System",
            "System Storage Service",
            "Standard Storage Solution"
          ],
          correctAnswer: 0
        },
        {
          question: "Для чего используется CloudFormation?",
          options: [
            "Для управления инфраструктурой как кодом",
            "Для хранения данных",
            "Для мониторинга",
            "Для тестирования"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое VPC?",
          options: [
            "Virtual Private Cloud",
            "Virtual Protocol Control",
            "Virtual Process Control",
            "Virtual Platform Cloud"
          ],
          correctAnswer: 0
        }
      ]
    },
    8: { // Модуль 8: Оркестрация
      1: [
        {
          question: "Что такое Ansible?",
          options: [
            "Инструмент для автоматизации",
            "База данных",
            "Система мониторинга",
            "Система логирования"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое playbook в Ansible?",
          options: [
            "Файл с инструкциями",
            "База данных",
            "Система мониторинга",
            "Система логирования"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое inventory в Ansible?",
          options: [
            "Список хостов",
            "База данных",
            "Система мониторинга",
            "Система логирования"
          ],
          correctAnswer: 0
        },
        {
          question: "Для чего используются роли в Ansible?",
          options: [
            "Для организации playbook",
            "Для хранения данных",
            "Для мониторинга",
            "Для логирования"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое handler в Ansible?",
          options: [
            "Обработчик событий",
            "База данных",
            "Система мониторинга",
            "Система логирования"
          ],
          correctAnswer: 0
        }
      ],
      2: [
        {
          question: "Что такое Terraform?",
          options: [
            "Инструмент для IaC",
            "База данных",
            "Система мониторинга",
            "Система логирования"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое provider в Terraform?",
          options: [
            "Плагин для работы с облачным провайдером",
            "База данных",
            "Система мониторинга",
            "Система логирования"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое resource в Terraform?",
          options: [
            "Объект инфраструктуры",
            "База данных",
            "Система мониторинга",
            "Система логирования"
          ],
          correctAnswer: 0
        },
        {
          question: "Для чего используется state в Terraform?",
          options: [
            "Для отслеживания состояния инфраструктуры",
            "Для хранения данных",
            "Для мониторинга",
            "Для логирования"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое module в Terraform?",
          options: [
            "Переиспользуемый код",
            "База данных",
            "Система мониторинга",
            "Система логирования"
          ],
          correctAnswer: 0
        }
      ]
    },
    9: { // Модуль 9: Финальный проект
      1: [
        {
          question: "Что включает в себя DevOps проект?",
          options: [
            "Все аспекты DevOps практик",
            "Только разработку",
            "Только эксплуатацию",
            "Только тестирование"
          ],
          correctAnswer: 0
        },
        {
          question: "Какие метрики важны для DevOps проекта?",
          options: [
            "Время развертывания, качество кода, отказоустойчивость",
            "Только время разработки",
            "Только количество ошибок",
            "Только стоимость разработки"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое MVP в контексте DevOps?",
          options: [
            "Минимально жизнеспособный продукт",
            "Максимально важный проект",
            "Минимальная версия программы",
            "Максимальная версия продукта"
          ],
          correctAnswer: 0
        },
        {
          question: "Как организовать документацию DevOps проекта?",
          options: [
            "В виде живой документации в Git",
            "В бумажном виде",
            "Не вести документацию",
            "Только в виде комментариев в коде"
          ],
          correctAnswer: 0
        },
        {
          question: "Что такое post-mortem в DevOps?",
          options: [
            "Анализ инцидентов после их возникновения",
            "Тестирование после релиза",
            "Документация после проекта",
            "Отчет о закрытии проекта"
          ],
          correctAnswer: 0
        }
      ],
      2: [
        {
          question: "Какие сертификации актуальны для DevOps инженера?",
          options: [
            "AWS DevOps Engineer, Kubernetes CKA, Docker DCA",
            "Только AWS сертификации",
            "Только Docker сертификации",
            "Сертификации не важны"
          ],
          correctAnswer: 0
        },
        {
          question: "Как подготовиться к DevOps сертификации?",
          options: [
            "Практика, изучение документации, пробные экзамены",
            "Только чтение книг",
            "Только просмотр видео",
            "Только работа над проектами"
          ],
          correctAnswer: 0
        },
        {
          question: "Что важно включить в DevOps портфолио?",
          options: [
            "Проекты с CI/CD, IaC, мониторингом",
            "Только проекты по разработке",
            "Только проекты по эксплуатации",
            "Только сертификаты"
          ],
          correctAnswer: 0
        },
        {
          question: "Как развиваться дальше в DevOps?",
          options: [
            "Изучать новые технологии, участвовать в open source",
            "Остановиться на текущем уровне",
            "Сфокусироваться только на одной технологии",
            "Перейти в другую область"
          ],
          correctAnswer: 0
        },
        {
          question: "Какие soft skills важны для DevOps инженера?",
          options: [
            "Коммуникация, работа в команде, решение проблем",
            "Только технические навыки",
            "Только управленческие навыки",
            "Soft skills не важны"
          ],
          correctAnswer: 0
        }
      ]
    }
  };

  return moduleQuestions[moduleIndex]?.[topicIndex] || [
    {
      question: "Что такое DevOps?",
      options: [
        "Методология разработки",
        "Язык программирования",
        "База данных",
        "Операционная система"
      ],
      correctAnswer: 0
    },
    {
      question: "Какие инструменты используются в DevOps?",
      options: [
        "Git, Jenkins, Docker",
        "Word, Excel, PowerPoint",
        "Photoshop, Illustrator",
        "Windows, Linux"
      ],
      correctAnswer: 0
    },
    {
      question: "Что такое CI/CD?",
      options: [
        "Непрерывная интеграция и доставка",
        "Компьютерный интерфейс",
        "Контроль изменений",
        "Центр информации"
      ],
      correctAnswer: 0
    },
    {
      question: "Для чего нужен мониторинг?",
      options: [
        "Для отслеживания состояния системы",
        "Для разработки",
        "Для тестирования",
        "Для документации"
      ],
      correctAnswer: 0
    },
    {
      question: "Что такое Infrastructure as Code?",
      options: [
        "Управление инфраструктурой через код",
        "Код для инфраструктуры",
        "Инфраструктура для кода",
        "Кодирование инфраструктуры"
      ],
      correctAnswer: 0
    }
  ];
};

export const LessonTest = ({ open, onOpenChange }: LessonTestProps) => {
  const { lessonId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Определяем, является ли это уроком DevOps
  const isDevOpsLesson = lessonId?.startsWith('devops-');
  
  let questions: Question[] = [];
  
  if (isDevOpsLesson) {
    const [, moduleIndex, topicIndex] = (lessonId || "").split("-").map(Number);
    questions = getDevOpsQuestions(moduleIndex, topicIndex);
  } else {
    questions = [
      {
        question: "Какой редактор кода рекомендуется для начинающих Python разработчиков?",
        options: [
          "VS Code",
          "Блокнот Windows",
          "Notepad++",
          "Word"
        ],
        correctAnswer: 0
      },
      {
        question: "Какое расширение необходимо установить в VS Code для работы с Python?",
        options: [
          "JavaScript",
          "Python",
          "Java",
          "C++"
        ],
        correctAnswer: 1
      },
      {
        question: "Какая среда разработки является специализированной для Python?",
        options: [
          "VS Code",
          "Sublime Text",
          "PyCharm",
          "Atom"
        ],
        correctAnswer: 2
      }
    ];
  }

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[500px] p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>
            {showScore ? "Результаты теста" : "Тест по теме урока"}
          </DialogTitle>
        </DialogHeader>
        
        {showScore ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center p-4 sm:p-6"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4">
              Ваш результат: {Math.round((score / questions.length) * 10)}/10
            </h3>
            <Button onClick={handleReset}>Закрыть</Button>
          </motion.div>
        ) : (
          <div className="p-2 sm:p-4">
            <h3 className="text-base sm:text-lg font-semibold mb-4">
              Вопрос {currentQuestion + 1} из {questions.length}
            </h3>
            <p className="mb-4 text-sm sm:text-base">{questions[currentQuestion].question}</p>
            <div className="space-y-2">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className="w-full justify-start text-sm sm:text-base py-2 px-3 sm:px-4"
                  onClick={() => handleAnswer(index)}
                >
                  {option}
                </Button>
              ))}
            </div>
            <div className="mt-4 sm:mt-6 flex justify-end">
              <Button
                onClick={handleNext}
                disabled={selectedAnswer === null}
              >
                {currentQuestion === questions.length - 1 ? "Завершить" : "Далее"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};