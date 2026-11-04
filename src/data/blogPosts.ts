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

Solar financing, tax credits and electricity export credits are not the same thing. For a Calgary homeowner, the first step is a roof and annual-consumption review, followed by an individual quote. Do not assume a grant, loan approval or fixed payback period.

> **Updated November 4, 2026:** Program intake and retailer terms can change. Check the official sources before applying or budgeting.

## 1. Calgary CEIP: current intake is closed

The City's Clean Energy Improvement Program offers property-assessed financing for eligible improvements when applications are open and funding is available. It is a loan repaid through the property tax bill, not a rebate.

As checked November 4, 2026, residential intake is closed until winter 2026/2027. The City lists estimated interest rates of **6.00%-6.10%, not 0%**. Final terms, eligibility, assessments and qualified-contractor requirements must be confirmed directly with the City. Do not assume your application will be approved or that an existing project will qualify retroactively.

[Check the City of Calgary CEIP page](https://www.calgary.ca/environment/programs/clean-energy-improvement-program.html).

## 2. Greener Homes: not funding for a new application

The Canada Greener Homes Grant and Loan are closed to new applicants. An existing approved application follows its own terms. Do not count these retired programs toward a new solar installation.

[Check the federal Canada Greener Homes Loan page](https://www.canada.ca/en/environment-climate-change/services/energy-efficiency/home-energy-efficiency/canada-greener-homes-initiative/canada-greener-homes-loan.html).

## 3. Alberta micro-generation: energy export credits

Eligible micro-generation systems are designed to generate electricity for the customer's own use. Your retailer credits eligible surplus exports under the applicable rules and rate plan.

**Technical note:** Export credits are not the full delivered electricity bill rate. Fixed fees remain, and imported electricity can still attract distribution, transmission and other charges. Annual production alone does not establish your savings.

[Read Alberta's micro-generation information](https://www.alberta.ca/micro-generation).

## 4. Solar Club: compare imports as well as exports

Participating retailers offer solar-specific rate plans. A higher energy rate may apply to both exports and imports during a selected period. Compare current rates, fees, switching conditions and your expected seasonal balance. A high export rate is not a guaranteed financial benefit.

[Check current Solar Club information](https://solarclub.ca/).

## 5. What decides your solar cost and payback?

- **Annual electricity use:** Start with 12 months of actual kWh, not just the dollar bill.
- **Roof condition:** Consider the remaining roof life before installing an array, and discuss any future removal and reinstallation costs.
- **Shading and orientation:** The roof layout determines production; a generic Calgary average is not a site-specific forecast.
- **Electrical scope:** Equipment, service upgrades, permits and installation details affect cost.
- **Optional storage:** Assess battery cost, usable capacity, operating strategy and backup circuits separately.
- **Retailer terms:** Model self-consumption, exported energy, imported electricity and the charges that remain.

We do not advertise a universal installation price, guaranteed savings or a standard payback period. Your individual CAD quote identifies the scope and GST. Any financial model must use that quoted cost and clearly stated assumptions.

## 6. Your next step

Request a free consultation to review your roof and electricity use. A site assessment can follow if appropriate; there is no obligation to buy or book a visit.

[Request your free Calgary solar consultation](/contact) or [explore an illustrative system size](/calculator).
    `,
    author: "NullPunkt Engineering",
    date: "2026-11-04",
    readTime: "5 min read",
    category: "INCENTIVES",
    image: calgaryIncentivesImg
  }
];
