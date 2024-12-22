export const formatMessage = (content: string | undefined) => {
  if (!content) return '';
  
  return content
    .split('\n\n')
    .map((paragraph, index) => {
      // Headers
      if (paragraph.startsWith('#')) {
        return `<h3 class="text-xl font-semibold my-4">${paragraph.replace(/^#+\s/, '')}</h3>`;
      }
      
      // Bullet lists
      if (paragraph.includes('\n- ')) {
        const items = paragraph.split('\n- ').filter(Boolean);
        return `<ul class="list-disc pl-6 my-4 space-y-2">
          ${items.map(item => `<li>${item}</li>`).join('')}
        </ul>`;
      }

      // Numbered lists
      if (paragraph.match(/^\d+\./)) {
        const items = paragraph.split('\n').filter(Boolean);
        return `<ol class="list-decimal pl-6 my-4 space-y-2">
          ${items.map(item => `<li>${item.replace(/^\d+\.\s/, '')}</li>`).join('')}
        </ol>`;
      }

      // Code blocks
      if (paragraph.includes('```')) {
        return paragraph
          .replace(/```(.*?)```/gs, (_, code) => 
            `<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto"><code>${code.trim()}</code></pre>`
          );
      }

      // Regular paragraphs
      return `<p class="my-4">${paragraph}</p>`;
    })
    .join('');
};