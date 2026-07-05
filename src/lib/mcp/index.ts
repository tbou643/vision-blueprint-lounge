import { defineMcp } from "@lovable.dev/mcp-js";
import getSolarEstimate from "./tools/get-solar-estimate";
import joinWaitlist from "./tools/join-waitlist";
import getServicesOverview from "./tools/get-services-overview";
import listBlogPosts from "./tools/list-blog-posts";

export default defineMcp({
  name: "nullpunkt-energy-mcp",
  title: "Nullpunkt Energy MCP",
  version: "0.1.0",
  instructions:
    "Tools for Nullpunkt Energy (Calgary solar). Use get_solar_estimate for engineering-led PV/battery sizing and payback for Calgary/Alberta properties. Use get_services_overview for company/services/pricing context. Use list_blog_posts to surface Calgary incentive and engineering articles. Use join_waitlist to register a lead for a free consultation.",
  tools: [getSolarEstimate, getServicesOverview, listBlogPosts, joinWaitlist],
});
