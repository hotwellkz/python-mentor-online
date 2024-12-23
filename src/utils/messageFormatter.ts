export const formatMessage = (content: string | undefined) => {
  if (!content) return '';
  
  return content
    // Headers (##, ###)
    .replace(/#{2,3}\s(.*?)(?:\n|$)/g, (_, title) => 
      `<h3 class="text-xl font-bold text-[#222222] dark:text-gray-200 mb-4">${title}</h3>`)
    
    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#333333] dark:text-gray-100">$1</strong>')
    
    // Italic text
    .replace(/\*(.*?)\*/g, '<em class="text-[#555555] dark:text-gray-300">$1</em>')
    
    // Code blocks
    .replace(/```(.*?)```/gs, (_, code) => 
      `<pre class="bg-[#F1F1F1] dark:bg-[#222222] p-4 rounded-lg my-4 font-mono text-sm overflow-x-auto">${code.trim()}</pre>`)
    
    // Inline code
    .replace(/`(.*?)`/g, 
      '<code class="bg-[#F1F1F1] dark:bg-[#222222] px-2 py-1 rounded font-mono text-sm">$1</code>')
    
    // Lists
    .replace(/^\s*[-*+]\s+(.*?)(?:\n|$)/gm, 
      '<li class="ml-4 mb-2 text-[#333333] dark:text-gray-200">$1</li>')
    .replace(/(<li.*?>.*?<\/li>)\n(<li.*?>.*?<\/li>)/gs, 
      '<ul class="list-disc my-4 space-y-2">$1$2</ul>')
    
    // Numbered lists
    .replace(/^\s*\d+\.\s+(.*?)(?:\n|$)/gm, 
      '<li class="ml-4 mb-2 text-[#333333] dark:text-gray-200">$1</li>')
    .replace(/(<li.*?>.*?<\/li>)\n(<li.*?>.*?<\/li>)/gs, 
      '<ol class="list-decimal my-4 space-y-2">$1$2</ol>')
    
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/g, 
      '<a href="$2" class="text-[#555555] hover:text-[#222222] dark:text-gray-300 dark:hover:text-gray-100 underline" target="_blank" rel="noopener noreferrer">$1</a>')
    
    // Paragraphs
    .split('\n\n')
    .map(paragraph => {
      if (!paragraph.trim()) return '';
      if (paragraph.startsWith('<')) return paragraph;
      return `<p class="text-[#333333] dark:text-gray-200 leading-relaxed mb-4">${paragraph}</p>`;
    })
    .join('\n');
};