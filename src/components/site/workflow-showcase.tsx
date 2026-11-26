"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Code2, Cpu, FileOutput, Pause, Play } from "lucide-react";
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

export function WorkflowShowcase() {
  const [virtualIndex, setVirtualIndex] = useState(3); // Starts at "Recognize" (Stage 4 of 6)
  const [statusMessage, setStatusMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);

  const count = stages.length;
  const activeIndex = ((virtualIndex % count) + count) % count;
  const activeStage = stages[activeIndex] ?? stages[0];

  const announceStage = (idx: number) => {
    const chosen = stages[idx];
    if (chosen) {
      setStatusMessage(`${chosen.eyebrow}: ${chosen.headline}`);
    }
  };

  const stepBy = (delta: number) => {
    if (delta === 0) return;
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
    stepBy(delta);
  };

  useEffect(() => {
    if (!autoPlay || isInteracting || modalOpen) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setVirtualIndex((prev) => prev + 1);
    }, 4800);

    return () => window.clearInterval(timer);
  }, [autoPlay, isInteracting, modalOpen]);

  const handleWheelKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      stepBy(-1);
    } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      stepBy(1);
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
          <p className="eyebrow text-muted-foreground mb-4">03 / Intelligent workflow</p>
          <h2 id="workflow-heading" className="text-4xl sm:text-5xl lg:text-[56px] headline-tight font-semibold">
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
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
          onFocusCapture={() => setIsInteracting(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setIsInteracting(false);
            }
          }}
          className="orbital-card relative rounded-3xl border border-white/10 shadow-[0_32px_80px_-24px_rgba(8,13,42,0.55)] px-6 sm:px-12 lg:px-20 py-12 md:py-16 min-h-[480px] md:min-h-[540px] grid md:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-16 items-center overflow-hidden"
        >
          {/* Decorative Ambient Orbital Rings */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-36 top-1/2 -translate-y-1/2 size-[520px] rounded-full border border-white/[0.04] orbital-ring-spin"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 size-[380px] rounded-full border border-sky-400/[0.07]"
          />

          {/* Left Column: Curved Orbital Wheel */}
          <div
            className="relative h-[340px] sm:h-[380px] flex items-center justify-center md:justify-start orbital-wheel-mask select-none"
            onKeyDown={handleWheelKeyDown}
            role="group"
            aria-label="Pipeline stage selector"
          >
            <div className="relative w-full max-w-[360px] h-full flex items-center">
              {/* Anchored Glowing 3D Orb + Ripple Ring at Active Focal Slot */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center size-10 sm:size-12"
              >
                <span
                  key={`ripple-${virtualIndex}`}
                  className="absolute inset-0 rounded-full border border-sky-400/55 orbital-orb-ripple"
                />
                <span className="relative size-10 sm:size-12 rounded-full orbital-orb orbital-orb-breathe" />
              </div>

              {WHEEL_OFFSETS.map((offset) => {
                const slotKey = virtualIndex + offset;
                const stageIdx = ((slotKey % count) + count) % count;
                const stage = stages[stageIdx];
                if (!stage) return null;

                const isActive = offset === 0;
                const absOffset = Math.abs(offset);

                // Smooth curved orbital arc geometry
                const translateY = offset * 62;
                const translateX =
                  offset === 0
                    ? 0
                    : absOffset === 1
                      ? 12
                      : absOffset === 2
                        ? 30
                        : absOffset === 3
                          ? 54
                          : 80;
                const rotateZ = offset * 2.5;
                const scale =
                  isActive ? 1 : absOffset === 1 ? 0.85 : absOffset === 2 ? 0.74 : absOffset === 3 ? 0.64 : 0.56;
                const opacity =
                  isActive ? 1 : absOffset === 1 ? 0.72 : absOffset === 2 ? 0.44 : absOffset === 3 ? 0.14 : 0;

                return (
                  <button
                    key={`slot-${slotKey}`}
                    type="button"
                    onClick={() => stepBy(offset)}
                    aria-current={isActive ? "true" : undefined}
                    aria-label={`${stage.eyebrow}: ${stage.name}`}
                    aria-hidden={absOffset > 2 ? true : undefined}
                    tabIndex={absOffset <= 2 ? 0 : -1}
                    style={{
                      transform: `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotateZ}deg) scale(${scale})`,
                      opacity,
                    }}
                    className={`orbital-wheel-item absolute left-0 pl-14 sm:pl-16 origin-left flex items-center py-2 text-left rounded-xl focus-visible:outline-2 focus-visible:outline-sky-400 focus-visible:outline-offset-4 ${
                      absOffset > 2 ? "pointer-events-none" : "cursor-pointer"
                    } ${
                      isActive
                        ? "text-white z-20 drop-shadow-[0_2px_18px_rgba(96,165,250,0.35)]"
                        : "text-white/85 hover:text-white z-10"
                    }`}
                  >
                    <span
                      className={`font-display tracking-[-0.025em] leading-none transition-all duration-300 ${
                        isActive
                          ? "text-[36px] sm:text-[46px] lg:text-[52px] font-semibold"
                          : "text-[30px] sm:text-[38px] lg:text-[42px] font-medium"
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
              <p className="font-display text-[13px] sm:text-sm font-semibold tracking-[0.12em] uppercase text-sky-200/85 mb-5">
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
                      className={`h-2 rounded-full transition-all duration-300 ease-out ${
                        selected
                          ? "w-8 bg-primary shadow-[0_0_12px_rgba(37,99,235,0.7)]"
                          : "w-2 bg-white/35 group-hover:bg-white/65"
                      }`}
                    />
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
              onClick={() => stepBy(-1)}
              className="tactile-btn touch-manipulation size-11 rounded-lg border border-border bg-card hover:bg-secondary text-foreground flex items-center justify-center shadow-xs cursor-pointer"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next workflow stage"
              onClick={() => stepBy(1)}
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
              <span className="text-xs sm:text-sm font-medium text-white/75">Python · OpenCV</span>
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
