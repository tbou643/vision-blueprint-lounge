import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SiteFooter from "@/components/SiteFooter";
import SEO from "@/components/SEO";

const LAST_UPDATED = "5 July 2026";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SEO
        title="Privacy Policy — NullPunkt Solar Inc."
        description="How NullPunkt Solar Inc. collects, uses and protects the personal information of visitors, waitlist members and customers in Calgary and Alberta."
      />
      <Navigation />

      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <p className="text-minimal text-lime mb-4">Privacy</p>
            <h1 className="text-4xl md:text-6xl font-light text-architectural mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-2">
              This page is maintained by NullPunkt Solar Inc. and explains what we collect
              when you visit <span className="text-foreground">nullpunkt.ca</span>, join our
              waitlist, or contact us.
            </p>
            <p className="text-xs text-muted-foreground mb-16">
              Last updated: {LAST_UPDATED} · Not a certification or legal advice.
            </p>

            {/* TOC */}
            <nav aria-label="Table of contents" className="card-raised p-6 mb-16">
              <p className="text-minimal text-muted-foreground mb-3">On this page</p>
              <ul className="grid sm:grid-cols-2 gap-y-1.5 text-sm">
                {[
                  ["who-we-are", "Who we are"],
                  ["what-we-collect", "What we collect"],
                  ["why", "Why we collect it"],
                  ["cookies", "Cookies & similar storage"],
                  ["analytics", "Analytics"],
                  ["subprocessors", "Service providers"],
                  ["sharing", "Who we share with"],
                  ["retention", "How long we keep it"],
                  ["rights", "Your rights & choices"],
                  ["security", "Security"],
                  ["children", "Children"],
                  ["changes", "Changes to this policy"],
                  ["contact", "Contact us"],
                ].map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`} className="text-muted-foreground hover:text-lime transition-colors">
                      → {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-16 text-[15px] leading-relaxed text-muted-foreground">
              <Section id="who-we-are" title="Who we are">
                <p>
                  <span className="text-foreground">NullPunkt Solar Inc.</span> is a Calgary,
                  Alberta company preparing to launch integrated solar, battery and Home Energy
                  Management installations in Summer 2026. We are the data controller for the
                  personal information described on this page.
                </p>
                <p>
                  Registered office: #2005 – 10th Avenue SW, Calgary, Alberta, Canada.<br />
                  Contact: <a href="mailto:hello@nullpunkt.ca" className="text-lime hover:underline">hello@nullpunkt.ca</a>.
                </p>
                <p className="text-xs">
                  We handle personal information in accordance with Canada's{" "}
                  <em>Personal Information Protection and Electronic Documents Act (PIPEDA)</em>{" "}
                  and Alberta's <em>Personal Information Protection Act (PIPA)</em>.
                </p>
              </Section>

              <Section id="what-we-collect" title="What we collect">
                <p className="mb-4">We collect only what we need to run the site and respond to you:</p>
                <Box title="When you browse the site">
                  <ul className="space-y-1.5">
                    <li>· Anonymous visitor and session IDs stored in your browser</li>
                    <li>· Pages you visit, referring URL, and how long you stay</li>
                    <li>· Scroll depth, clicks on our CTAs, outbound link clicks</li>
                    <li>· Approximate location (country and city) derived from your IP address</li>
                    <li>· Browser type, operating system, device type, screen size, language</li>
                    <li>· UTM parameters when you arrive from a campaign link</li>
                  </ul>
                  <p className="text-xs mt-3">
                    We do <span className="text-foreground">not</span> store your full IP address
                    on our servers, and we do not use advertising cookies or cross-site tracking.
                  </p>
                </Box>
                <Box title="When you join the waitlist or contact us">
                  <ul className="space-y-1.5">
                    <li>· Your name and email address</li>
                    <li>· Postal code, property type, and average monthly bill (optional)</li>
                    <li>· Any notes you add to your request</li>
                    <li>· The traffic source that brought you to us (first-touch attribution)</li>
                  </ul>
                </Box>
                <Box title="When you use the solar calculator">
                  <ul className="space-y-1.5">
                    <li>· The inputs you enter (bill, roof size, orientation, postal code, options)</li>
                    <li>· No personally identifying information unless you also join the waitlist</li>
                  </ul>
                </Box>
              </Section>

              <Section id="why" title="Why we collect it">
                <ul className="space-y-2">
                  <li>· <span className="text-foreground">To operate the site</span> — security, error handling, basic functionality.</li>
                  <li>· <span className="text-foreground">To improve the site</span> — understand which pages help visitors and which don't.</li>
                  <li>· <span className="text-foreground">To respond to you</span> — reply to waitlist and contact requests.</li>
                  <li>· <span className="text-foreground">To prepare a proposal</span> — size a system for your address when you request one.</li>
                  <li>· <span className="text-foreground">To measure marketing</span> — see which campaigns and channels actually work.</li>
                </ul>
                <p className="text-xs mt-4">
                  Our legal basis is your consent (which you can withdraw at any time) and our
                  legitimate interest in running a safe, useful website.
                </p>
              </Section>

              <Section id="cookies" title="Cookies & similar storage">
                <p>
                  We keep our footprint deliberately small. We do <span className="text-foreground">not</span> use
                  advertising cookies, retargeting pixels, or third-party social widgets.
                </p>
                <p>What we do store in your browser:</p>
                <div className="overflow-x-auto mt-3">
                  <table className="w-full text-sm border border-border rounded">
                    <thead className="text-xs uppercase tracking-wider text-muted-foreground bg-background/40">
                      <tr>
                        <th className="text-left p-3 border-b border-border">Name</th>
                        <th className="text-left p-3 border-b border-border">Type</th>
                        <th className="text-left p-3 border-b border-border">Purpose</th>
                        <th className="text-left p-3 border-b border-border">Retention</th>
                      </tr>
                    </thead>
                    <tbody className="[&>tr>td]:p-3 [&>tr>td]:border-b [&>tr>td]:border-border/50">
                      <tr>
                        <td className="font-mono text-xs">np_visitor_id</td>
                        <td>Local storage</td>
                        <td>Identify a returning browser (random, no personal data)</td>
                        <td>Until cleared</td>
                      </tr>
                      <tr>
                        <td className="font-mono text-xs">np_session_id</td>
                        <td>Session storage</td>
                        <td>Group activity within a single visit</td>
                        <td>Ends with the tab</td>
                      </tr>
                      <tr>
                        <td className="font-mono text-xs">np_first_touch</td>
                        <td>Local storage</td>
                        <td>Remember which campaign brought you to us</td>
                        <td>Until cleared</td>
                      </tr>
                      <tr>
                        <td className="font-mono text-xs">np_geo</td>
                        <td>Session storage</td>
                        <td>Cache your approximate location for the visit</td>
                        <td>Ends with the tab</td>
                      </tr>
                      <tr>
                        <td className="font-mono text-xs">np_notice_ack</td>
                        <td>Local storage</td>
                        <td>Remember that you've dismissed our privacy notice</td>
                        <td>Until cleared</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs mt-3">
                  You can delete these at any time via your browser's site-data settings. Doing so
                  will not stop you from using the site.
                </p>
              </Section>

              <Section id="analytics" title="Analytics">
                <p>
                  We run our own first-party analytics on our infrastructure. Data stays in our
                  own database — we do not send analytics events to Google Analytics, Meta,
                  TikTok, or any advertising network.
                </p>
                <p>
                  For approximate location we call <span className="text-foreground">ipapi.co</span>{" "}
                  from your browser once per visit. Your IP address reaches ipapi.co as part of
                  that request; ipapi.co returns only country, region and city, which we store on
                  the visit record.
                </p>
              </Section>

              <Section id="subprocessors" title="Service providers we use">
                <ul className="space-y-2">
                  <li>
                    · <span className="text-foreground">Lovable Cloud / Supabase</span> — hosting,
                    database and edge functions. Data is stored on managed infrastructure.
                  </li>
                  <li>
                    · <span className="text-foreground">ipapi.co</span> — approximate geolocation
                    from IP (see Analytics above).
                  </li>
                  <li>
                    · <span className="text-foreground">Email delivery provider</span> — sends
                    waitlist confirmations and internal notifications from{" "}
                    <span className="font-mono text-xs">hello@nullpunkt.ca</span>.
                  </li>
                  <li>
                    · <span className="text-foreground">Lovable AI Gateway</span> — powers the
                    engineering commentary in the solar calculator; only your calculator inputs
                    are sent (no personal identifiers).
                  </li>
                </ul>
                <p className="text-xs mt-3">
                  These providers act on our instructions and are bound by their own privacy and
                  security terms.
                </p>
              </Section>

              <Section id="sharing" title="Who we share your data with">
                <p>
                  We do not sell your personal information and we do not share it for advertising.
                  We share information only with:
                </p>
                <ul className="space-y-1.5 mt-2">
                  <li>· The service providers above, strictly to run the site and reply to you.</li>
                  <li>
                    · <span className="text-foreground">SMB Solartechnik GmbH</span> (our German
                    parent) for engineering review of specific proposals, when you have requested
                    one.
                  </li>
                  <li>
                    · Law enforcement or regulators when we are legally required to do so.
                  </li>
                </ul>
              </Section>

              <Section id="retention" title="How long we keep it">
                <ul className="space-y-2">
                  <li>
                    · <span className="text-foreground">Analytics events</span>: up to 24 months,
                    then rolled up or deleted.
                  </li>
                  <li>
                    · <span className="text-foreground">Waitlist entries</span>: until you ask us
                    to remove them, or until the founding-installation program has clearly
                    concluded.
                  </li>
                  <li>
                    · <span className="text-foreground">Email logs</span>: up to 12 months for
                    delivery diagnostics.
                  </li>
                  <li>
                    · <span className="text-foreground">Customer records</span> (once you become a
                    customer): as long as required by Canadian tax and warranty law, typically
                    7 years.
                  </li>
                </ul>
              </Section>

              <Section id="rights" title="Your rights & choices">
                <p>Under PIPEDA and Alberta PIPA you may ask us to:</p>
                <ul className="space-y-1.5 mt-2">
                  <li>· Confirm what personal information we hold about you</li>
                  <li>· Provide a copy of that information</li>
                  <li>· Correct information that is wrong</li>
                  <li>· Delete information when we no longer need it</li>
                  <li>· Withdraw consent to further processing</li>
                </ul>
                <p className="mt-3">
                  Send requests to{" "}
                  <a href="mailto:hello@nullpunkt.ca" className="text-lime hover:underline">
                    hello@nullpunkt.ca
                  </a>{" "}
                  with the subject line “Privacy request”. We aim to respond within 30 days.
                </p>
                <p className="mt-3">
                  You can opt out of our analytics for your device by clearing site data or by
                  telling us in writing — we'll add your visitor ID to our exclusion list.
                </p>
                <p className="text-xs mt-3">
                  If you are unhappy with our response you may contact the{" "}
                  <a
                    href="https://www.priv.gc.ca/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground underline decoration-lime/40"
                  >
                    Office of the Privacy Commissioner of Canada
                  </a>{" "}
                  or the{" "}
                  <a
                    href="https://www.oipc.ab.ca/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground underline decoration-lime/40"
                  >
                    Alberta Information and Privacy Commissioner
                  </a>
                  .
                </p>
              </Section>

              <Section id="security" title="Security">
                <p>
                  Site traffic runs over HTTPS. Our database is hosted on managed infrastructure
                  with row-level security enabled on tables that hold personal information. Access
                  to the admin dashboard is password-protected and limited to NullPunkt staff.
                </p>
                <p className="text-xs">
                  No system is perfectly secure. If you believe you have found a security issue,
                  please email us at{" "}
                  <a href="mailto:hello@nullpunkt.ca" className="text-lime hover:underline">
                    hello@nullpunkt.ca
                  </a>
                  .
                </p>
              </Section>

              <Section id="children" title="Children">
                <p>
                  Our site is not directed at children under 13, and we do not knowingly collect
                  their personal information. If you believe a child has provided information,
                  contact us and we will delete it.
                </p>
              </Section>

              <Section id="changes" title="Changes to this policy">
                <p>
                  We will update this page when our practices change and will revise the “last
                  updated” date at the top. Material changes will also be announced on the site.
                </p>
              </Section>

              <Section id="contact" title="Contact us">
                <p>
                  Questions or requests about privacy:
                </p>
                <p className="mt-2">
                  <a href="mailto:hello@nullpunkt.ca" className="text-lime hover:underline">
                    hello@nullpunkt.ca
                  </a>
                  <br />
                  NullPunkt Solar Inc.
                  <br />
                  #2005 – 10th Avenue SW, Calgary, Alberta, Canada
                </p>
                <p className="mt-8">
                  <Link to="/" className="btn-ghost">← Back to home</Link>
                </p>
              </Section>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-28">
    <h2 className="text-2xl md:text-3xl font-light text-foreground mb-5">{title}</h2>
    <div className="space-y-3">{children}</div>
  </section>
);

const Box = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="card-raised p-5 mb-4">
    <p className="text-minimal text-lime mb-3">{title}</p>
    <div className="text-sm text-muted-foreground">{children}</div>
  </div>
);

export default Privacy;
