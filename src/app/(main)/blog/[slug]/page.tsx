
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
import { SocialLinks } from '@/components/social-links'; 

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
          <Button variant="outline" asChild className="animate-fade-in animation-delay-100">
            <Link href="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog</Link>
          </Button>
        }
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-4xl">
        <article className="bg-card p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg shadow-xl animate-fade-in-up animation-delay-200">
          {post.image && (
            <div className="relative aspect-video mb-6 sm:mb-8 rounded-md overflow-hidden animate-pop-in animation-delay-300">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                data-ai-hint={post.dataAiHint || 'blog detail image'}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 896px"
              />
            </div>
          )}

          <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3 items-center mb-4 sm:mb-6 text-xs sm:text-sm text-muted-foreground animate-fade-in-down animation-delay-400">
            <div className="flex items-center">
              <CalendarDays className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-primary" />
              <span>Published on {format(new Date(post.date), 'MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center">
              <UserCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-primary" />
              <span>By {post.author}</span>
            </div>
          </div>

          <div
            className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none text-foreground/90 leading-relaxed animate-fade-in-up animation-delay-500"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} 
          />

          {post.tags && post.tags.length > 0 && (
            <>
              <Separator className="my-6 sm:my-8 animate-fade-in animation-delay-600" />
              <div className="flex items-center flex-wrap gap-2 animate-fade-in-up animation-delay-700">
                <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-1" />
                <span className="font-medium text-primary text-sm sm:text-base">Tags:</span>
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-0.5">
                    {tag}
                  </Badge>
                ))}
              </div>
            </>
          )}
          
          <Separator className="my-6 sm:my-8 animate-fade-in animation-delay-800" />
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 animate-fade-in-up animation-delay-900">
            <p className="text-sm font-medium text-primary">Share this post:</p>
            <SocialLinks /> 
          </div>
        </article>
      </div>
    </div>
  );
}

