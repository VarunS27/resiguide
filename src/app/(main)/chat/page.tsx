import { ChatInterface } from '@/components/chat-interface';
import { PageHeader } from '@/components/ui/page-header';

export default function ChatPage() {
  return (
    <div className="bg-background min-h-screen">
      <PageHeader
        title="AI Chatbot Assistant"
        description="Ask our AI assistant your real estate questions and get instant answers."
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: 'AI Assistant' },
        ]}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ChatInterface />
      </div>
    </div>
  );
}
