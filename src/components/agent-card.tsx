import Image from 'next/image';
import Link from 'next/link';
import type { Agent } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Briefcase } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <Card className="group overflow-hidden shadow-lg flex flex-col h-full rounded-lg text-center items-center transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl">
      <CardHeader className="p-6">
        <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-accent shadow-md">
          <Image
            src={agent.image}
            alt={agent.name}
            fill
            sizes="128px"
            className="object-cover"
            data-ai-hint={agent.dataAiHint || 'professional portrait'}
          />
        </div>
        <CardTitle className="text-2xl font-semibold text-primary">
          {agent.name}
        </CardTitle>
        <p className="text-sm text-accent font-medium">{agent.title}</p>
      </CardHeader>
      <CardContent className="px-6 pb-4 flex-grow">
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {agent.expertise.slice(0, 3).map((area) => (
            <Badge key={area} variant="secondary" className="text-xs">
              {area}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {agent.bio}
        </p>
        <div className="space-y-1 text-sm text-muted-foreground">
          <Link href={`mailto:${agent.email}`} className="flex items-center justify-center hover:text-primary transition-colors">
            <Mail className="w-4 h-4 mr-2" /> {agent.email}
          </Link>
          <Link href={`tel:${agent.phone}`} className="flex items-center justify-center hover:text-primary transition-colors">
            <Phone className="w-4 h-4 mr-2" /> {agent.phone}
          </Link>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 w-full">
        <Button asChild variant="outline" className="w-full">
          {/* This could link to an individual agent page if one exists, or just be a contact button */}
          <Link href={`mailto:${agent.email}?subject=Inquiry for ${agent.name}`}>Contact Agent</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
