import { defineTool } from "@lovable.dev/mcp-js";
import { blogPosts } from "../../../data/blogPosts";

export default defineTool({
  name: "list_blog_posts",
  title: "List blog posts",
  description:
    "List all published Nullpunkt Energy blog posts with id, title, excerpt, category, author, date, read time, and public URL. Use to answer questions about Calgary/Alberta solar incentives, engineering, and case studies.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const posts = blogPosts.map((p) => ({
      id: p.id,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      author: p.author,
      date: p.date,
      readTime: p.readTime,
      url: `https://nullpunkt.ca/blog/${p.id}`,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(posts, null, 2) }],
      structuredContent: { posts },
    };
  },
});
