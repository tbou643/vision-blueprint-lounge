import calgaryIncentivesImg from "@/assets/blog-calgary-incentives.jpg";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "calgary-solar-incentives-2026",
    title: "Calgary Solar Incentives 2026: A Homeowner's Guide",
    excerpt: "What rebates, loans and net-billing programs actually pay out for a Calgary home solar system in 2026 - plus the small print most installers skip.",
    content: `
# Calgary Solar Incentives 2026: A Homeowner's Guide

Going solar in Calgary is no longer an experimental decision. The hardware has matured, electricity prices have stabilised at a new, higher baseline, and three layers of public programs now stack on top of each other to shorten the payback window. This guide walks through what is actually available in 2026, who qualifies, and the engineering details that decide whether you receive the full benefit or leave money on the table.

> **Disclaimer:** Program terms change. Always confirm current eligibility with the City of Calgary, Natural Resources Canada and your retailer before signing a contract. The numbers below reflect publicly available program documentation at the time of writing.

## 1. The Two Layers You Can Stack

A well-designed Calgary residential project in 2026 typically combines:

1. **Municipal financing** - the City of Calgary's Clean Energy Improvement Program (CEIP), repaid through your property tax bill.
2. **Provincial net billing** - Alberta's Micro-Generation Regulation, which lets your retailer credit you for the electricity you export.

The federal Canada Greener Homes *Grant* closed in early 2024, and the interest-free *Loan* program has since stopped accepting new applications as well. There is no active federal cash incentive for residential solar in 2026 - which makes the municipal and provincial layers more important than ever.

> **Heads-up:** Some installers still advertise "Greener Homes" financing in their marketing. Ask explicitly whether your application would actually be funded, or whether the program is just being used as a sales hook.

## 2. City of Calgary CEIP (Clean Energy Improvement Program)

CEIP is Calgary's local financing tool. It is technically a form of PACE (Property Assessed Clean Energy) financing: the City lends the money, and you repay it as a line item on your annual property tax bill.

- **Tied to the property, not the person.** If you sell the home, the remaining balance can transfer to the new owner (subject to lender consent).
- **Repayment term:** Up to 20 years for solar and major envelope upgrades.
- **Rate:** Fixed for the full term, set when the program window opens - historically competitive with prime.
- **Eligible measures:** Solar PV, battery storage, geothermal, deep envelope retrofits.

For most Calgary homeowners, CEIP is now the primary public-financing route - it can cover the full project, including a Powerwall-class battery, with no upfront cash.

**Technical note:** CEIP runs in defined intake windows. Plan your project around the published application calendar rather than the other way around. An EnerGuide-style energy assessment is part of the qualification process.

## 3. Alberta Micro-Generation Regulation (Net Billing)

This is the provincial framework that allows your meter to spin in both directions. Two things matter for homeowners:

- **Eligible system size:** Up to 5 MW, far beyond any residential need. Practically, your system is sized to your annual consumption.
- **Credit value:** You are credited at your retailer's energy rate (not the full delivered cost). The exact number depends on which retailer you are with - Enmax, Direct Energy and the various competitive retailers all publish slightly different micro-gen rates.

**Homeowner takeaway:** Pick your retailer deliberately. The difference between the best and worst micro-gen rate in Alberta can shift your payback by 12-18 months on a typical 10 kW system.

**Technical note:** Credits are applied energy-for-energy in cents, but you still pay distribution and transmission charges on imported kWh. A battery improves the economics by raising your self-consumption ratio - typically from ~30% (PV only) to 65-80% (PV + battery + smart control) on a south-facing Calgary roof.

## 5. The Hidden Variables That Decide Your Payback

Two homes on the same street, with the same array size, can have payback periods two years apart. The differences usually come down to:

### Roof orientation and pitch
Calgary's optimal tilt for annual yield sits around 45°. South-facing is best, but east/west splits perform surprisingly well in summer - and matter more if you have a battery, because you flatten the production curve.

### Inverter and string design
A poorly zoned string inverter on a partially shaded roof can lose 15-20% of annual yield. Microinverters or DC optimisers cost more upfront but recover the difference within a few years on most Calgary roofs, which tend to have at least one chimney, vent stack or tree edge causing partial shading.

### Snow management
Calgary winters are sunny but snowy. Module tilt, frame height and the dark-glass thermal effect all influence how quickly snow sheds. A 40°+ tilt sheds passively within hours of sunrise on a clear day; a 15° tilt on a low-slope roof may sit under snow for days.

### Battery dispatch logic
A battery is only as good as the software running it. A well-tuned Home Energy Management System (HEMS) prioritises self-consumption when export credits are low and exports aggressively during peak retail hours when they are high. This is where the parent-company OpenEMS stack we bring from Germany pays off - it is rules-based, transparent and tunable, not a black box.

## 6. A Realistic Calgary Example

A 10.4 kW rooftop array with a 13.5 kWh battery on a south-facing, 35°-pitch roof in Calgary, designed with proper string layout and HEMS control:

- **System cost:** roughly $38,000 - $45,000 installed, depending on roof complexity and battery brand.
- **Annual yield:** ~12,500 kWh.
- **Self-consumption with battery + HEMS:** 70-80%.
- **Combined annual benefit (avoided imports + export credits):** $2,200 - $2,800 at current Alberta rates.
- **Financing:** CEIP can cover the full project amount, repaid through the property tax bill over up to 20 years.
- **Net cash-flow position:** Positive from year one in most scenarios; full payback in 9-12 years; 25-year linear-warranty modules continue producing well beyond that.

## 7. How to Approach Your Project

1. **Start with consumption data.** Pull 12 months of hourly data from your retailer before any installer designs an array.
2. **Check the next CEIP intake window early.** It is the gatekeeper for municipal financing and has fixed application dates.
3. **Get an engineered proposal, not a sales quote.** A real proposal includes a yield simulation, a single-line diagram, a bill-of-materials, and a payback model. If you do not see those, you are looking at a sales sheet.
4. **Choose your retailer with the micro-gen rate in mind.** Switching retailers is a five-minute task with multi-year financial consequences.
5. **Design for the battery you may add later**, even if you start with PV only. Cable sizing, inverter choice and panel position all matter.

---

If you would like a no-pressure review of your roof and your last 12 months of consumption against the current programs, that is exactly the conversation we are set up to have. We will tell you when the numbers do not work - and walk away - just as readily as when they do.
    `,
    author: "NullPunkt Engineering",
    date: "2026-06-23",
    readTime: "9 min read",
    category: "INCENTIVES",
    image: calgaryIncentivesImg
  }
];
