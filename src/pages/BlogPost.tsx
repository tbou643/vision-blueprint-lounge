import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navigation from "@/components/Navigation";
import SiteFooter from "@/components/SiteFooter";
import SEO from "@/components/SEO";
import { blogPosts } from "@/data/blogPosts";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <SEO
          title="Post not found — NullPunkt Solar"
          description="The blog post you were looking for is not available."
          path={`/blog/${id ?? ""}`}
        />
        <Navigation />
        <div className="pt-32 pb-32">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-light text-architectural mb-8">
                Post Not Found
              </h1>
              <Link 
                to="/blog" 
                className="text-minimal text-foreground hover:text-muted-foreground transition-colors duration-300"
              >
                ← BACK TO BLOG
              </Link>
            </div>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    datePublished: post.date,
    image: post.image,
    mainEntityOfPage: `https://nullpunkt.ca/blog/${post.id}`,
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${post.title} — NullPunkt Solar`}
        description={post.excerpt.slice(0, 158)}
        path={`/blog/${post.id}`}
        jsonLd={articleJsonLd}
      />
      <Navigation />
      
      {/* Article Header */}
      <article className="pt-32 pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Back Link */}
            <Link 
              to="/blog" 
              className="inline-block text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300 mb-12"
            >
              ← BACK TO BLOG
            </Link>
            
            {/* Article Meta */}
            <div className="mb-8">
              <div className="flex items-center text-minimal text-muted-foreground space-x-4 mb-6">
                <span className="bg-muted px-3 py-1 text-foreground">{post.category}</span>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
                <span>•</span>
                <span>{post.author}</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-light text-architectural mb-6">
                {post.title}
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            </div>
            
            {/* Featured Image */}
            <div className="w-full h-96 mb-12 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Article Content */}
            <div className="prose prose-invert prose-lg max-w-none
              prose-headings:font-light prose-headings:text-architectural
              prose-h1:text-3xl md:prose-h1:text-4xl prose-h1:mt-12 prose-h1:mb-6
              prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-5
              prose-h3:text-xl prose-h3:font-medium prose-h3:text-foreground prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-strong:text-foreground prose-strong:font-medium
              prose-li:text-muted-foreground prose-li:marker:text-muted-foreground
              prose-a:text-foreground prose-a:underline-offset-4
              prose-blockquote:border-l-2 prose-blockquote:border-foreground/30 prose-blockquote:bg-muted/30 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-muted-foreground
              prose-hr:border-border">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content.replace(/^\s*#\s+.+\n/, "")}
              </ReactMarkdown>
            </div>
            
            {/* Author Info */}
            <div className="mt-16 pt-8 border-t border-border">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-muted rounded-full"></div>
                <div>
                  <h3 className="text-lg font-medium text-foreground">{post.author}</h3>
                  <p className="text-muted-foreground">Architect & Writer</p>
                </div>
              </div>
            </div>
            
            {/* Related Posts */}
            <div className="mt-20">
              <h3 className="text-2xl font-light text-architectural mb-8">Related Articles</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {blogPosts
                  .filter(p => p.id !== post.id && p.category === post.category)
                  .slice(0, 2)
                  .map(relatedPost => (
                    <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`} className="group">
                      <div className="w-full h-48 mb-4 overflow-hidden">
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <h4 className="text-lg font-light text-architectural group-hover:text-muted-foreground transition-colors duration-300 mb-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-minimal text-muted-foreground">{relatedPost.date} • {relatedPost.readTime}</p>
                    </Link>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </article>
      <SiteFooter />
    </div>
  );
};

export default BlogPost;