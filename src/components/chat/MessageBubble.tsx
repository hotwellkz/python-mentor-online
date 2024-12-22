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
          : 'bg-muted mr-8'
      }`}
    >
      {role === 'assistant' ? (
        <div 
          className="prose prose-sm dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: formatMessage(content) }}
        />
      ) : (
        content
      )}
    </div>
  );
};