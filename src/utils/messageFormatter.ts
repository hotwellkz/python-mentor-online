export const formatMessage = (content: string | undefined) => {
  if (!content) return '';
  
  return content
    // Headers (##, ###)
    .replace(/#{2,3}\s(.*?)(?:\n|$)/g, (_, title) => 
      `<h3 class="text-xl font-bold text-primary mb-4">${title}</h3>`)
    
    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-primary">$1</strong>')
    
    // Italic text
    .replace(/\*(.*?)\*/g, '<em class="text-gray-700 dark:text-gray-300">$1</em>')
    
    // Code blocks
    .replace(/```(.*?)```/gs, (_, code) => 
      `<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 font-mono text-sm overflow-x-auto">${code.trim()}</pre>`)
    
    // Inline code
    .replace(/`(.*?)`/g, 
      '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono text-sm">$1</code>')
    
    // Lists
    .replace(/^\s*[-*+]\s+(.*?)(?:\n|$)/gm, 
      '<li class="ml-4 mb-2 text-gray-800 dark:text-gray-200">$1</li>')
    .replace(/(<li.*?>.*?<\/li>)\n(<li.*?>.*?<\/li>)/gs, 
      '<ul class="list-disc my-4 space-y-2">$1$2</ul>')
    
    // Numbered lists
    .replace(/^\s*\d+\.\s+(.*?)(?:\n|$)/gm, 
      '<li class="ml-4 mb-2 text-gray-800 dark:text-gray-200">$1</li>')
    .replace(/(<li.*?>.*?<\/li>)\n(<li.*?>.*?<\/li>)/gs, 
      '<ol class="list-decimal my-4 space-y-2">$1$2</ol>')
    
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/g, 
      '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
    
    // Paragraphs
    .split('\n\n')
    .map(paragraph => {
      if (!paragraph.trim()) return '';
      if (paragraph.startsWith('<')) return paragraph;
      return `<p class="text-gray-800 dark:text-gray-200 leading-relaxed mb-4">${paragraph}</p>`;
    })
    .join('\n');
};