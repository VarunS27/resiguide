
import Image from 'next/image';
import Link from 'next/link';
import type { Agent } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone } from 'lucide-react'; // Removed Briefcase as it wasn't used

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <Card className="group overflow-hidden shadow-lg flex flex-col h-full rounded-lg text-center items-center transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl animate-fade-in-up">
      <CardHeader className="p-6 w-full">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-accent shadow-md transition-transform duration-300 group-hover:scale-110">
          <Image
            src={agent.image}
            alt={agent.name}
            fill
            sizes="(max-width: 640px) 96px, 128px"
            className="object-cover"
            data-ai-hint={agent.dataAiHint || 'professional portrait'}
          />
        </div>
        <CardTitle className="text-xl sm:text-2xl font-semibold text-primary">
          {agent.name}
        </CardTitle>
        <p className="text-xs sm:text-sm text-accent font-medium">{agent.title}</p>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-4 flex-grow w-full">
        <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-4">
          {agent.expertise.slice(0, 3).map((area) => (
            <Badge key={area} variant="secondary" className="text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-0.5">
              {area}
            </Badge>
          ))}
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 mb-4">
          {agent.bio}
        </p>
        <div className="space-y-1 text-xs sm:text-sm text-muted-foreground">
          <Link href={`mailto:${agent.email}`} className="flex items-center justify-center hover:text-primary transition-colors group/contactlink">
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 transition-transform duration-300 group-hover/contactlink:scale-110" /> <span className="truncate">{agent.email}</span>
          </Link>
          <Link href={`tel:${agent.phone}`} className="flex items-center justify-center hover:text-primary transition-colors group/contactlink">
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 transition-transform duration-300 group-hover/contactlink:scale-110" /> <span className="truncate">{agent.phone}</span>
          </Link>
        </div>
      </CardContent>
      <CardFooter className="p-4 sm:p-6 pt-0 w-full">
        <Button asChild variant="outline" className="w-full text-xs sm:text-sm">
          <Link href={`mailto:${agent.email}?subject=Inquiry for ${agent.name}`}>Contact Agent</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

