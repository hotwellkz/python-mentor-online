export const cleanText = (text: string) => {
  return text
    .replace(/#{1,6}\s(.*?)(?:\n|$)/g, (_, title) => `<h3 class="text-xl font-semibold my-4">${title}</h3>`)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/```(.*?)```/gs, (_, code) => `<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto"><code>${code}</code></pre>`)
    .replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">$1</code>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
    .replace(/^\s*[-*+]\s+(.*?)(?:\n|$)/gm, '<li class="ml-4">$1</li>')
    .replace(/^\s*\d+\.\s+(.*?)(?:\n|$)/gm, '<li class="ml-4">$1</li>')
    .replace(/(<li.*?>.*?<\/li>)\n(<li.*?>.*?<\/li>)/gs, '<ul class="list-disc my-4">$1$2</ul>')
    .split('\n\n')
    .map(paragraph => {
      if (!paragraph.trim()) return '';
      if (paragraph.startsWith('<')) return paragraph;
      return `<p class="my-4">${paragraph}</p>`;
    })
    .join('\n')
    .trim();
};