import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ExternalLink,
  Github,
  Globe,
  Mail,
  MapPin,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Brand, CopyCode, Demo, Navigation } from "@/components/site/site-controls";
import {
  CapabilitiesGrid,
  DemoPreview,
  FaqAccordion,
  HeroCanvas,
  TechExplorer,
  UseCaseSelector,
} from "@/components/site/interactive-sections";
import { WorkflowShowcase } from "@/components/site/workflow-showcase";
import {
  editions,
  installCode,
  repoUrl,
  developerEmail,
  developerWebsite,
  developerBioUrl,
  developerGithub,
} from "@/lib/product";

export default function Home() {
  return (
    <>
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 rounded-full bg-night text-night-foreground px-4 py-2 text-sm font-medium shadow-lg"
        href="#overview"
      >
        Skip to content
      </a>
      <Navigation />

      <main id="top">
        {/* Hero Section */}
        <HeroCanvas>
          <div className="relative max-w-[1240px] w-full mx-auto px-6 md:px-10 pt-32 sm:pt-36 lg:pt-40 pb-40 sm:pb-48 z-10 flex-1 flex flex-col justify-between">
            <div className="max-w-[820px]">
              <h1 className="rise-in text-[48px] sm:text-[84px] lg:text-[108px] display-tight font-bold text-white drop-shadow-sm">
                FaceAttend<span className="text-sky-300">.AI</span>
              </h1>
              <p
                className="rise-in font-display text-[28px] sm:text-[44px] lg:text-[54px] headline-tight max-w-[680px] mt-6 font-normal text-white/95"
                style={{ animationDelay: "90ms" }}
              >
                Attendance automation.
                <br />
                Powered by intelligence.
              </p>
            </div>

            <div
              className="rise-in mt-12 lg:mt-16 max-w-[680px]"
              style={{ animationDelay: "180ms" }}
            >
              <p className="max-w-[46ch] text-base sm:text-lg leading-relaxed text-white/85">
                Eliminate manual registers and proxy attendance. A contactless, real-time facial
                recognition system designed for the modern campus.
              </p>

              <div className="flex flex-wrap gap-4 mt-8 items-center">
                <Button
                  variant="hero"
                  size="xl"
                  asChild
                  className="tactile-btn rounded-xl shadow-lg shadow-primary/25"
                >
                  <a href="#overview">
                    Discover the Solution <ArrowUpRight className="size-4" />
                  </a>
                </Button>
                <Demo compact />
              </div>
            </div>
          </div>

          <a
            href="#overview"
            aria-label="Explore overview"
            className="absolute bottom-6 left-6 sm:left-1/2 sm:-translate-x-1/2 text-night/80 hover:text-night hover:translate-y-0.5 transition-all z-20 size-11 inline-flex items-center justify-center rounded-full"
          >
            <ArrowDown className="size-5" />
          </a>
        </HeroCanvas>

        {/* 01 / Overview Section */}
        <section
          id="overview"
          tabIndex={-1}
          className="relative z-10 max-w-[1240px] mx-auto px-6 md:px-10 pt-4 sm:pt-6 md:pt-8 pb-28 md:pb-36 scroll-reveal"
        >
          <div className="grid md:grid-cols-2 gap-10 md:gap-24 items-start">
            <div>
              <h2 className="text-4xl lg:text-5xl headline-tight font-medium max-w-[15ch]">
                The next chapter of attendance starts with a face.
              </h2>
            </div>
            <div className="md:pt-8">
              <p className="text-xl lg:text-2xl leading-snug text-foreground max-w-[42ch]">
                Manual roll calls take time from learning. Proxy attendance undermines integrity.
                Physical logbooks are easy to lose.
              </p>
              <p className="text-lg text-muted-foreground mt-6 leading-relaxed max-w-[48ch]">
                FaceAttend.AI replaces the register with computer vision. Recognize students, log
                attendance, and share daily reports—all from your own machine.
              </p>
              <div className="mt-8 flex flex-wrap gap-2.5">
                <span className="inline-flex items-center rounded-md border border-border bg-secondary/70 px-3.5 py-1.5 text-sm font-medium text-foreground/85">
                  Automated · Secure · Contactless
                </span>
                <span className="inline-flex items-center rounded-md border border-border bg-secondary/70 px-3.5 py-1.5 text-sm font-medium text-foreground/85">
                  Built with Python &amp; OpenCV
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 02 / Interactive Capabilities Cards */}
        <CapabilitiesGrid />

        {/* 03 / Interactive Orbital Wheel Workflow Showcase */}
        <WorkflowShowcase />

        {/* Walkthrough Demo Preview with Live CV Overlay Toggle */}
        <DemoPreview />

        {/* 04 / Interactive Tech Stack, Pipeline & Code Explorer */}
        <TechExplorer />

        {/* Quick Start Section */}
        <section className="max-w-[1240px] mx-auto px-6 md:px-10 pb-28 md:pb-36 scroll-reveal">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center rounded-3xl border bg-card p-8 sm:p-12 shadow-xs">
            <div>
              <h2 className="text-3xl sm:text-4xl headline-tight font-medium mb-5">
                Ready to build?
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-[44ch]">
                Start with Python and a working webcam. Clone the repository, install dependencies,
                and launch the desktop application.
              </p>
              <p className="text-sm text-muted-foreground mt-4 max-w-[44ch]">
                Configure your camera index and SMTP sender settings in config.ini. Keep email app
                passwords private.
              </p>
              <Button variant="link" asChild className="px-0 mt-5 text-primary">
                <a href={repoUrl} target="_blank" rel="noreferrer">
                  Explore the repository <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </div>
            <CopyCode code={installCode} title="Quick start / terminal" />
          </div>
        </section>

        {/* 05 / Interactive Deployment Scenarios */}
        <UseCaseSelector />

        {/* 06 / Pricing Section */}
        <section
          id="pricing"
          className="max-w-[1240px] mx-auto px-6 md:px-10 py-28 md:py-36 scroll-reveal"
        >
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-4xl sm:text-5xl headline-tight font-medium">
              Start open. Think bigger.
            </h2>
            <p className="text-muted-foreground mt-5 text-lg">
              From open-source research to proposed campus-wide deployment.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {editions.map((edition, i) => (
              <article
                key={edition.name}
                className={`rounded-2xl p-8 sm:p-9 border flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  i === 1 ? "bg-night text-night-foreground border-white/10 shadow-xl" : "bg-card"
                }`}
              >
                <div className="flex justify-between items-center gap-2">
                  <p className="eyebrow font-bold">{edition.name}</p>
                  {i === 1 && (
                    <span className="text-sm border border-white/25 rounded-full px-3.5 py-1 font-medium text-white/90">
                      Most Popular
                    </span>
                  )}
                </div>
                <p className="text-sm mt-4 opacity-80">{edition.description}</p>
                <p className="text-5xl my-8 font-light tracking-tight">
                  {edition.price === null ? "Custom" : `₹${edition.price.toLocaleString("en-IN")}`}
                  <span className="text-sm opacity-65 ml-2 font-normal">
                    {edition.period && `/ ${edition.period}`}
                  </span>
                </p>
                <ul className="grid gap-4 mb-9 text-sm">
                  {edition.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check
                        className={`size-4 shrink-0 mt-0.5 ${i === 1 ? "text-sky-400" : "text-primary"}`}
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {edition.unavailable.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-2.5 ${
                        i === 1 ? "text-white/55" : "text-muted-foreground"
                      }`}
                    >
                      <X className="size-4 shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="line-through decoration-current/45">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  {i === 0 ? (
                    <Button
                      asChild
                      variant="outline"
                      size="xl"
                      className="tactile-btn w-full rounded-xl"
                    >
                      <a href={repoUrl} target="_blank" rel="noreferrer">
                        Get Source Code <ArrowUpRight />
                      </a>
                    </Button>
                  ) : i === 1 ? (
                    <>
                      <Button
                        asChild
                        variant="hero"
                        size="xl"
                        className="tactile-btn w-full rounded-xl"
                      >
                        <a href="#contact">
                          Contact for Custom Build <ArrowUpRight />
                        </a>
                      </Button>
                      <p className="text-sm mt-3 text-center text-white/70">
                        Contact for custom build &amp; more details
                      </p>
                    </>
                  ) : (
                    <>
                      <Button
                        asChild
                        variant="night"
                        size="xl"
                        className="tactile-btn w-full rounded-xl"
                      >
                        <a href="#contact">
                          Contact Sales <ArrowUpRight />
                        </a>
                      </Button>
                      <p className="text-sm mt-3 text-center text-muted-foreground">
                        Planned services · discuss your requirements
                      </p>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Interactive FAQs Section */}
        <FaqAccordion />

        {/* About Creator Section */}
        <section className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 md:py-32 grid md:grid-cols-2 gap-12 md:gap-24 border-t scroll-reveal">
          <div>
            <h2 className="text-4xl headline-tight font-medium">
              An idea. Three months.
              <br />A better way forward.
            </h2>
            <p className="text-lg mt-6 text-muted-foreground leading-relaxed max-w-[48ch]">
              Developed by Dhyandev, AI & Computer Vision Engineer, based in Kannur, Kerala. Created
              for a Computer Science Evaluation Project through three months of research into
              biometric security and edge computing.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <Button variant="outline" asChild className="rounded-full">
                <a href={developerWebsite} target="_blank" rel="noreferrer">
                  Developer Portfolio <ArrowUpRight className="size-4" />
                </a>
              </Button>
              <Button variant="outline" asChild className="rounded-full">
                <a href={developerBioUrl} target="_blank" rel="noreferrer">
                  All Links <ArrowUpRight className="size-4" />
                </a>
              </Button>
              <Button variant="ghost" asChild className="rounded-full">
                <a href={developerGithub} target="_blank" rel="noreferrer">
                  <Github className="size-4" /> GitHub
                </a>
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-6 text-foreground/90">What's next / Roadmap</h3>
            {[
              "SQL database integration",
              "Web-based dashboard",
              "Arduino door access integration",
            ].map((text) => (
              <div key={text} className="border-b py-5 flex justify-between items-center gap-4">
                <span className="text-xl font-normal">{text}</span>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary text-muted-foreground border border-border/80">
                  Planned
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="border-t bg-background py-24 md:py-32 scroll-reveal"
        >
          <div className="max-w-[1240px] mx-auto px-6 md:px-10">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground mb-3">
                Contact
              </p>
              <h2
                id="contact-heading"
                className="text-4xl sm:text-5xl headline-tight font-semibold text-foreground"
              >
                Your campus. Your next chapter.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-[54ch] mx-auto leading-relaxed">
                Questions about setting up FaceAttend.AI, campus deployments, or custom integration
                inquiries—write anytime.
              </p>
            </div>

            <div className="mt-10 sm:mt-12 max-w-[780px] mx-auto rounded-3xl border border-blue-200/80 bg-gradient-to-br from-[#eaf2ff] via-[#eef5ff] to-[#e1ecff] p-7 sm:p-10 shadow-[0_24px_60px_-28px_rgba(37,99,235,0.22)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h3 className="font-display text-2xl sm:text-[30px] font-semibold tracking-tight text-foreground">
                  FaceAttend<span className="text-primary">.AI</span>
                </h3>

                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={`mailto:${developerEmail}`}
                    className="tactile-btn inline-flex items-center gap-2 rounded-full bg-night hover:bg-night/90 text-night-foreground px-5 h-10 text-sm font-semibold shadow-sm"
                  >
                    <Mail className="size-4" aria-hidden="true" />
                    <span>Email developer</span>
                  </a>
                  <a
                    href={developerWebsite}
                    target="_blank"
                    rel="noreferrer"
                    className="tactile-btn inline-flex items-center gap-2 rounded-full bg-white hover:bg-white/95 text-foreground border border-blue-200/80 px-5 h-10 text-sm font-semibold shadow-xs"
                  >
                    <Globe className="size-4 text-foreground/80" aria-hidden="true" />
                    <span>Website</span>
                    <ExternalLink className="size-3.5 text-muted-foreground" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <p className="mt-4 text-[15px] sm:text-base text-foreground/75 leading-relaxed max-w-[64ch]">
                Built by AI &amp; Computer Vision Engineer Dhyandev in Kannur, Kerala. We welcome
                campus pilot inquiries, Python contributors, and custom integration requests.
              </p>

              <div className="my-6 sm:my-7 h-px bg-blue-950/10" />

              <div className="grid sm:grid-cols-2 gap-3.5 sm:gap-4">
                <a
                  href={`mailto:${developerEmail}`}
                  className="group rounded-2xl bg-white/95 hover:bg-white border border-blue-100/90 hover:border-blue-300/80 px-5 py-4 shadow-xs transition-all duration-200 hover:-translate-y-0.5 block"
                >
                  <span className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground">
                    <Mail className="size-3.5 text-primary" aria-hidden="true" />
                    Developer email
                  </span>
                  <span className="mt-1.5 block text-[15px] font-semibold text-foreground group-hover:text-primary transition-colors">
                    {developerEmail}
                  </span>
                </a>

                <a
                  href={developerBioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-2xl bg-white/95 hover:bg-white border border-blue-100/90 hover:border-blue-300/80 px-5 py-4 shadow-xs transition-all duration-200 hover:-translate-y-0.5 block"
                >
                  <span className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground">
                    <Globe className="size-3.5 text-primary" aria-hidden="true" />
                    Developer links
                  </span>
                  <span className="mt-1.5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-foreground group-hover:text-primary transition-colors">
                    <span>link.dhyandev.sbs</span>
                    <ExternalLink
                      className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="p-3 sm:p-5">
        <div className="footer-glow text-night-foreground rounded-3xl px-6 md:px-16 py-16 border border-white/10">
          <div className="max-w-[1160px] mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <Brand large />
              <p className="text-night-foreground/75 mt-5 max-w-sm text-lg leading-relaxed">
                Local facial attendance management. Offline recognition, private logs, and direct
                reporting.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-6">
                <a
                  href={repoUrl}
                  aria-label="FaceAttend.AI on GitHub"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center size-10 rounded-full bg-white/10 hover:bg-white/20 hover:text-white transition-colors"
                  title="GitHub Repository"
                >
                  <Github className="size-5" />
                </a>
                <a
                  href={developerWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center px-3.5 h-10 rounded-full bg-white/10 hover:bg-white/20 hover:text-white text-sm font-medium transition-colors"
                >
                  dhyandev.sbs <ArrowUpRight className="size-3.5 ml-1" />
                </a>
                <a
                  href={developerBioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center px-3.5 h-10 rounded-full bg-white/10 hover:bg-white/20 hover:text-white text-sm font-medium transition-colors"
                >
                  link.dhyandev.sbs <ArrowUpRight className="size-3.5 ml-1" />
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
              <div>
                <h3 className="text-xs font-semibold tracking-wider uppercase text-night-foreground/70 mb-5">
                  Navigation
                </h3>
                <nav aria-label="Footer product links" className="space-y-2.5 text-base sm:text-lg">
                  {["Overview", "Features", "Workflow", "Technology", "Use Cases", "Pricing"].map(
                    (item) => (
                      <div key={item}>
                        <a
                          href={`#${item.toLowerCase().replace(" ", "-")}`}
                          className="text-white/80 hover:text-white transition-colors"
                        >
                          {item}
                        </a>
                      </div>
                    ),
                  )}
                </nav>
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-semibold tracking-wider uppercase text-night-foreground/70 mb-5">
                    Get in touch
                  </h3>
                  <div className="space-y-3.5 text-sm">
                    <div>
                      <a
                        href={`mailto:${developerEmail}`}
                        className="inline-flex items-center gap-2.5 text-white/90 hover:text-white transition-colors group"
                      >
                        <Mail className="size-4 text-sky-400 shrink-0" aria-hidden="true" />
                        <span className="font-medium underline underline-offset-4 decoration-white/30 hover:decoration-white">
                          {developerEmail}
                        </span>
                      </a>
                    </div>
                    <div>
                      <a
                        href={developerWebsite}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2.5 text-night-foreground/85 hover:text-white transition-colors"
                      >
                        <Globe className="size-4 text-sky-400 shrink-0" aria-hidden="true" />
                        <span>dhyandev.sbs</span>
                        <ArrowUpRight
                          className="size-3.5 text-night-foreground/60"
                          aria-hidden="true"
                        />
                      </a>
                    </div>
                    <div>
                      <a
                        href={developerBioUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2.5 text-night-foreground/85 hover:text-white transition-colors"
                      >
                        <ArrowUpRight className="size-4 text-sky-400 shrink-0" aria-hidden="true" />
                        <span>link.dhyandev.sbs</span>
                      </a>
                    </div>
                    <div className="flex items-center gap-2.5 text-night-foreground/70 pt-1">
                      <MapPin className="size-4 text-sky-400/80 shrink-0" aria-hidden="true" />
                      <span>Kannur, Kerala, India</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <a
                    href={`mailto:${developerEmail}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-sky-300 hover:text-white transition-colors"
                  >
                    <span>Let's talk</span>
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-[1160px] mx-auto border-t border-night-foreground/15 mt-14 pt-6 flex flex-wrap justify-between gap-5 text-sm text-night-foreground/80">
            <span>© 2026 Dhyandev. Open Source MIT License.</span>
            <div className="flex gap-6">
              <Link href="/privacy" className="underline underline-offset-4 hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="underline underline-offset-4 hover:text-white">
                Terms
              </Link>
              <a href="#top" className="flex items-center gap-1 hover:text-white">
                Back to top <ArrowUpRight className="size-3" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
