import { DUMMY_BLOG_POSTS } from '@/lib/constants';
import { BlogPostCard } from '@/components/blog-post-card';
import { PageHeader } from '@/components/ui/page-header';

export default function BlogPage() {
  return (
    <div className="bg-background min-h-screen">
       <PageHeader
        title="ResiGuide Blog"
        description="Stay updated with the latest news, tips, and insights from the world of real estate."
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: 'Blog' },
        ]}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {DUMMY_BLOG_POSTS.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DUMMY_BLOG_POSTS.map((post, index) => (
              <div 
                key={post.slug}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <BlogPostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg animate-fade-in">
            No blog posts available at the moment. Please check back soon.
          </p>
        )}
      </div>
    </div>
  );
}
