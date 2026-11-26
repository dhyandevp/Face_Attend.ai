"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  Cpu,
  FileSpreadsheet,
  Github,
  GraduationCap,
  LockKeyhole,
  Mail,
  Play,
  ScanFace,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Brand, ContactForm, CopyCode, Demo, Navigation } from "@/components/site/site-controls";
import { HeroStarfield } from "@/components/site/hero-starfield";
import { editions, installCode, recognitionCode, repoUrl } from "@/lib/product";

const features = [
  {
    icon: ScanFace,
    name: "Precision AI",
    title: "A familiar face.\nAn instant record.",
    body: "Haar Cascade detection and LBPH recognition bring computer vision to everyday attendance.",
    tone: "bg-lime",
  },
  {
    icon: Zap,
    name: "Real-time tracking",
    title: "Less roll call.\nMore real learning.",
    body: "Recognize registered faces directly from a live webcam feed.",
    tone: "bg-pink",
  },
  {
    icon: FileSpreadsheet,
    name: "Auto-reporting",
    title: "Every entry.\nAlready accounted for.",
    body: "Daily CSV logs with name, ID, date, and time. Email the report with one click.",
    tone: "bg-lemon",
  },
  {
    icon: LockKeyhole,
    name: "Local & secure",
    title: "On your machine.\nIn your control.",
    body: "The core engine runs locally. No cloud connection required for recognition.",
    tone: "bg-sky",
  },
];

const workflow = [
  {
    title: "Register",
    label: "01 / STUDENT REGISTRATION",
    text: "A face, a name, a beginning.",
    detail:
      "Enter a numeric student ID and name. Capture 100 grayscale face images through the webcam, across different angles and lighting.",
  },
  {
    title: "Train",
    label: "02 / MODEL TRAINING",
    text: "Turn images into recognition.",
    detail:
      "LBPH converts captured images into texture histograms and saves the trained model in TrainingImageLabel/Trainner.yml.",
  },
  {
    title: "Recognize",
    label: "03 / ACTIVE MONITORING",
    text: "Presence becomes a record.",
    detail:
      "Haar Cascade detects faces. LBPH compares each face with the trained model and records recognized students in the attendance log.",
  },
  {
    title: "Report",
    label: "04 / DATA EXPORT",
    text: "From camera to clarity.",
    detail:
      "Stop the session to save a date-stamped CSV. Review the daily log in the dashboard and email it to administrators with one click.",
  },
];

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

export default function Home() {
  const [step, setStep] = useState(0);
  const currentStep = workflow[step] ?? workflow[0];

  return (
    <>
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:z-50 bg-background p-3"
        href="#overview"
      >
        Skip to content
      </a>
      <Navigation />

      <main id="top">
        {/* Hero Section with Cosmic Gradient, Starfield & Animations */}
        <section className="hero-cosmic relative overflow-hidden min-h-[760px] lg:min-h-[840px] text-night-foreground">
          {/* Animated Cosmic Starfield & Nebula Glow */}
          <HeroStarfield />

          <div className="relative max-w-[1240px] mx-auto px-6 md:px-10 pt-36 sm:pt-40 lg:pt-44 pb-24 sm:pb-32 rise-in z-10">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:items-end">
              <div>
                {/* Active Live Biometric Badge */}
                <div className="inline-flex items-center gap-3 text-xs mb-7 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-lime" />
                  </span>
                  <span className="eyebrow tracking-wider text-night-foreground">
                    v2.0 Enterprise Release
                  </span>
                </div>

                <h1 className="text-[44px] sm:text-[88px] lg:text-[108px] display-tight font-medium text-white drop-shadow-sm">
                  FaceAttend<span className="text-lime">.AI</span>
                </h1>
                <h2 className="text-[32px] sm:text-[48px] lg:text-[60px] headline-tight max-w-[690px] mt-6 font-normal text-white/95">
                  Attendance automation.
                  <br />
                  Powered by intelligence.
                </h2>
                <p className="max-w-[500px] text-base sm:text-lg leading-relaxed mt-7 text-night-foreground/85">
                  Eliminate manual registers and proxy attendance. A contactless, real-time facial
                  recognition system designed for the modern campus.
                </p>

                <div className="flex flex-wrap gap-4 mt-8 items-center">
                  <Button variant="hero" size="xl" asChild className="shadow-lg shadow-primary/20">
                    <a href="#overview">
                      Discover the Solution <ArrowUpRight className="size-4" />
                    </a>
                  </Button>
                  <Demo compact />
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-3 mt-10 text-xs text-night-foreground/80">
                  <span className="flex gap-2 items-center">
                    <Code2 className="size-4 text-sky" />
                    Open source
                  </span>
                  <span className="flex gap-2 items-center">
                    <ShieldCheck className="size-4 text-lime" />
                    Local-first
                  </span>
                  <span className="flex gap-2 items-center">
                    <Camera className="size-4 text-sky" />
                    Contactless by design
                  </span>
                </div>
              </div>

              {/* Floating Video Preview Card on Hero Right (Matching reference design) */}
              <div className="hidden lg:flex justify-end">
                <div className="animate-float">
                  <div className="flex items-center gap-4 bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 p-3.5 pr-6 rounded-2xl soft-shadow transition-all duration-300 hover:scale-105 hover:border-white/35 group cursor-pointer">
                    <div className="relative size-16 rounded-xl overflow-hidden shrink-0 bg-night border border-white/20">
                      <img
                        src="/assets/faceattend-demo.jpg"
                        alt="Desktop Face Recognition Demo Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors" />
                      {/* Biometric scanning bar animation */}
                      <div className="absolute inset-x-0 h-0.5 bg-lime shadow-[0_0_8px_#84cc16] animate-scanner-bar" />
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-white leading-tight">
                        System Walkthrough
                      </p>
                      <p className="text-xs text-white/70 mt-1">Live Facial Recognition</p>
                      <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full bg-white/15 border border-white/20 text-[11px] text-white font-mono">
                        <Play className="size-2.5 fill-white" /> 0:21
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Smooth Animated Down Arrow */}
          <a
            href="#overview"
            aria-label="Explore overview"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground/80 hover:text-foreground transition-colors animate-bounce-subtle z-20"
          >
            <ArrowDown className="size-5" />
          </a>
        </section>

        {/* Overview Section */}
        <section
          id="overview"
          className="max-w-[1240px] mx-auto px-6 md:px-10 pt-16 pb-20 md:pb-28"
        >
          <div className="grid md:grid-cols-2 gap-9 md:gap-20">
            <div>
              <p className="eyebrow text-muted-foreground mb-5">01 / A better way to be present</p>
              <h2 className="text-4xl lg:text-5xl headline-tight max-w-[520px]">
                The next chapter of attendance starts with a face.
              </h2>
            </div>
            <div className="pt-2 md:pt-9">
              <p className="text-xl lg:text-2xl leading-tight">
                Manual roll calls take time from learning. Proxy attendance undermines integrity.
                Physical logbooks are easy to lose.
              </p>
              <p className="text-lg text-muted-foreground mt-6 leading-relaxed">
                FaceAttend.AI replaces the register with computer vision. Recognize students, log
                attendance, and share daily reports—all from your own machine.
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                <span className="eyebrow bg-lime text-tile-foreground px-2.5 py-1 rounded-sm font-semibold">
                  ● Automated. Secure. Contactless.
                </span>
                <span className="eyebrow bg-lemon text-tile-foreground px-2.5 py-1 rounded-sm font-semibold">
                  ● Built with Python & OpenCV
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="pb-24 md:pb-32">
          <div className="max-w-[1240px] mx-auto px-6 md:px-10 flex justify-between items-end gap-6 mb-8">
            <div>
              <p className="eyebrow text-muted-foreground mb-3">02 / Product capabilities</p>
              <h2 className="text-3xl sm:text-4xl headline-tight">Built for the everyday.</h2>
            </div>
            <span className="eyebrow hidden sm:block text-muted-foreground">
              Computer vision. Human impact.
            </span>
          </div>

          <div className="max-w-[1320px] mx-auto px-6 md:px-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(({ icon: Icon, name, title, body, tone }, i) => (
              <article
                key={name}
                className={`${tone} text-tile-foreground rounded-xl p-6 min-h-[355px] flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group`}
              >
                <div className="flex items-center justify-between">
                  <Icon
                    className="size-8 transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={1.5}
                  />
                  <span className="eyebrow opacity-60">0{i + 1}</span>
                </div>
                <h3 className="text-[28px] headline-tight whitespace-pre-line mt-10 mb-8 font-medium">
                  {title}
                </h3>
                <div className="mt-auto border-t border-tile-foreground/15 pt-4">
                  <p className="eyebrow mb-2 opacity-70">{name}</p>
                  <p className="text-sm leading-relaxed">{body}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="max-w-[1240px] mx-auto px-6 md:px-10 mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="size-4 text-primary" />
            <span>
              Next on the horizon: liveness detection, cloud sync, and advanced analytics.
            </span>
          </div>
        </section>

        {/* Workflow Section */}
        <section id="workflow" className="max-w-[1240px] mx-auto px-6 md:px-10 pb-24 md:pb-32">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="eyebrow text-muted-foreground mb-5">03 / Intelligent workflow</p>
            <h2 className="text-4xl sm:text-5xl headline-tight">
              From first introduction
              <br />
              to the final report.
            </h2>
            <p className="text-muted-foreground mt-5 text-lg">
              Four simple stages. One seamless process.
            </p>
          </div>

          <div className="grid md:grid-cols-[1fr_1.25fr] gap-10 bg-night text-night-foreground p-7 sm:p-12 rounded-xl min-h-[360px] border border-white/10 shadow-2xl">
            <div className="flex flex-col justify-center gap-4">
              {workflow.map((item, i) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setStep(i)}
                  aria-pressed={step === i}
                  className={`text-left transition-all duration-200 text-3xl sm:text-[40px] font-normal flex items-center ${
                    step === i
                      ? "text-night-foreground font-medium pl-2 border-l-2 border-lime"
                      : "text-night-foreground/40 hover:text-night-foreground/75"
                  }`}
                >
                  <span className={`text-xs font-mono mr-3 ${step === i ? "text-lime" : ""}`}>
                    0{i + 1}
                  </span>
                  {item.title}
                  {step === i && <ArrowRight className="ml-3 text-lime size-6 animate-pulse" />}
                </button>
              ))}
            </div>
            <div
              className="flex flex-col justify-center transition-all duration-300"
              aria-live="polite"
            >
              <p className="eyebrow text-lime mb-5">{currentStep?.label}</p>
              <h3 className="text-3xl sm:text-4xl headline-tight max-w-md">{currentStep?.text}</h3>
              <p className="text-night-foreground/70 mt-6 max-w-md leading-relaxed">
                {currentStep?.detail}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="text-xs text-muted-foreground">
              Built around your existing webcam.
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                aria-label="Previous workflow step"
                onClick={() => setStep((step + 3) % 4)}
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label="Next workflow step"
                onClick={() => setStep((step + 1) % 4)}
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Walkthrough Demo Preview Section */}
        <section className="border-y bg-secondary/40 py-20 md:py-24">
          <div className="max-w-[1240px] mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-10 md:gap-20 items-center">
            <div>
              <p className="eyebrow text-muted-foreground mb-5">A closer look</p>
              <h2 className="text-5xl headline-tight">
                See presence
                <br />
                in action.
              </h2>
              <p className="mt-6 mb-7 text-lg text-muted-foreground max-w-md leading-relaxed">
                From registration to recognition. Explore the real desktop application in the system
                walkthrough.
              </p>
              <Demo />
            </div>
            <div className="relative group">
              <div className="relative rounded-xl overflow-hidden border soft-shadow bg-night">
                <img
                  src="/assets/faceattend-demo.jpg"
                  alt="FaceAttend.AI desktop attendance management dashboard"
                  className="w-full aspect-video object-contain"
                  loading="lazy"
                />
                {/* Real-time Facial Recognition Scanning Animation Effect */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-lime to-transparent shadow-[0_0_12px_#84cc16] animate-scanner-bar pointer-events-none" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] text-white">
                  <span className="size-2 bg-lime rounded-full animate-ping" />
                  <span>Haar Cascade · LBPH Active</span>
                </div>
              </div>
              <span className="block text-xs text-muted-foreground mt-3">
                System Walkthrough / Desktop application
              </span>
            </div>
          </div>
        </section>

        {/* Technology Architecture Section */}
        <section id="technology" className="max-w-[1240px] mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-10 md:gap-20 mb-12">
            <div>
              <p className="eyebrow text-muted-foreground mb-5">04 / Under the hood</p>
              <h2 className="text-4xl sm:text-5xl headline-tight">
                Lightweight tech.
                <br />
                Thoughtful engineering.
              </h2>
            </div>
            <div>
              <p className="text-xl leading-relaxed">
                A robust attendance management solution powered by computer vision, without cloud
                dependency for its core engine.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {[
                  "Python 3.9+",
                  "OpenCV",
                  "Haar Cascade",
                  "LBPH",
                  "Tkinter",
                  "Pandas & NumPy",
                  "Pillow",
                  "CSV",
                  "SMTP",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="eyebrow border px-2.5 py-1.5 rounded-md bg-secondary/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="eyebrow text-muted-foreground mb-5">System architecture view</p>
              <div className="grid gap-3">
                {[
                  { icon: Camera, name: "Webcam feed", detail: "Live image capture" },
                  { icon: Cpu, name: "Computer vision", detail: "Haar Cascade → LBPH recognition" },
                  {
                    icon: FileSpreadsheet,
                    name: "Attendance log",
                    detail: "Name / ID / Date / Time",
                  },
                  { icon: Mail, name: "Daily report", detail: "CSV export → SMTP email" },
                ].map(({ icon: Icon, name, detail }, i) => (
                  <div
                    key={name}
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-4 border-b transition-colors hover:border-primary/50 group"
                  >
                    <Icon
                      className="size-6 text-primary group-hover:scale-110 transition-transform"
                      strokeWidth={1.5}
                    />
                    <div>
                      <h3 className="text-lg font-medium">{name}</h3>
                      <p className="text-sm text-muted-foreground">{detail}</p>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <CopyCode code={recognitionCode} title="Recognition / illustrative Python" />
              <p className="text-xs text-muted-foreground mt-3">
                LBPH returns a distance score, not an accuracy percentage. Thresholds should be
                calibrated for the deployment.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-20 mt-20">
            <div>
              <h3 className="text-3xl headline-tight mb-5">Ready to build?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Start with Python and a working webcam. Clone the repository, install dependencies,
                and launch the desktop application.
              </p>
              <p className="text-sm text-muted-foreground mt-5">
                Configure your camera index and SMTP sender settings in config.ini. Keep email app
                passwords private.
              </p>
              <Button variant="link" asChild className="px-0 mt-4 text-primary">
                <a href={repoUrl} target="_blank" rel="noreferrer">
                  Explore the repository <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </div>
            <CopyCode code={installCode} title="Quick start / terminal" />
          </div>

          <details className="border-y mt-12 py-5 group">
            <summary className="cursor-pointer text-lg font-medium flex items-center justify-between">
              <span>Desktop user guide</span>
              <span className="text-xl group-open:rotate-45 transition-transform">+</span>
            </summary>
            <ol className="list-decimal ml-5 space-y-3 mt-5 text-muted-foreground">
              <li>
                Run <code>python main.py</code>.
              </li>
              <li>Enter a numeric ID and name, then select “Take Images” to capture 100 images.</li>
              <li>Select “Train Images” and wait for “Training Complete”.</li>
              <li>Select “Take Attendance”. Press q to stop webcam tracking.</li>
              <li>Review today’s log and select “Email Today’s Report” to send it.</li>
            </ol>
          </details>
        </section>

        {/* Use Cases Section */}
        <section id="use-cases" className="border-t py-20">
          <div className="max-w-[1240px] mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <p className="eyebrow text-muted-foreground mb-5">05 / Deploy anywhere</p>
                <h2 className="text-5xl headline-tight">
                  Different spaces.
                  <br />
                  The same intelligence.
                </h2>
              </div>
              <p className="text-xl text-muted-foreground md:pt-10 max-w-md">
                From lecture halls to workplaces, explore where contactless attendance can make a
                difference.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: GraduationCap,
                  title: "Universities",
                  text: "Bring contactless attendance to your campus and simplify faculty reporting.",
                },
                {
                  icon: Users,
                  title: "Corporate offices",
                  text: "Explore employee attendance logging with local records for administrative review.",
                },
                {
                  icon: ShieldCheck,
                  title: "Events",
                  text: "Explore attendance tracking for workshops and seminars.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <article
                  key={title}
                  className="border-t pt-7 hover:border-primary/50 transition-colors"
                >
                  <Icon className="size-9 mb-7 text-primary" strokeWidth={1.3} />
                  <h3 className="text-3xl mb-4 font-normal">{title}</h3>
                  <p className="text-muted-foreground max-w-xs leading-relaxed">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="max-w-[1240px] mx-auto px-6 md:px-10 py-24">
          <div className="text-center mb-12">
            <p className="eyebrow text-muted-foreground mb-5">06 / Choose your edition</p>
            <h2 className="text-4xl sm:text-5xl headline-tight">Start open. Think bigger.</h2>
            <p className="text-muted-foreground mt-5">
              From open-source research to proposed campus-wide deployment.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {editions.map((edition, i) => (
              <article
                key={edition.name}
                className={`rounded-xl p-8 border flex flex-col transition-all duration-300 hover:shadow-xl ${
                  i === 1 ? "bg-lime text-tile-foreground border-lime shadow-lg" : "bg-card"
                }`}
              >
                <div className="flex justify-between items-center gap-2">
                  <p className="eyebrow font-bold">{edition.name}</p>
                  {i === 1 && (
                    <span className="text-xs border border-tile-foreground/25 rounded-md px-2.5 py-1 font-medium">
                      Most Popular
                    </span>
                  )}
                </div>
                <p className="text-sm mt-4 opacity-75">{edition.description}</p>
                <p className="text-5xl my-8 font-light">
                  {edition.price === null ? "Custom" : `₹${edition.price.toLocaleString("en-IN")}`}
                  <span className="text-sm opacity-60 ml-2">
                    {edition.period && `/ ${edition.period}`}
                  </span>
                </p>
                <ul className="grid gap-4 mb-8 text-sm">
                  {edition.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="size-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                  {edition.unavailable.map((feature) => (
                    <li key={feature} className="opacity-50 flex gap-2">
                      <X className="size-4" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  {i === 0 ? (
                    <Button asChild variant="outline" size="xl" className="w-full">
                      <a href={repoUrl} target="_blank" rel="noreferrer">
                        Get Source Code <ArrowUpRight />
                      </a>
                    </Button>
                  ) : i === 1 ? (
                    <>
                      <Button disabled variant="night" size="xl" className="w-full">
                        Buy Pro License <ArrowUpRight />
                      </Button>
                      <p className="text-xs mt-3 text-center opacity-70">
                        Planned edition · checkout not available
                      </p>
                    </>
                  ) : (
                    <>
                      <Button asChild variant="night" size="xl" className="w-full">
                        <a href="mailto:faceattentai@gmail.com?subject=FaceAttend.AI%20Campus%20Inquiry">
                          Contact Sales <ArrowUpRight />
                        </a>
                      </Button>
                      <p className="text-xs mt-3 text-center text-muted-foreground">
                        Planned services · discuss your requirements
                      </p>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* FAQs Section */}
        <section className="max-w-[1240px] mx-auto px-6 md:px-10 py-16 border-t grid md:grid-cols-[1fr_1.3fr] gap-10 md:gap-20">
          <div>
            <p className="eyebrow text-muted-foreground mb-5">A little more clarity</p>
            <h2 className="text-4xl sm:text-5xl headline-tight">
              Good questions.
              <br />
              Straight answers.
            </h2>
            <a
              href="mailto:faceattentai@gmail.com"
              className="inline-flex items-center gap-2 mt-7 text-primary hover:underline"
            >
              Still have questions? <ArrowUpRight className="size-4" />
            </a>
          </div>
          <div>
            {faqs.map(([question, answer]) => (
              <details key={question} className="border-b py-5 group">
                <summary className="cursor-pointer text-lg font-medium flex justify-between gap-4 list-none">
                  {question}
                  <span className="shrink-0 text-primary group-open:rotate-45 transition-transform text-2xl font-light">
                    +
                  </span>
                </summary>
                <p className="text-muted-foreground mt-4 leading-relaxed">{answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* About Creator Section */}
        <section className="max-w-[1240px] mx-auto px-6 md:px-10 py-20 grid md:grid-cols-2 gap-10 md:gap-20 border-t">
          <div>
            <p className="eyebrow text-muted-foreground mb-5">Built with purpose</p>
            <h2 className="text-4xl headline-tight">
              An idea. Three months.
              <br />A better way forward.
            </h2>
            <p className="text-lg mt-6 text-muted-foreground leading-relaxed">
              Developed by Dhyandev, AI & Computer Vision Engineer, based in Kannur, Kerala. Created
              for a Computer Science Evaluation Project through three months of research into
              biometric security and edge computing.
            </p>
            <Button variant="link" asChild className="px-0 mt-5 text-primary">
              <a href="https://github.com/dhyandevp" target="_blank" rel="noreferrer">
                View GitHub Profile <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>
          <div>
            <p className="eyebrow text-muted-foreground mb-6">What's next / Roadmap</p>
            {[
              "SQL database integration",
              "Web-based dashboard",
              "Arduino door access integration",
            ].map((text, i) => (
              <div key={text} className="border-b py-5 flex justify-between gap-4">
                <span className="text-xl font-normal">{text}</span>
                <span className="eyebrow text-muted-foreground shrink-0">0{i + 1} / Planned</span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="border-t bg-secondary/40 py-20">
          <div className="max-w-[1240px] mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <p className="eyebrow text-muted-foreground mb-5">Let's connect</p>
              <h2 className="text-5xl headline-tight">
                Your campus.
                <br />
                Your next chapter.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground max-w-sm">
                Have a custom requirement? Send us a message.
              </p>
              <a
                href="mailto:faceattentai@gmail.com"
                className="inline-block mt-7 underline underline-offset-4 text-primary"
              >
                faceattentai@gmail.com
              </a>
              <p className="text-sm mt-3 text-muted-foreground">Kannur, Kerala, India</p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="p-3">
        <div className="footer-glow text-night-foreground rounded-xl px-6 md:px-16 py-14 border border-white/10">
          <div className="max-w-[1160px] mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <Brand large />
              <p className="text-night-foreground/70 mt-5 max-w-sm text-lg leading-relaxed">
                Enterprise-grade biometric attendance solutions. Built locally. Thinking ahead.
              </p>
              <a
                href={repoUrl}
                aria-label="FaceAttend.AI on GitHub"
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-6 hover:text-white transition-colors"
              >
                <Github className="size-6" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <nav aria-label="Footer product links" className="grid gap-3 text-xl">
                {["Overview", "Features", "Workflow", "Technology"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </nav>
              <div>
                <p className="eyebrow text-night-foreground/50 mb-5">Get in touch</p>
                <a
                  className="text-sm underline underline-offset-4 break-all hover:text-white"
                  href="mailto:faceattentai@gmail.com"
                >
                  faceattentai@gmail.com
                </a>
                <p className="text-sm mt-4 text-night-foreground/70">
                  Kannur, Kerala
                  <br />
                  India
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 mt-6 hover:text-white transition-colors"
                >
                  Let's talk <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="max-w-[1160px] mx-auto border-t border-night-foreground/15 mt-14 pt-6 flex flex-wrap justify-between gap-5 text-xs text-night-foreground/60">
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
