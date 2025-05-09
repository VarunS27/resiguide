import Image from 'next/image';
import Link from 'next/link';
import type { Agent } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone } from 'lucide-react';

interface AgentCardSmallProps {
  agent: Agent;
}

export function AgentCardSmall({ agent }: AgentCardSmallProps) {
  return (
    <Card className="shadow-xl rounded-lg">
      <CardHeader>
        <CardTitle className="text-xl text-primary">Listing Agent</CardTitle>
      </CardHeader>
      <CardContent className="flex items-start space-x-4">
        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-accent flex-shrink-0">
          <Image
            src={agent.image}
            alt={agent.name}
            fill
            sizes="80px"
            className="object-cover"
            data-ai-hint={agent.dataAiHint || 'agent portrait'}
          />
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-primary">{agent.name}</h3>
          <p className="text-sm text-muted-foreground">{agent.title}</p>
          <div className="mt-2 space-y-1">
            <Link href={`mailto:${agent.email}`} className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-4 h-4 mr-2" /> {agent.email}
            </Link>
            <Link href={`tel:${agent.phone}`} className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
              <Phone className="w-4 h-4 mr-2" /> {agent.phone}
            </Link>
          </div>
          <Button variant="outline" size="sm" className="mt-3 w-full" asChild>
             <Link href={`mailto:${agent.email}?subject=Inquiry for property`}>Contact Agent</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
