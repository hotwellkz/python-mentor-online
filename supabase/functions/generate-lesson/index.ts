import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const cleanText = (text: string) => {
  return text
    // Convert headers to HTML
    .replace(/#{1,6}\s(.*?)(?:\n|$)/g, (_, title) => `<h3 class="text-xl font-semibold my-4">${title}</h3>`)
    // Convert bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Convert italic text
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Convert code blocks with syntax highlighting
    .replace(/```(.*?)```/gs, (_, code) => `<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto"><code>${code}</code></pre>`)
    // Convert inline code
    .replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">$1</code>')
    // Convert links
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
    // Convert bullet points
    .replace(/^\s*[-*+]\s+(.*?)(?:\n|$)/gm, '<li class="ml-4">$1</li>')
    // Convert numbered lists
    .replace(/^\s*\d+\.\s+(.*?)(?:\n|$)/gm, '<li class="ml-4">$1</li>')
    // Wrap consecutive list items in ul/ol
    .replace(/(<li.*?>.*?<\/li>)\n(<li.*?>.*?<\/li>)/gs, '<ul class="list-disc my-4">$1$2</ul>')
    // Convert paragraphs (text blocks separated by blank lines)
    .split('\n\n')
    .map(paragraph => {
      if (!paragraph.trim()) return '';
      if (paragraph.startsWith('<')) return paragraph;
      return `<p class="my-4">${paragraph}</p>`;
    })
    .join('\n')
    .trim();
};

const getDevOpsLessonPrompt = (lessonId: string) => {
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

  return `Расскажи подробно как будто ты преподаватель и преподаешь курс DevOps-инженер PRO, урок из модуля "${module.title}" на тему: "${topic}". Используй много практических примеров и объясняй сложные концепции простым языком. Добавь примеры кода или команд где это уместно.`;
};

serve(async (req) => {
  console.log('Function called with method:', req.method);
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { lessonId, prompt } = await req.json();
    console.log('Generating lesson for:', lessonId, 'with prompt:', prompt);

    if (!openAIApiKey) {
      console.error('OpenAI API key not found');
      throw new Error('OpenAI API key not configured');
    }

    let messages = [];
    if (prompt) {
      messages = [
        {
          role: 'system',
          content: 'Вы - опытный преподаватель DevOps и Python. Ваша задача - подробно и понятно отвечать на вопросы ученика, используя примеры кода и команд где это уместно. Отвечайте четко и по существу. Используйте маркдаун для форматирования текста: заголовки через #, жирный текст через **, курсив через *, блоки кода через ```, списки через - или 1., 2. и т.д.'
        },
        { role: 'user', content: prompt }
      ];
    } else if (lessonId?.startsWith('devops-')) {
      const devOpsPrompt = getDevOpsLessonPrompt(lessonId);
      messages = [
        {
          role: 'system',
          content: 'Вы - опытный преподаватель DevOps. Ваша задача - подробно объяснить тему урока, используя примеры и понятные объяснения. Используйте маркдаун для форматирования текста: заголовки через #, жирный текст через **, курсив через *, блоки кода через ```, списки через - или 1., 2. и т.д.'
        },
        { role: 'user', content: devOpsPrompt }
      ];
    } else {
      messages = [
        {
          role: 'system',
          content: 'Вы - опытный преподаватель Python. Ваша задача - подробно объяснить тему урока, используя примеры и понятные объяснения. Используйте маркдаун для форматирования текста: заголовки через #, жирный текст через **, курсив через *, блоки кода через ```, списки через - или 1., 2. и т.д.'
        },
        {
          role: 'user',
          content: 'Расскажи подробно как будто ты преподаватель и преподаешь Курс Python урок на тему: "Настройка редактора кода Установка и настройка редакторов: VS Code, PyCharm, Jupyter Notebook." Используй много примеров.'
        }
      ];
    }

    console.log('Making request to OpenAI API...');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: messages,
        max_tokens: 2500,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, response.statusText);
      throw new Error('Error calling OpenAI API');
    }

    const data = await response.json();
    console.log('OpenAI response received');
    
    const generatedText = data.choices[0].message.content;
    const cleanedText = cleanText(generatedText);

    return new Response(JSON.stringify({ 
      text: cleanedText 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-lesson function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});