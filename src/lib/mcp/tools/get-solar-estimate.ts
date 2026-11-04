import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { systemFromBill } from "../../system-sizing";
import { QUOTE_NOTE, CEIP_STATUS } from "../../solar-facts";

export default defineTool({
  name: "get_solar_estimate",
  title: "Get solar estimate",
  description:
    "Return an illustrative Calgary solar system size and annual production. Pricing and financial returns require an individual quote and assessment; this tool does not quote installation prices or financing approval.",
  inputSchema: {
    monthlyBill: z.number().positive().describe("Monthly electricity bill in CAD."),
    propertyType: z
      .enum(["residential", "commercial", "agricultural", "multi-family"])
      .describe("Property type."),
    roofOrientation: z
      .enum(["south", "south-east", "south-west", "east-west", "north"])
      .describe("Primary roof orientation."),
    roofSize: z.number().nonnegative().describe("Available roof area in m² (0 if unknown)."),
    hasEV: z.boolean().default(false).describe("Electric vehicle in the household."),
    hasBattery: z.boolean().default(false).describe("Wants battery storage."),
    postalCode: z.string().optional().describe("Canadian postal code (optional)."),
  },
  annotations: { readOnlyHint: true, openWorldHint: false },
  handler: async (input) => {
    const data = {
      ...systemFromBill(input.monthlyBill),
      quote: QUOTE_NOTE,
      ceip: CEIP_STATUS,
      assumptions: "500 W modules, 1,150 kWh/kWp/year and $0.22/kWh for approximate consumption. Final size uses actual annual kWh, roof condition, shading and utility requirements. No savings or payback guarantee.",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: data,
    };
  },
});
