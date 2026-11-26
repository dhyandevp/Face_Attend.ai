"use client";

import { useEffect, useId, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Code2,
  Cpu,
  FileOutput,
  Pause,
  Play,
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

export interface WorkflowStage {
  id: string;
  name: string;
  eyebrow: string;
  headline: string;
  detail: string;
  inputArtifact: string;
  outputArtifact: string;
  snippet: string;
}

const stages: WorkflowStage[] = [
  {
    id: "register",
    name: "Register",
    eyebrow: "01 · Registration",
    headline: "Enroll every face in seconds",
    detail:
      "Enter a numeric student ID and name, then capture 100 grayscale face samples across natural angles and lighting.",
    inputArtifact: "Live webcam stream + Student ID & Name",
    outputArtifact: "TrainingImage/<Name>.<ID>.1..100.jpg",
    snippet: `faces = detector.detectMultiScale(gray, 1.3, 5)
for (x, y, w, h) in faces:
    sample_num += 1
    cv2.imwrite(f"TrainingImage/{name}.{id}.{sample_num}.jpg", gray[y:y+h, x:x+w])`,
  },
  {
    id: "train",
    name: "Train",
    eyebrow: "02 · Model Training",
    headline: "Turn captured frames into local recognition",
    detail:
      "LBPH converts captured grayscale crops into compact texture histograms and saves the trained recognizer on your machine.",
    inputArtifact: "100 labeled grayscale samples per student",
    outputArtifact: "TrainingImageLabel/Trainner.yml",
    snippet: `recognizer = cv2.face.LBPHFaceRecognizer_create()
faces, ids = getImagesAndLabels("TrainingImage")
recognizer.train(faces, np.array(ids))
recognizer.save("TrainingImageLabel/Trainner.yml")`,
  },
  {
    id: "detect",
    name: "Detect",
    eyebrow: "03 · Haar Cascade",
    headline: "Isolate faces cleanly in real time",
    detail:
      "OpenCV Haar Cascade locates facial regions in every live webcam frame with zero external API calls or cloud latency.",
    inputArtifact: "Real-time BGR camera frame",
    outputArtifact: "Normalized grayscale face ROI bounding box",
    snippet: `gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
faces = face_cascade.detectMultiScale(
    gray, scaleFactor=1.2, minNeighbors=5
)`,
  },
  {
    id: "recognize",
    name: "Recognize",
    eyebrow: "04 · Active Monitoring",
    headline: "Verify presence against your campus roster",
    detail:
      "LBPH computes descriptor distance for each detected face and marks recognized students present once calibrated thresholds match.",
    inputArtifact: "Face ROI + Trainner.yml histograms",
    outputArtifact: "Verified student ID & timestamp",
    snippet: `student_id, distance = recognizer.predict(gray[y:y+h, x:x+w])
if distance < configured_threshold:
    student_name = roster.get(student_id)
    attendance_df.loc[len(attendance_df)] = [student_id, student_name, date, time]`,
  },
  {
    id: "report",
    name: "Report",
    eyebrow: "05 · Data Export",
    headline: "Build clean daily CSV attendance logs",
    detail:
      "End any session to persist a structured, date-stamped CSV record containing name, ID, date, and arrival timestamp.",
    inputArtifact: "In-memory session attendance records",
    outputArtifact: "Attendance/Attendance_YYYY-MM-DD.csv",
    snippet: `filename = f"Attendance/Attendance_{today}.csv"
attendance_df.drop_duplicates(subset=["Id"], keep="first").to_csv(
    filename, index=False
)`,
  },
  {
    id: "notify",
    name: "Notify",
    eyebrow: "06 · Dispatch",
    headline: "Deliver daily reports in one click",
    detail:
      "Review today's attendance table directly in the desktop dashboard and email the CSV attachment to administrators via SMTP.",
    inputArtifact: "Daily CSV attendance file + config.ini SMTP",
    outputArtifact: "Administrator email with CSV attachment",
    snippet: `msg.attach(MIMEBase("application", "octet-stream"))
with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
    server.login(sender_email, app_password)
    server.send_message(msg)`,
  },
];

// Extended window (-4..+4) keeps incoming/outgoing slots mounted so transitions never pop
const WHEEL_OFFSETS = [-4, -3, -2, -1, 0, 1, 2, 3, 4] as const;

// Unified orbital arc geometry shared by the SVG rail, stage track nodes, and focal orb
const ORB_CENTER_X = 24;
const ARC_RADIUS = 320;
const ARC_CENTER_X = ORB_CENTER_X + ARC_RADIUS; // 344
const ARC_CENTER_Y = 190;
const STEP_ANGLE_RAD = (11.2 * Math.PI) / 180;

function arcPoint(radius: number, angleRad: number) {
  return {
    x: Number((ARC_CENTER_X - radius * Math.cos(angleRad)).toFixed(2)),
    y: Number((ARC_CENTER_Y + radius * Math.sin(angleRad)).toFixed(2)),
  };
}

function buildArcPath(radius: number, maxAngleDeg: number) {
  const rad = (maxAngleDeg * Math.PI) / 180;
  const top = arcPoint(radius, -rad);
  const bottom = arcPoint(radius, rad);
  return `M ${top.x} ${top.y} A ${radius} ${radius} 0 0 0 ${bottom.x} ${bottom.y}`;
}

const OUTER_COMPANION_ARC = buildArcPath(368, 34);
const PRIMARY_RAIL_ARC = buildArcPath(ARC_RADIUS, 36);
const ACTIVE_RAIL_ARC = buildArcPath(ARC_RADIUS, 12.5);
const RAIL_TICKS = [-2.5, -1.5, -0.5, 0.5, 1.5, 2.5].map((step) => {
  const theta = step * STEP_ANGLE_RAD;
  const inner = arcPoint(ARC_RADIUS - 3, theta);
  const outer = arcPoint(ARC_RADIUS + 3, theta);
  return { step, x1: inner.x, y1: inner.y, x2: outer.x, y2: outer.y };
});

export function WorkflowShowcase() {
  const uid = useId();
  const railFadeId = `${uid}-rail-fade`;
  const companionFadeId = `${uid}-companion-fade`;
  const activeArcId = `${uid}-active-arc`;

  const [virtualIndex, setVirtualIndex] = useState(0); // Starts at "Register" (Stage 1 of 6)
  const [statusMessage, setStatusMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [userPausedUntil, setUserPausedUntil] = useState(0);

  const count = stages.length;
  const activeIndex = ((virtualIndex % count) + count) % count;
  const activeStage = stages[activeIndex] ?? stages[0];

  const announceStage = (idx: number) => {
    const chosen = stages[idx];
    if (chosen) {
      setStatusMessage(`${chosen.eyebrow}: ${chosen.headline}`);
    }
  };

  const stepBy = (delta: number, isManual = false) => {
    if (delta === 0) return;
    if (isManual) {
      // Temporarily pause auto-advance for 6 seconds when user manually clicks/navigates
      setUserPausedUntil(Date.now() + 6000);
    }
    setVirtualIndex((prev) => {
      const next = prev + delta;
      announceStage(((next % count) + count) % count);
      return next;
    });
  };

  const selectStage = (targetIndex: number) => {
    const normalizedTarget = ((targetIndex % count) + count) % count;
    // Shortest circular path in [-2, +3] so dots rotate smoothly in the natural direction
    let delta = normalizedTarget - activeIndex;
    if (delta > count / 2) delta -= count;
    if (delta <= -count / 2) delta += count;
    stepBy(delta, true);
  };

  useEffect(() => {
    if (!autoPlay || modalOpen) return;

    const timer = window.setInterval(() => {
      if (Date.now() < userPausedUntil) {
        return;
      }
      stepBy(1, false);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [autoPlay, modalOpen, userPausedUntil]);

  const handleWheelKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      stepBy(-1, true);
    } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      stepBy(1, true);
    } else if (e.key === "Home") {
      e.preventDefault();
      selectStage(0);
    } else if (e.key === "End") {
      e.preventDefault();
      selectStage(count - 1);
    }
  };

  return (
    <section
      id="workflow"
      aria-labelledby="workflow-heading"
      className="relative py-28 md:py-40 workflow-section-glow overflow-x-clip"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        {/* Spacious Section Header */}
        <div className="max-w-2xl mb-14 md:mb-18 scroll-reveal">
          <h2
            id="workflow-heading"
            className="text-4xl sm:text-5xl lg:text-[56px] headline-tight font-semibold"
          >
            From first capture to the final report.
          </h2>
          <p className="text-muted-foreground mt-5 text-lg sm:text-xl leading-relaxed max-w-[54ch]">
            Six modular stages running locally on your machine. Select any stage in the dial to
            inspect how FaceAttend.AI processes attendance end to end.
          </p>
        </div>

        {/* Orbital Showcase Card */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="FaceAttend.AI pipeline stages"
          className="orbital-card relative rounded-3xl border border-white/10 shadow-[0_32px_80px_-24px_rgba(8,13,42,0.55)] px-6 sm:px-12 lg:px-20 py-10 md:py-16 min-h-[480px] md:min-h-[540px] grid md:grid-cols-[0.95fr_1.05fr] gap-8 md:gap-10 lg:gap-16 items-center overflow-hidden"
        >
          {/* Left Column: Unified Orbital Arc Dial */}
          <div
            className="relative h-[310px] sm:h-[370px] flex items-center justify-start select-none"
            onKeyDown={handleWheelKeyDown}
            role="group"
            aria-label="Pipeline stage selector"
          >
            <div className="relative w-full max-w-[360px] h-full">
              {/* Precision SVG Orbital Rail & Companion Arcs (exact match to stage node geometry) */}
              <svg
                aria-hidden="true"
                viewBox="0 0 360 380"
                fill="none"
                className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-[360px] h-[380px] overflow-visible"
              >
                <defs>
                  <linearGradient
                    id={railFadeId}
                    gradientUnits="userSpaceOnUse"
                    x1="0"
                    y1="10"
                    x2="0"
                    y2="370"
                  >
                    <stop offset="0%" stopColor="rgb(148 163 184)" stopOpacity="0" />
                    <stop offset="18%" stopColor="rgb(148 163 184)" stopOpacity="0.16" />
                    <stop offset="50%" stopColor="rgb(56 189 248)" stopOpacity="0.34" />
                    <stop offset="82%" stopColor="rgb(148 163 184)" stopOpacity="0.16" />
                    <stop offset="100%" stopColor="rgb(148 163 184)" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient
                    id={companionFadeId}
                    gradientUnits="userSpaceOnUse"
                    x1="0"
                    y1="16"
                    x2="0"
                    y2="364"
                  >
                    <stop offset="0%" stopColor="rgb(255 255 255)" stopOpacity="0" />
                    <stop offset="25%" stopColor="rgb(255 255 255)" stopOpacity="0.06" />
                    <stop offset="50%" stopColor="rgb(125 211 252)" stopOpacity="0.12" />
                    <stop offset="75%" stopColor="rgb(255 255 255)" stopOpacity="0.06" />
                    <stop offset="100%" stopColor="rgb(255 255 255)" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient
                    id={activeArcId}
                    gradientUnits="userSpaceOnUse"
                    x1="0"
                    y1="120"
                    x2="0"
                    y2="260"
                  >
                    <stop offset="0%" stopColor="rgb(56 189 248)" stopOpacity="0" />
                    <stop offset="50%" stopColor="rgb(125 211 252)" stopOpacity="0.72" />
                    <stop offset="100%" stopColor="rgb(56 189 248)" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <path d={OUTER_COMPANION_ARC} stroke={`url(#${companionFadeId})`} strokeWidth="1" />
                <path d={PRIMARY_RAIL_ARC} stroke={`url(#${railFadeId})`} strokeWidth="1" />
                <path
                  d={ACTIVE_RAIL_ARC}
                  stroke={`url(#${activeArcId})`}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

                {RAIL_TICKS.map((tick) => (
                  <line
                    key={tick.step}
                    x1={tick.x1}
                    y1={tick.y1}
                    x2={tick.x2}
                    y2={tick.y2}
                    stroke="rgb(148 163 184)"
                    strokeOpacity="0.22"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                ))}
              </svg>

              {/* Anchored Glowing 3D Focal Orb + Unclipped Aura + Precision Reticle */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[24px] top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center size-12"
              >
                <span className="absolute size-52 rounded-full orbital-orb-aura orbital-aura-breathe" />
                <svg
                  viewBox="0 0 68 68"
                  fill="none"
                  className="absolute size-[68px] orbital-ring-spin"
                >
                  <circle
                    cx="34"
                    cy="34"
                    r="30"
                    stroke="rgb(125 211 252)"
                    strokeOpacity="0.24"
                    strokeWidth="1"
                    strokeDasharray="6 6 2 6"
                  />
                  <line
                    x1="34"
                    y1="1"
                    x2="34"
                    y2="5.5"
                    stroke="rgb(125 211 252)"
                    strokeOpacity="0.45"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                  />
                  <line
                    x1="34"
                    y1="62.5"
                    x2="34"
                    y2="67"
                    stroke="rgb(125 211 252)"
                    strokeOpacity="0.45"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                  />
                </svg>
                <span
                  key={`ripple-${virtualIndex}`}
                  className="absolute inset-0 rounded-full border border-sky-300/60 orbital-orb-ripple"
                />
                <span className="relative size-12 rounded-full orbital-orb orbital-orb-breathe">
                  <span className="absolute top-[18%] right-[20%] size-3.5 rounded-full bg-white/55 blur-[3px]" />
                </span>
              </div>

              {WHEEL_OFFSETS.map((offset) => {
                const slotKey = virtualIndex + offset;
                const stageIdx = ((slotKey % count) + count) % count;
                const stage = stages[stageIdx];
                if (!stage) return null;

                const isActive = offset === 0;
                const absOffset = Math.abs(offset);
                const theta = offset * STEP_ANGLE_RAD;

                // Exact position on the shared R=320 circular orbital rail
                const translateX = Number((ARC_RADIUS * (1 - Math.cos(theta))).toFixed(2));
                const translateY = Number((ARC_RADIUS * Math.sin(theta)).toFixed(2));
                const scale = isActive ? 1 : absOffset === 1 ? 0.88 : absOffset === 2 ? 0.76 : 0.66;
                const opacity = isActive ? 1 : absOffset === 1 ? 0.84 : absOffset === 2 ? 0.52 : 0;

                return (
                  <button
                    key={`slot-${slotKey}`}
                    type="button"
                    onClick={() => stepBy(offset, true)}
                    aria-current={isActive ? "true" : undefined}
                    aria-label={`${stage.eyebrow}: ${stage.name}`}
                    aria-hidden={absOffset > 2 ? true : undefined}
                    tabIndex={absOffset <= 2 ? 0 : -1}
                    style={{
                      transformOrigin: `${ORB_CENTER_X}px 50%`,
                      transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                      opacity,
                    }}
                    className={`orbital-wheel-item group absolute left-0 top-[calc(50%-28px)] h-14 pr-4 flex items-center text-left rounded-xl focus-visible:outline-2 focus-visible:outline-sky-400 focus-visible:outline-offset-4 ${
                      absOffset > 2
                        ? "pointer-events-none"
                        : isActive
                          ? "cursor-default"
                          : "cursor-pointer"
                    } ${isActive ? "text-white z-20" : "text-sky-100/90 hover:text-white z-10"}`}
                  >
                    {/* Track Node Dot aligned to ORB_CENTER_X (24px) */}
                    <span
                      aria-hidden="true"
                      className="w-12 shrink-0 flex items-center justify-center"
                    >
                      <span
                        className={`rounded-full transition-all duration-300 ${
                          isActive
                            ? "size-2 bg-sky-200 opacity-0 scale-50"
                            : absOffset === 1
                              ? "size-2.5 bg-sky-300/85 ring-2 ring-[#070b24]/80 shadow-[0_0_8px_rgba(56,189,248,0.45)] group-hover:scale-125 group-hover:bg-sky-300"
                              : "size-2 bg-slate-300/70 ring-2 ring-[#070b24]/80 group-hover:scale-125 group-hover:bg-sky-300"
                        }`}
                      />
                    </span>

                    <span
                      className={`ml-4 font-display tracking-[-0.025em] leading-none transition-all duration-300 ${
                        isActive
                          ? "text-[32px] sm:text-[42px] lg:text-[48px] font-semibold drop-shadow-[0_2px_18px_rgba(56,189,248,0.22)]"
                          : "text-[28px] sm:text-[36px] lg:text-[40px] font-medium"
                      }`}
                    >
                      {stage.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Animated Active Stage Details + Signature Blue CTA */}
          <div className="relative z-10 flex flex-col items-start justify-center">
            <div key={activeStage.id} className="stage-content-in">
              <p className="font-display text-sm sm:text-base font-semibold tracking-tight text-sky-200/90 mb-4">
                {activeStage.eyebrow}
              </p>

              <h3 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-[-0.025em] text-white leading-[1.1] max-w-[19ch]">
                {activeStage.headline}
              </h3>

              <p className="text-white/80 mt-5 text-base sm:text-[18px] leading-[1.65] max-w-[44ch]">
                {activeStage.detail}
              </p>
            </div>

            {/* Signature Bright Blue CTA with crisp white inner arrow square */}
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="tactile-btn group mt-8 inline-flex items-center gap-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-[15px] font-semibold pl-5 pr-2 py-2 shadow-lg shadow-primary/30 cursor-pointer"
            >
              <span>Learn more</span>
              <span
                aria-hidden="true"
                className="size-8 rounded-lg bg-white text-primary flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <ArrowRight className="size-4" />
              </span>
            </button>

            {/* Stage step dots for direct random access */}
            <nav aria-label="Choose a workflow stage" className="flex items-center gap-1.5 mt-6">
              {stages.map((stage, idx) => {
                const selected = idx === activeIndex;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => selectStage(idx)}
                    aria-label={`Go to stage ${idx + 1}: ${stage.name}`}
                    aria-current={selected ? "true" : undefined}
                    className="min-w-7 min-h-11 flex items-center justify-center cursor-pointer rounded-full group"
                  >
                    <span
                      className={`h-2 rounded-full transition-all duration-300 ease-out overflow-hidden relative ${
                        selected
                          ? "w-8 bg-sky-950/70 border border-sky-400/50"
                          : "w-2 bg-white/35 group-hover:bg-white/65"
                      }`}
                    >
                      {selected && (
                        <span
                          key={`prog-${virtualIndex}`}
                          className={`absolute inset-0 bg-sky-400 rounded-full origin-left ${
                            autoPlay && !modalOpen ? "workflow-dot-progress" : "w-full"
                          }`}
                        />
                      )}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          <p className="visually-hidden" role="status" aria-live="polite">
            {statusMessage}
          </p>
        </div>

        {/* Bottom Bar: Readable Sans Caption + Playback & Prev/Next Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
          <div className="flex flex-wrap items-center gap-3 text-sm sm:text-[15px] text-foreground/75 font-medium">
            <span className="inline-flex items-center rounded-full bg-secondary px-3.5 py-1 text-sm font-semibold text-foreground border border-border/80 tabular-nums">
              Stage {activeIndex + 1} of {count}
            </span>
            <span>Runs 100% locally on your webcam &amp; CPU</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={autoPlay ? "Pause stage rotation" : "Play stage rotation"}
              aria-pressed={!autoPlay}
              onClick={() => setAutoPlay((prev) => !prev)}
              className="tactile-btn touch-manipulation h-11 px-3.5 rounded-lg border border-border bg-card hover:bg-secondary text-foreground inline-flex items-center gap-2 text-sm font-medium shadow-xs cursor-pointer"
            >
              {autoPlay ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
              <span className="hidden sm:inline">{autoPlay ? "Pause" : "Auto-play"}</span>
            </button>
            <button
              type="button"
              aria-label="Previous workflow stage"
              onClick={() => stepBy(-1, true)}
              className="tactile-btn touch-manipulation size-11 rounded-lg border border-border bg-card hover:bg-secondary text-foreground flex items-center justify-center shadow-xs cursor-pointer"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next workflow stage"
              onClick={() => stepBy(1, true)}
              className="tactile-btn touch-manipulation size-11 rounded-lg border border-border bg-card hover:bg-secondary text-foreground flex items-center justify-center shadow-xs cursor-pointer"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Stage Deep-Dive Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl bg-night text-night-foreground border-white/15">
          <span className="eyebrow text-sky mb-1">{activeStage.eyebrow}</span>
          <DialogTitle className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            {activeStage.name}: {activeStage.headline}
          </DialogTitle>
          <DialogDescription className="text-white/80 text-base leading-relaxed">
            {activeStage.detail}
          </DialogDescription>

          <div className="grid sm:grid-cols-2 gap-3 my-2">
            <div className="rounded-xl bg-white/5 border border-white/10 p-4">
              <p className="eyebrow text-white/75 flex items-center gap-1.5 mb-2">
                <Cpu className="size-4 text-sky" /> Input
              </p>
              <p className="text-sm sm:text-[15px] text-white/95">{activeStage.inputArtifact}</p>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-4">
              <p className="eyebrow text-white/75 flex items-center gap-1.5 mb-2">
                <FileOutput className="size-4 text-sky" /> Output
              </p>
              <p className="text-sm font-mono text-sky-200">{activeStage.outputArtifact}</p>
            </div>
          </div>

          <div className="rounded-xl bg-black/50 border border-white/10 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
              <span className="eyebrow text-white/75 flex items-center gap-1.5">
                <Code2 className="size-4 text-sky" /> Pipeline implementation
              </span>
              <span className="text-sm font-medium text-white/75">Python · OpenCV</span>
            </div>
            <pre className="p-4 overflow-x-auto text-xs sm:text-sm leading-relaxed text-sky-100 font-mono">
              <code>{activeStage.snippet}</code>
            </pre>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <span className="inline-flex items-center gap-1.5 text-sm text-white/80">
              <CheckCircle2 className="size-4 text-sky" /> Verified in core desktop workflow
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => stepBy(1)}
                className="tactile-btn rounded-lg border border-white/15 bg-white/10 hover:bg-white/15 px-4 py-2 text-sm font-medium text-white cursor-pointer"
              >
                Next stage →
              </button>
              <a
                href="#technology"
                onClick={() => setModalOpen(false)}
                className="tactile-btn rounded-lg bg-primary hover:bg-primary/90 px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                View full architecture
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
