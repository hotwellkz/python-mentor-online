import { formatMessage } from "@/utils/messageFormatter";

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
}

export const MessageBubble = ({ role, content }: MessageBubbleProps) => {
  return (
    <div
      className={`p-4 rounded-lg ${
        role === 'user'
          ? 'bg-[#333333] text-gray-100 ml-8'
          : 'bg-[#F6F6F7] dark:bg-[#222222] mr-8'
      }`}
    >
      {role === 'assistant' ? (
        <div 
          className="prose prose-sm dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: formatMessage(content) }}
        />
      ) : (
        <p className="text-gray-100">{content}</p>
      )}
    </div>
  );
};