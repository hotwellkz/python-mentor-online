interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface MessageListProps {
  messages: Message[];
}

export const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4 h-[500px] overflow-y-auto">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`mb-4 ${
            msg.role === 'user' ? 'text-right' : 'text-left'
          }`}
        >
          <div
            className={`inline-block p-3 rounded-lg ${
              msg.role === 'user'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  );
};