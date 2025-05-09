import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { AIChatWidget } from '@/components/ai-chat-widget';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <AIChatWidget />
    </div>
  );
}
