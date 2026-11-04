import { defineMcp } from "@lovable.dev/mcp-js";
import getSolarEstimate from "./tools/get-solar-estimate";
import joinWaitlist from "./tools/join-waitlist";
import getServicesOverview from "./tools/get-services-overview";
import listBlogPosts from "./tools/list-blog-posts";

export default defineMcp({
  name: "nullpunkt-energy-mcp",
  title: "NullPunkt Solar MCP",
  version: "0.1.0",
  instructions:
    "Tools for NullPunkt Solar Inc. in Calgary. Use get_solar_estimate for illustrative sizing and production, not installation prices or financial guarantees. Use get_services_overview for current company, service and individual-quote information. Use list_blog_posts for solar articles. Use join_waitlist to request a free consultation.",
  tools: [getSolarEstimate, getServicesOverview, listBlogPosts, joinWaitlist],
});
