"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Camera,
  Check,
  ChevronRight,
  Cpu,
  FileSpreadsheet,
  GraduationCap,
  LockKeyhole,
  Mail,
  Pause,
  Play,
  Plus,
  ScanFace,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { CopyCode, Demo } from "@/components/site/site-controls";
import { developerEmail, installCode, recognitionCode } from "@/lib/product";
import { HeroStarfield } from "@/components/site/hero-starfield";

export function HeroCanvas({ children }: { children: React.ReactNode }) {
  const [paused, setPaused] = useState(false);

  return (
    <section
      className={`hero-cosmic relative overflow-hidden min-h-[88dvh] flex flex-col justify-between text-night-foreground ${
        paused ? "hero-motion-paused" : ""
      }`}
    >
      <HeroStarfield />
      {children}
      {/* Ambient motion pause/resume control for WCAG 2.2.2 */}
      <button
        type="button"
        onClick={() => setPaused((prev) => !prev)}
        className="tactile-btn absolute bottom-7 right-6 md:right-10 z-20 inline-flex items-center gap-2 rounded-full bg-white/80 hover:bg-white text-foreground backdrop-blur-md border border-border/80 px-4 py-2 text-sm font-medium shadow-xs cursor-pointer"
      >
        {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
        <span>{paused ? "Resume motion" : "Pause motion"}</span>
      </button>
    </section>
  );
}

const capabilities = [
  {
    icon: ScanFace,
    name: "Precision AI",
    title: "A familiar face.\nAn instant record.",
    body: "Haar Cascade detection and LBPH recognition bring computer vision to everyday attendance.",
    specLabel: "Engine",
    specValue: "OpenCV Haar Cascade + LBPH Histograms",
    detail:
      "Extracts local binary pattern descriptors per grayscale face crop and matches them against your trained Trainner.yml roster.",
  },
  {
    icon: Zap,
    name: "Real-time tracking",
    title: "Less roll call.\nMore real learning.",
    body: "Recognize registered faces directly from a live webcam feed.",
    specLabel: "Capture",
    specValue: "Live 720p+ webcam frame stream",
    detail:
      "Eliminates manual paper roll calls at the start of lectures—students are logged automatically as they enter frame.",
  },
  {
    icon: FileSpreadsheet,
    name: "Auto-reporting",
    title: "Every entry.\nAlready accounted for.",
    body: "Daily CSV logs with name, ID, date, and time. Email the report with one click.",
    specLabel: "Output",
    specValue: "Date-stamped CSV + SMTP dispatch",
    detail:
      "Deduplicates multiple sightings per session and produces clean spreadsheet-ready attendance sheets for faculty.",
  },
  {
    icon: LockKeyhole,
    name: "Local & secure",
    title: "On your machine.\nIn your control.",
    body: "The core engine runs locally. No cloud connection required for recognition.",
    specLabel: "Privacy",
    specValue: "100% offline biometric inference",
    detail:
      "Training photos, model weights, and CSV attendance records remain on your campus or classroom workstation.",
  },
];

export function CapabilitiesGrid() {
  const [selected, setSelected] = useState<string | null>("Precision AI");
  const activeCap = capabilities.find((c) => c.name === selected) ?? null;

  return (
    <section id="features" className="py-24 md:py-36 scroll-reveal">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 flex flex-wrap justify-between items-end gap-6 mb-12">
        <div>
          <h2 className="text-4xl sm:text-5xl headline-tight font-medium">
            Built for the everyday.
          </h2>
        </div>
        <span className="text-sm font-medium text-muted-foreground">
          Select any card to inspect specifications
        </span>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 md:px-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {capabilities.map(({ icon: Icon, name, title, body, specLabel, specValue }, i) => {
          const isSelected = selected === name;
          return (
            <button
              key={name}
              type="button"
              aria-expanded={isSelected}
              onClick={() => setSelected(isSelected ? null : name)}
              className={`text-left rounded-2xl p-7 min-h-[340px] flex flex-col border transition-[transform,box-shadow,border-color,background-color] duration-250 hover:-translate-y-1 hover:shadow-lg cursor-pointer group ${
                isSelected
                  ? "bg-night text-night-foreground border-night shadow-xl -translate-y-1"
                  : "bg-card text-foreground border-border hover:border-primary/40"
              }`}
            >
              <div className="w-full flex items-center justify-between">
                <Icon
                  className={`size-8 transition-transform duration-300 group-hover:scale-110 ${
                    isSelected ? "text-sky-300" : "text-primary"
                  }`}
                  strokeWidth={1.5}
                />
                <span
                  className={`eyebrow font-semibold ${isSelected ? "text-white/60" : "text-muted-foreground"}`}
                >
                  0{i + 1}
                </span>
              </div>

              <h3 className="text-[26px] headline-tight whitespace-pre-line mt-10 mb-8 font-medium">
                {title}
              </h3>

              <div
                className={`mt-auto w-full border-t pt-4 ${
                  isSelected ? "border-white/15" : "border-border"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <p
                    className={`eyebrow font-semibold ${isSelected ? "text-white/80" : "text-foreground/80"}`}
                  >
                    {name}
                  </p>
                  <ChevronRight
                    className={`size-4 transition-transform duration-200 ${
                      isSelected
                        ? "rotate-90 text-sky-300"
                        : "opacity-60 group-hover:translate-x-0.5"
                    }`}
                  />
                </div>
                <p
                  className={`text-sm leading-relaxed ${isSelected ? "text-white/75" : "text-muted-foreground"}`}
                >
                  {body}
                </p>
                <p
                  className={`mt-3 pt-2.5 border-t text-sm font-medium ${
                    isSelected
                      ? "border-white/10 text-white/75"
                      : "border-border/70 text-muted-foreground"
                  }`}
                >
                  {specLabel}: {specValue}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Live Expanded Specification Drawer */}
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 mt-6">
        {activeCap ? (
          <div
            key={activeCap.name}
            role="region"
            aria-label="Selected capability specifications"
            aria-live="polite"
            className="panel-reveal rounded-2xl border bg-card px-6 py-5 flex flex-wrap items-center justify-between gap-4 shadow-xs"
          >
            <div className="flex items-start gap-4 max-w-2xl">
              <span className="bg-secondary text-primary size-10 rounded-xl flex items-center justify-center shrink-0">
                <activeCap.icon className="size-5" strokeWidth={1.7} />
              </span>
              <div>
                <p className="eyebrow text-muted-foreground">
                  {activeCap.name} · {activeCap.specValue}
                </p>
                <p className="text-sm sm:text-base text-foreground/90 mt-1 leading-relaxed">
                  {activeCap.detail}
                </p>
              </div>
            </div>
            <a
              href="#technology"
              className="tactile-btn text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1"
            >
              Inspect implementation <ChevronRight className="size-4" />
            </a>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
            <Sparkles className="size-4 text-primary" />
            <span>
              Next on the horizon: liveness detection, cloud sync, and advanced analytics.
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

export function DemoPreview() {
  return (
    <section className="border-y bg-secondary/40 py-24 md:py-32 scroll-reveal">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div>
          <h2 className="text-4xl sm:text-5xl headline-tight font-medium">
            See presence
            <br />
            in action.
          </h2>
          <p className="mt-6 mb-8 text-lg text-muted-foreground max-w-[44ch] leading-relaxed">
            From registration to recognition. Explore the desktop application in the system
            walkthrough.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Demo />
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden border soft-shadow bg-night">
            <Image
              src="/assets/faceattend-demo.jpg"
              alt="FaceAttend.AI desktop attendance management dashboard"
              width={1080}
              height={1920}
              className="w-full aspect-video object-contain"
              loading="lazy"
            />
          </div>
          <span className="block text-sm text-muted-foreground mt-3 font-medium">
            System Walkthrough · Desktop application (Tkinter + OpenCV)
          </span>
        </div>
      </div>
    </section>
  );
}

const techStackDetails: Record<string, { role: string; usage: string }> = {
  "Python 3.9+": {
    role: "Core runtime",
    usage: "Orchestrates camera capture, model training, dashboard GUI, and CSV dispatch.",
  },
  OpenCV: {
    role: "Computer vision engine",
    usage: "Provides grayscale frame conversion, Haar Cascade detection, and LBPH recognition.",
  },
  "Haar Cascade": {
    role: "Face detector",
    usage: "Fast cascade classifier isolating facial regions from live webcam frames locally.",
  },
  LBPH: {
    role: "Face recognizer",
    usage: "Local Binary Patterns Histograms model trained into Trainner.yml per deployment.",
  },
  Tkinter: {
    role: "Desktop interface",
    usage: "Lightweight native GUI for student registration, training, and attendance controls.",
  },
  "Pandas & NumPy": {
    role: "Data processing",
    usage: "Manages array conversions during training and deduplicates daily attendance tables.",
  },
  Pillow: {
    role: "Image utilities",
    usage: "Loads grayscale sample crops cleanly from TrainingImage/ for LBPH training.",
  },
  CSV: {
    role: "Storage format",
    usage: "Zero-dependency daily spreadsheets storing Name, Student ID, Date, and Timestamp.",
  },
  SMTP: {
    role: "Report delivery",
    usage: "Sends date-stamped CSV attendance attachments to configured administrator emails.",
  },
};

const archSteps = [
  {
    icon: Camera,
    name: "Webcam feed",
    detail: "Live image capture",
    tab: "python" as const,
  },
  {
    icon: Cpu,
    name: "Computer vision",
    detail: "Haar Cascade → LBPH recognition",
    tab: "python" as const,
  },
  {
    icon: FileSpreadsheet,
    name: "Attendance log",
    detail: "Name / ID / Date / Time",
    tab: "csv" as const,
  },
  {
    icon: Mail,
    name: "Daily report",
    detail: "CSV export → SMTP email",
    tab: "cli" as const,
  },
];

const sampleCsvOutput = `Id,Name,Date,Time
101,Aarav Menon,2026-11-26,09:02:14
104,Diya Nair,2026-11-26,09:02:41
108,Rohan Verma,2026-11-26,09:03:09
112,Meera Krishnan,2026-11-26,09:04:22`;

export function TechExplorer() {
  const [selectedTech, setSelectedTech] = useState("OpenCV");
  const [activeArch, setActiveArch] = useState(1);
  const [codeTab, setCodeTab] = useState<"python" | "csv" | "cli">("python");

  const techDetail = techStackDetails[selectedTech];

  return (
    <section
      id="technology"
      className="max-w-[1240px] mx-auto px-6 md:px-10 py-28 md:py-36 scroll-reveal"
    >
      <div className="grid md:grid-cols-2 gap-10 md:gap-20 mb-14">
        <div>
          <h2 className="text-4xl sm:text-5xl headline-tight font-medium">
            Lightweight tech.
            <br />
            Thoughtful engineering.
          </h2>
        </div>
        <div>
          <p className="text-xl leading-relaxed text-foreground/90 max-w-[48ch]">
            A robust attendance management solution powered by computer vision, without cloud
            dependency for its core engine.
          </p>

          {/* Interactive Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 mt-7" role="group" aria-label="Technology stack">
            {Object.keys(techStackDetails).map((tech) => {
              const isSelected = selectedTech === tech;
              return (
                <button
                  key={tech}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedTech(tech)}
                  className={`tactile-btn eyebrow px-3 py-2 rounded-lg border text-left cursor-pointer ${
                    isSelected
                      ? "bg-night text-night-foreground border-night shadow-sm"
                      : "bg-secondary/50 text-foreground/80 hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {tech}
                </button>
              );
            })}
          </div>

          {techDetail && (
            <div
              key={selectedTech}
              className="panel-reveal mt-4 rounded-xl border bg-card px-4 py-3.5 text-sm shadow-2xs"
              aria-live="polite"
            >
              <span className="font-display text-sm tracking-tight text-primary font-semibold">
                {selectedTech} · {techDetail.role}
              </span>
              <p className="text-muted-foreground mt-1 leading-relaxed">{techDetail.usage}</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-4">
            System architecture · select a layer
          </h3>
          <div className="grid gap-2">
            {archSteps.map(({ icon: Icon, name, detail, tab }, i) => {
              const isCurrent = activeArch === i;
              return (
                <button
                  key={name}
                  type="button"
                  aria-pressed={isCurrent}
                  onClick={() => {
                    setActiveArch(i);
                    setCodeTab(tab);
                  }}
                  className={`tactile-btn w-full text-left grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-4 rounded-xl border transition-colors cursor-pointer group ${
                    isCurrent
                      ? "bg-card border-primary/40 shadow-sm"
                      : "border-transparent border-b-border hover:bg-secondary/40"
                  }`}
                >
                  <Icon
                    className={`size-6 transition-transform ${
                      isCurrent ? "text-primary scale-110" : "text-primary/70 group-hover:scale-105"
                    }`}
                    strokeWidth={1.5}
                  />
                  <div>
                    <span className="block text-lg font-medium">{name}</span>
                    <span className="block text-sm text-muted-foreground">{detail}</span>
                  </div>
                  <span
                    className={`font-display text-sm ${isCurrent ? "text-primary font-semibold" : "text-muted-foreground"}`}
                  >
                    0{i + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div
            className="flex flex-wrap gap-2 mb-3"
            role="tablist"
            aria-label="Code and output examples"
          >
            {(
              [
                { id: "python", label: "Recognition Python" },
                { id: "csv", label: "Sample CSV Output" },
                { id: "cli", label: "Quick Start CLI" },
              ] as const
            ).map((t, idx, list) => {
              const isSelected = codeTab === t.id;
              return (
                <button
                  key={t.id}
                  id={`tech-tab-${t.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`tech-panel-${t.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setCodeTab(t.id)}
                  onKeyDown={(e) => {
                    let nextIdx: number | null = null;
                    if (e.key === "ArrowRight") nextIdx = (idx + 1) % list.length;
                    else if (e.key === "ArrowLeft") nextIdx = (idx - 1 + list.length) % list.length;
                    else if (e.key === "Home") nextIdx = 0;
                    else if (e.key === "End") nextIdx = list.length - 1;
                    if (nextIdx !== null) {
                      e.preventDefault();
                      const nextTab = list[nextIdx];
                      if (nextTab) {
                        setCodeTab(nextTab.id);
                        document.getElementById(`tech-tab-${nextTab.id}`)?.focus();
                      }
                    }
                  }}
                  className={`tactile-btn eyebrow px-3 py-2 rounded-md border cursor-pointer ${
                    isSelected
                      ? "bg-night text-night-foreground border-night"
                      : "bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          <div
            key={codeTab}
            role="tabpanel"
            id={`tech-panel-${codeTab}`}
            aria-labelledby={`tech-tab-${codeTab}`}
            className="panel-reveal"
          >
            {codeTab === "python" && (
              <CopyCode code={recognitionCode} title="Recognition / illustrative Python" />
            )}
            {codeTab === "csv" && (
              <CopyCode code={sampleCsvOutput} title="Attendance_2026-11-26.csv / sample" />
            )}
            {codeTab === "cli" && <CopyCode code={installCode} title="Quick start / terminal" />}
          </div>

          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            LBPH returns a distance score, not an accuracy percentage. Thresholds should be
            calibrated for the deployment.
          </p>
        </div>
      </div>

      {/* Desktop User Guide Accordion */}
      <div className="modern-accordion mt-16 border-y">
        <details className="py-5 group">
          <summary className="cursor-pointer text-lg font-medium flex items-center justify-between list-none py-1">
            <span>Desktop user guide (5-step setup)</span>
            <Plus className="size-5 shrink-0 text-primary accordion-chevron" aria-hidden="true" />
          </summary>
          <ol className="list-decimal ml-5 space-y-3 mt-5 pb-2 text-muted-foreground leading-relaxed">
            <li>
              Run <code>python main.py</code> from your cloned repository.
            </li>
            <li>Enter a numeric ID and name, then select “Take Images” to capture 100 images.</li>
            <li>Select “Train Images” and wait for “Training Complete”.</li>
            <li>Select “Take Attendance”. Press q to stop webcam tracking.</li>
            <li>Review today’s log and select “Email Today’s Report” to send it.</li>
          </ol>
        </details>
      </div>
    </section>
  );
}

const useCaseScenarios = [
  {
    icon: GraduationCap,
    title: "Universities",
    text: "Bring contactless attendance to your campus and simplify faculty reporting.",
    checklist: [
      "Mount 720p+ webcam at lecture hall entry or podium",
      "Enroll student cohort once (100 grayscale frames per ID)",
      "Auto-export per-lecture CSV logs for department records",
    ],
  },
  {
    icon: Users,
    title: "Corporate offices",
    text: "Explore employee attendance logging with local records for administrative review.",
    checklist: [
      "Position terminal at reception or team check-in kiosk",
      "Keep biometric templates local with zero third-party cloud uploads",
      "Schedule daily SMTP summary delivery to HR operations",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Events",
    text: "Explore attendance tracking for workshops and seminars.",
    checklist: [
      "Pre-register workshop attendees before doors open",
      "Run real-time check-in without manual badge scanning queues",
      "Export clean participant CSV immediately after the session",
    ],
  },
];

export function UseCaseSelector() {
  const [active, setActive] = useState(0);
  const scenario = useCaseScenarios[active] ?? useCaseScenarios[0];

  return (
    <section id="use-cases" className="border-t py-28 md:py-36 scroll-reveal">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-8 mb-14">
          <div>
            <h2 className="text-4xl sm:text-5xl headline-tight font-medium">
              Different spaces.
              <br />
              The same intelligence.
            </h2>
          </div>
          <p className="text-xl text-muted-foreground md:pt-10 max-w-[44ch] leading-relaxed">
            From lecture halls to workplaces, select a space below to see a practical setup
            blueprint.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {useCaseScenarios.map(({ icon: Icon, title, text }, idx) => {
            const isSelected = active === idx;
            return (
              <button
                key={title}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setActive(idx)}
                className={`tactile-btn text-left rounded-2xl border p-7 transition-all cursor-pointer ${
                  isSelected
                    ? "bg-card border-primary shadow-md"
                    : "bg-transparent border-border/80 hover:border-primary/40 hover:bg-card/60"
                }`}
              >
                <Icon className="size-9 mb-6 text-primary" strokeWidth={1.3} />
                <h3 className="text-2xl sm:text-3xl mb-3 font-normal">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{text}</p>
              </button>
            );
          })}
        </div>

        <div
          key={scenario.title}
          className="panel-reveal mt-6 rounded-2xl border bg-secondary/45 p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6"
          aria-live="polite"
        >
          <div>
            <p className="eyebrow text-primary mb-2">{scenario.title} · Deployment checklist</p>
            <ul className="grid sm:grid-cols-3 gap-4 mt-3">
              {scenario.checklist.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/90">
                  <Check className="size-4 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  [
    "Is internet required?",
    "No. The core recognition engine runs entirely offline on the local machine. Sending an email report requires internet and SMTP configuration. Cloud sync and SMS are planned enhancements.",
  ],
  [
    "What hardware do I need?",
    "A laptop with a working webcam is the starting point. The supplied guide recommends 720p or better for small classes. Evaluate camera coverage and recognition quality for your actual setting before larger deployments.",
  ],
  [
    "Is student data secure?",
    "Face recognition is processed locally. Registration images, LBPH histograms, student details, and CSV logs are stored on the operating machine. Operators must manage consent, file access, and retention; local processing is not a compliance certification.",
  ],
  [
    "What is included in the open-source edition?",
    "The current repository includes webcam recognition, student registration and training, a Tkinter dashboard, daily CSV attendance logging, and one-click SMTP email reports.",
  ],
  [
    "Are Pro and Campus features available now?",
    "The paid editions are proposed offerings. Cloud sync, SMS, advanced analytics, liveness detection, and multi-camera features are planned, not established capabilities of the current repository.",
  ],
];

export function FaqAccordion() {
  const [openItems, setOpenItems] = useState<boolean[]>(() => faqs.map((_, i) => i === 0));
  const allOpen = openItems.every(Boolean);

  const toggleAll = () => {
    const next = !allOpen;
    setOpenItems(faqs.map(() => next));
  };

  return (
    <section
      aria-labelledby="faq-heading"
      className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 md:py-32 border-t grid md:grid-cols-[1fr_1.3fr] gap-12 md:gap-20 scroll-reveal"
    >
      <div>
        <h2 id="faq-heading" className="text-4xl sm:text-5xl headline-tight font-medium">
          Good questions.
          <br />
          Straight answers.
        </h2>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            aria-expanded={allOpen}
            onClick={toggleAll}
            className="tactile-btn rounded-lg border bg-card hover:bg-secondary px-4 py-2 text-sm font-medium cursor-pointer"
          >
            {allOpen ? "Collapse all" : "Expand all"}
          </button>
          <a
            href={`mailto:${developerEmail}`}
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            Still have questions? ({developerEmail})
          </a>
        </div>
      </div>

      <div className="modern-accordion">
        {faqs.map(([question, answer], i) => (
          <details
            key={question}
            open={openItems[i]}
            onToggle={(e) => {
              const isOpen = (e.currentTarget as HTMLDetailsElement).open;
              setOpenItems((prev) => prev.map((v, idx) => (idx === i ? isOpen : v)));
            }}
            className="border-b py-5"
          >
            <summary className="cursor-pointer text-lg font-medium flex items-center gap-4 list-none py-1">
              <Plus className="size-5 shrink-0 text-primary accordion-chevron" aria-hidden="true" />
              <span>{question}</span>
            </summary>
            <p className="text-muted-foreground mt-4 pl-9 leading-relaxed max-w-[60ch]">{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
