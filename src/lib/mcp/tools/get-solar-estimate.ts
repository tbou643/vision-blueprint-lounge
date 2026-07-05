import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

declare const process: { env: Record<string, string | undefined> };

export default defineTool({
  name: "get_solar_estimate",
  title: "Get solar estimate",
  description:
    "Estimate a Calgary/Alberta solar PV system: recommended size, annual production, savings (standard vs Solar Club retailer), turn-key cost, payback, CO₂ avoided, and CEIP financing. Returns engineering baseline plus an AI-written recommendation.",
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
    const url = process.env.SUPABASE_URL;
    const anon = process.env.SUPABASE_ANON_KEY ?? process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!url || !anon) {
      return { content: [{ type: "text", text: "Server not configured." }], isError: true };
    }
    const res = await fetch(`${url}/functions/v1/solar-analysis`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${anon}`,
        apikey: anon,
      },
      body: JSON.stringify(input),
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        content: [{ type: "text", text: `Solar analysis failed: ${JSON.stringify(data)}` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: data,
    };
  },
});
