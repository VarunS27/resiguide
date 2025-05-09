import Image from 'next/image';
import Link from 'next/link';
import { DUMMY_BLOG_POSTS } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CalendarDays, UserCircle, Tag } from 'lucide-react';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { SocialLinks } from '@/components/social-links'; // Assuming this component can be used for sharing

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = DUMMY_BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-background">
      <PageHeader
        title={post.title}
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
        actions={
          <Button variant="outline" asChild>
            <Link href="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog</Link>
          </Button>
        }
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <article className="bg-card p-6 sm:p-8 md:p-10 rounded-lg shadow-xl">
          {post.image && (
            <div className="relative aspect-video mb-8 rounded-md overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                data-ai-hint={post.dataAiHint || 'blog detail image'}
                priority
              />
            </div>
          )}

          <div className="flex flex-wrap gap-x-6 gap-y-3 items-center mb-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CalendarDays className="w-4 h-4 mr-2 text-primary" />
              <span>Published on {format(new Date(post.date), 'MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center">
              <UserCircle className="w-4 h-4 mr-2 text-primary" />
              <span>By {post.author}</span>
            </div>
          </div>

          <div
            className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} 
            // In a real app, sanitize HTML or use Markdown parser
          />

          {post.tags && post.tags.length > 0 && (
            <>
              <Separator className="my-8" />
              <div className="flex items-center flex-wrap gap-2">
                <Tag className="w-5 h-5 text-primary mr-1" />
                <span className="font-medium text-primary">Tags:</span>
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </>
          )}
          
          <Separator className="my-8" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm font-medium text-primary">Share this post:</p>
            <SocialLinks /> 
          </div>
        </article>
      </div>
    </div>
  );
}
