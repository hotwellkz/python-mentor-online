import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('Starting to update DevOps prompts...');

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    for (let moduleIndex = 0; moduleIndex < modules.length; moduleIndex++) {
      const module = modules[moduleIndex];
      
      for (let topicIndex = 0; topicIndex < module.topics.length; topicIndex++) {
        const lessonId = `devops-${moduleIndex + 1}-${topicIndex + 1}`;
        const topic = module.topics[topicIndex];
        
        const prompt = `Расскажи подробно с примерами, как будто ты преподаватель и преподаеш курс под названием "DevOps-инженер PRO" урок на тему: "${topic}", подтемы: "${module.topics.join(', ')}"`;
        
        console.log(`Updating prompt for lesson ${lessonId}`);
        
        const { error } = await supabaseClient
          .from('lesson_prompts')
          .upsert(
            {
              lesson_id: lessonId,
              prompt: prompt,
              updated_at: new Date().toISOString()
            },
            { onConflict: 'lesson_id' }
          );

        if (error) {
          console.error(`Error updating prompt for lesson ${lessonId}:`, error);
          throw error;
        }
      }
    }

    console.log('Successfully updated all DevOps prompts');

    return new Response(
      JSON.stringify({ success: true, message: 'All DevOps prompts updated successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in update-devops-prompts:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});