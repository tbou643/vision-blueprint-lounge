import { Link } from "react-router-dom";
import guidePdf from "@/assets/calgary-solar-guide-2026.pdf.asset.json";
import guideCover from "@/assets/calgary-solar-guide-cover.jpg.asset.json";
import guidePage5 from "@/assets/calgary-solar-guide-page5.jpg.asset.json";
import guidePage7 from "@/assets/calgary-solar-guide-page7.jpg.asset.json";

const highlights = [
  "Which federal rebates ended (Greener Homes Grant & Loan) and why old blog posts still list them",
  "Calgary's CEIP financing: $0 down, up to $50,000, repaid via property tax",
  "Alberta's 35 ¢/kWh Solar Club export rate, explained without the sales pitch",
  "Real 2026 installed cost ranges ($2.40 - 3.20 per watt) for 5 - 12 kW systems",
  "Seven questions to ask any installer before you sign",
];

const CalgarySolarGuide = () => {
  return (
    <section id="guide" className="py-32 border-t border-border bg-card">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Cover + thumbnails */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden card-raised">
              <img
                src={guideCover.url}
                alt="Cover of the NullPunkt Solar homeowner's guide to Calgary solar rebates, CEIP financing and Alberta export rates in 2026"
                className="w-full h-auto block"
                loading="lazy"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="rounded-xl overflow-hidden border border-border/60">
                <img
                  src={guidePage5.url}
                  alt="CEIP Calgary financing details - $50,000 at $0 down over 20 years"
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
              <div className="rounded-xl overflow-hidden border border-border/60">
                <img
                  src={guidePage7.url}
                  alt="Alberta Solar Club 35 cent per kWh export rate breakdown"
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="absolute -top-4 -left-4 bg-lime text-background text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full">
              Free · 12 pages · PDF
            </div>
          </div>

          {/* Copy */}
          <div>
            <p className="text-minimal text-lime mb-4">The 2026 Calgary solar guide</p>
            <h2 className="text-4xl md:text-5xl font-light text-architectural mb-6">
              Solar rebates in Calgary, 2026:{" "}
              <span className="lime-underline">what's actually available.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-light">
              A plain-language, sales-pitch-free homeowner's guide to solar incentives in Calgary and
              Alberta - the Canada Greener Homes Grant, the City of Calgary's CEIP financing,
              Alberta's Micro-generation Regulation, and the 35 ¢/kWh Solar Club export rate. Every
              number is dated and sourced.
            </p>

            <ul className="space-y-3 mb-10">
              {highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                  <span className="text-lime mt-1">→</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4 items-center">
              <a
                href={guidePdf.url}
                target="_blank"
                rel="noopener"
                className="btn-lime"
                data-cta="Download Calgary solar guide"
                data-cta-position="homepage-guide"
                download
              >
                Download the free guide (PDF)
              </a>
              <Link
                to="/contact"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Or reserve your free site visit →
              </Link>
            </div>
            <p className="text-xs text-muted-foreground/70 mt-6">
              Facts verified July 10, 2026 against calgary.ca, alberta.ca, NRCan, ENMAX and CMHC. No
              email required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalgarySolarGuide;
