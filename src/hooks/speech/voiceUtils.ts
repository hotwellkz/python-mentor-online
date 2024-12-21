export const getMaleVoice = () => {
  const voices = window.speechSynthesis.getVoices();
  const russianMaleVoice = voices.find(voice => 
    voice.lang.startsWith('ru') && voice.name.toLowerCase().includes('male')
  );
  const russianVoice = voices.find(voice => voice.lang.startsWith('ru'));
  const maleVoice = voices.find(voice => 
    voice.name.toLowerCase().includes('male')
  );
  return russianMaleVoice || russianVoice || maleVoice || voices[0];
};

export const cleanMarkdown = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/#{1,6}\s/g, '')
    .replace(/`(.*?)`/g, '$1')
    .replace(/<[^>]*>/g, '')
    .replace(/\n\s*[-*+]\s/g, '\n')
    .replace(/\n\s*\d+\.\s/g, '\n')
    .replace(/\n{2,}/g, '\n')
    .trim();
};