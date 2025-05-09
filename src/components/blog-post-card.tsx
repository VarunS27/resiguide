
import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, UserCircle, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="group overflow-hidden shadow-lg flex flex-col h-full rounded-lg transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl animate-fade-in-up">
      {post.image && (
        <CardHeader className="p-0 relative">
          <Link href={`/blog/${post.slug}`} className="block aspect-video overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={post.dataAiHint || 'blog post image'}
            />
          </Link>
        </CardHeader>
      )}
      <CardContent className={`p-4 sm:p-6 flex-grow ${!post.image ? 'pt-6' : ''}`}>
        <div className="mb-3 flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
          <span className="flex items-center">
            <CalendarDays className="w-3.5 h-3.5 mr-1.5" />
            {format(new Date(post.date), 'MMMM d, yyyy')}
          </span>
          <span className="flex items-center">
            <UserCircle className="w-3.5 h-3.5 mr-1.5" />
            {post.author}
          </span>
        </div>
        <CardTitle className="text-lg sm:text-xl font-semibold mb-3 leading-snug">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {post.excerpt}
        </p>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {post.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-0.5">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 sm:p-6 pt-0">
        <Button asChild variant="link" className="p-0 h-auto text-primary group/readmore text-sm">
          <Link href={`/blog/${post.slug}`}>
            Read More 
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover/readmore:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

