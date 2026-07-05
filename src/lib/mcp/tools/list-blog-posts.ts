import { defineTool } from "@lovable.dev/mcp-js";

// Inlined post metadata (avoids pulling in image asset imports at Edge Function bundle time).
const posts = [
  {
    id: "calgary-solar-incentives-2026",
    title: "Calgary Solar Incentives 2026: A Homeowner's Guide",
    excerpt:
      "What rebates, loans and net-billing programs actually pay out for a Calgary home solar system in 2026 — plus the small print most installers skip.",
    author: "NullPunkt Engineering",
    date: "2026-06-23",
    readTime: "9 min read",
    category: "INCENTIVES",
  },
  {
    id: "sustainable-architecture-future",
    title: "The Future of Sustainable Architecture",
    excerpt:
      "Exploring how modern architectural practices are evolving to meet environmental challenges while maintaining design excellence.",
    author: "Sarah Chen",
    date: "2024-03-15",
    readTime: "8 min read",
    category: "SUSTAINABILITY",
  },
  {
    id: "minimalism-modern-living",
    title: "Minimalism in Modern Living Spaces",
    excerpt:
      "How the principles of minimalist design are reshaping contemporary residential architecture and interior spaces.",
    author: "Marcus Rodriguez",
    date: "2024-03-10",
    readTime: "6 min read",
    category: "DESIGN",
  },
  {
    id: "urban-planning-community-spaces",
    title: "Urban Planning and Community Spaces",
    excerpt:
      "Examining the role of thoughtful urban planning in creating vibrant, inclusive communities through architectural design.",
    author: "Elena Nakamura",
    date: "2024-03-05",
    readTime: "10 min read",
    category: "URBAN PLANNING",
  },
];

export default defineTool({
  name: "list_blog_posts",
  title: "List blog posts",
  description:
    "List Nullpunkt Energy blog posts with id, title, excerpt, category, author, date, read time, and public URL. Useful for Calgary/Alberta solar incentive and engineering context.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const items = posts.map((p) => ({ ...p, url: `https://nullpunkt.ca/blog/${p.id}` }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { posts: items },
    };
  },
});
