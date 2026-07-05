import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

declare const process: { env: Record<string, string | undefined> };

export default defineTool({
  name: "join_waitlist",
  title: "Join Nullpunkt waitlist",
  description:
    "Register a Calgary/Alberta homeowner or business on the Nullpunkt Energy waitlist for a solar consultation. Sends confirmation and internal notification emails.",
  inputSchema: {
    name: z.string().min(1).max(100).describe("Full name of the contact."),
    email: z.string().email().describe("Contact email address."),
    postal_code: z.string().max(10).optional().describe("Canadian postal code."),
    property_type: z.string().max(50).optional().describe("e.g. residential, commercial, agricultural."),
    monthly_bill: z.number().nonnegative().optional().describe("Monthly electricity bill in CAD."),
    notes: z.string().max(500).optional().describe("Free-form notes from the user."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
  handler: async (input) => {
    const url = process.env.SUPABASE_URL;
    const anon = process.env.SUPABASE_ANON_KEY ?? process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!url || !anon) {
      return { content: [{ type: "text", text: "Server not configured." }], isError: true };
    }
    const res = await fetch(`${url}/functions/v1/join-waitlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${anon}`,
        apikey: anon,
      },
      body: JSON.stringify({ ...input, source: "mcp" }),
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        content: [{ type: "text", text: `Waitlist signup failed: ${JSON.stringify(data)}` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: `Signed up ${input.name} (${input.email}). Confirmation email sent.` }],
      structuredContent: data,
    };
  },
});
