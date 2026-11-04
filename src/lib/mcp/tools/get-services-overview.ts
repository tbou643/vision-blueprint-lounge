import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_services_overview",
  title: "Get Nullpunkt services overview",
  description:
    "Return a structured overview of NullPunkt Solar Inc.'s core services, target market (Calgary / Alberta), pricing posture, and contact channels.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const overview = {
      company: "NullPunkt Solar Inc. (Calgary subsidiary of SMB Solartechnik GmbH)",
      slogan: "German Precision - Zero Emissions",
      market: "Calgary and greater Alberta, Canada",
      services: [
        {
          name: "Turn-key residential solar PV",
          description:
            "Engineering, permits, install, commissioning and HEMS for single-family and multi-family homes. Sized to actual annual consumption and the roof assessment, with optional battery storage.",
        },
        {
          name: "Commercial & agricultural solar",
          description:
            "15-200 kWp systems with optional storage. Tax-credit eligibility requires individual assessment.",
        },
        {
          name: "Battery storage (LFP)",
          description: "Optional storage selected and quoted for the specific site.",
        },
        {
          name: "Solar analysis & site design",
          description:
            "Free consultation, site visit, and engineering-led proposal comparing standard vs Solar Club retailer scenarios and CEIP financing.",
        },
      ],
      pricing: {
        note: "Individual CAD quote after a free roof and consumption assessment. No universal public price, savings or payback promise. GST and scope identified in the proposal.",
      },
      ceip: "Calgary residential intake closed until winter 2026/2027 as checked November 4, 2026. Estimated interest 6.00%-6.10%, not 0%. Confirm current City terms and contractor eligibility.",
      programs: ["Alberta Micro-Generation Regulation", "Solar Club (UTILITYnet)", "CEIP (PACE financing)", "Clean Technology ITC (30%, commercial)"],
      contact: {
        email: "hello@nullpunkt.ca",
        phone: "+1 (403) 819-7834",
        website: "https://nullpunkt.ca",
      },
    };
    return {
      content: [{ type: "text", text: JSON.stringify(overview, null, 2) }],
      structuredContent: overview,
    };
  },
});
