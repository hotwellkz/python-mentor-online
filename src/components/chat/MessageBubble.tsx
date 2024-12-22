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
          ? 'bg-primary text-primary-foreground ml-8'
          : 'bg-gray-50 dark:bg-gray-900 mr-8'
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