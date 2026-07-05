import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_services_overview",
  title: "Get Nullpunkt services overview",
  description:
    "Return a structured overview of Nullpunkt Energy's core services, target market (Calgary / Alberta), pricing posture, and contact channels.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const overview = {
      company: "Nullpunkt Energy (Calgary subsidiary of SMB Solartechnik GmbH)",
      slogan: "German Precision — Zero Emissions",
      market: "Calgary and greater Alberta, Canada",
      services: [
        {
          name: "Turn-key residential solar PV",
          description:
            "Engineering, permits, install, commissioning and HEMS for single-family and multi-family homes. Typical 4–20 kWp systems, Class 3+ hail-rated panels, 30°+ tilt for winter snow shedding.",
        },
        {
          name: "Commercial & agricultural solar",
          description:
            "150 kW–5 MW systems settled hourly under Alberta's Micro-Generation Regulation. Eligible for the 30% Clean Technology ITC.",
        },
        {
          name: "Battery storage (LFP)",
          description: "5–20 kWh installed alongside PV or as retrofit; ~CAD $800/kWh turn-key.",
        },
        {
          name: "Solar analysis & site design",
          description:
            "Free consultation, site visit, and engineering-led proposal comparing standard vs Solar Club retailer scenarios and CEIP financing.",
        },
      ],
      pricing: {
        pvTurnkeyPerKwp: "CAD ~$2,100/kWp (all-in)",
        batteryPerKwh: "CAD ~$800/kWh installed",
        note: "Low end of Alberta market via direct EU supplier through SMB Solartechnik.",
      },
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
