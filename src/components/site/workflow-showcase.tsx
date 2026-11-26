"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Code2, Cpu, FileOutput } from "lucide-react";
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

// Visible slots relative to active center (-3..+3) for the vertical orbital arc
const WHEEL_OFFSETS = [-3, -2, -1, 0, 1, 2, 3] as const;

export function WorkflowShowcase() {
  const [activeIndex, setActiveIndex] = useState(3); // Default to "Recognize" or "Train"
  const [statusMessage, setStatusMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const count = stages.length;
  const activeStage = stages[activeIndex] ?? stages[0];

  const selectStage = (nextIndex: number) => {
    const normalized = ((nextIndex % count) + count) % count;
    setActiveIndex(normalized);
    const chosen = stages[normalized];
    if (chosen) {
      setStatusMessage(`${chosen.eyebrow}: ${chosen.headline}`);
    }
  };

  const handleWheelKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      selectStage(activeIndex - 1);
    } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      selectStage(activeIndex + 1);
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
          <h2 id="workflow-heading" className="text-4xl sm:text-5xl lg:text-[54px] headline-tight font-medium">
            From first capture to the final report.
          </h2>
          <p className="text-muted-foreground mt-5 text-lg leading-relaxed max-w-[54ch]">
            Six modular stages running locally on your machine. Select any stage in the dial to
            inspect how FaceAttend.AI processes attendance end to end.
          </p>
        </div>

        {/* Orbital Showcase Card (matching reference element design) */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="FaceAttend.AI pipeline stages"
          className="orbital-card relative rounded-3xl border border-white/10 shadow-[0_32px_80px_-24px_rgba(8,13,42,0.5)] px-6 sm:px-12 lg:px-20 py-12 md:py-16 min-h-[460px] md:min-h-[520px] grid md:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-16 items-center overflow-hidden"
        >
          {/* Left Column: Curved Orbital Wheel */}
          <div
            className="relative h-[320px] sm:h-[360px] flex items-center justify-center md:justify-start orbital-wheel-mask select-none"
            onKeyDown={handleWheelKeyDown}
            role="group"
            aria-label="Pipeline stage selector"
          >
            <div className="relative w-full max-w-[340px] h-full flex items-center">
              {WHEEL_OFFSETS.map((offset) => {
                const idx = (((activeIndex + offset) % count) + count) % count;
                const stage = stages[idx];
                if (!stage) return null;

                const isActive = offset === 0;
                const absOffset = Math.abs(offset);

                // Subtle orbital curve matching the reference wheel geometry
                const translateY = offset * 56;
                const translateX =
                  offset === 0 ? 0 : absOffset === 1 ? 6 : absOffset === 2 ? 18 : 34;
                const rotateZ = offset * 2.4;
                const scale = isActive ? 1 : absOffset === 1 ? 0.88 : absOffset === 2 ? 0.8 : 0.72;
                const opacity = isActive ? 1 : absOffset === 1 ? 0.72 : absOffset === 2 ? 0.55 : 0.22;

                return (
                  <button
                    key={`${offset}-${stage.id}`}
                    type="button"
                    onClick={() => selectStage(activeIndex + offset)}
                    aria-current={isActive ? "true" : undefined}
                    aria-label={`${stage.eyebrow}: ${stage.name}`}
                    aria-hidden={absOffset > 2 ? true : undefined}
                    tabIndex={absOffset <= 2 ? 0 : -1}
                    style={{
                      transform: `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotateZ}deg) scale(${scale})`,
                      opacity,
                    }}
                    className={`absolute left-0 origin-left flex items-center gap-5 py-1.5 text-left transition-[transform,opacity,color] duration-400 ease-out cursor-pointer rounded-lg focus-visible:outline-2 focus-visible:outline-sky-400 focus-visible:outline-offset-4 ${
                      isActive
                        ? "text-white font-normal z-20"
                        : "text-white/90 hover:text-white/60 font-normal z-10"
                    }`}
                  >
                    {/* Glowing 3D Blue Orb indicator next to active stage */}
                    <span
                      aria-hidden="true"
                      className={`shrink-0 rounded-full transition-all duration-400 ${
                        isActive
                          ? "size-9 sm:size-11 orbital-orb scale-100 opacity-100"
                          : "size-9 sm:size-11 scale-50 opacity-0 -ml-2"
                      }`}
                    />
                    <span
                      className={`tracking-tight leading-none ${
                        isActive
                          ? "text-[34px] sm:text-[44px] lg:text-[48px]"
                          : "text-[28px] sm:text-[36px] lg:text-[40px]"
                      }`}
                    >
                      {stage.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Stage Details + Signature Blue CTA */}
          <div className="relative z-10 flex flex-col items-start justify-center">
            <div className="inline-flex items-center gap-2.5 mb-5">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
              <span className="eyebrow text-white/80 tracking-[0.1em]">{activeStage.eyebrow}</span>
            </div>

            <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-white leading-[1.12] max-w-[18ch]">
              {activeStage.headline}
            </h3>

            <p className="text-white/75 mt-5 text-base sm:text-lg leading-relaxed max-w-[44ch]">
              {activeStage.detail}
            </p>

            {/* Signature Bright Blue CTA with crisp white inner arrow square */}
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="tactile-btn mt-8 inline-flex items-center gap-4 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium pl-5 pr-2 py-2 shadow-lg shadow-primary/25 cursor-pointer"
            >
              <span>Learn more</span>
              <span
                aria-hidden="true"
                className="size-8 rounded-md bg-white text-primary flex items-center justify-center"
              >
                <ArrowRight className="size-4" />
              </span>
            </button>

            {/* Subtle stage step dots for direct random access */}
            <nav aria-label="Choose a workflow stage" className="flex items-center gap-1 mt-6">
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
                      className={`h-2 rounded-full transition-all duration-200 ${
                        selected
                          ? "w-7 bg-primary"
                          : "w-2 bg-white/35 group-hover:bg-white/60"
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

        {/* Bottom Bar: Caption + Square Previous / Next Controls matching reference */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-5">
          <span className="text-xs text-muted-foreground font-mono">
            Stage {activeIndex + 1} of {count} · Runs 100% locally on your webcam & CPU
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous workflow stage"
              onClick={() => selectStage(activeIndex - 1)}
              className="tactile-btn touch-manipulation size-11 rounded-lg border border-border bg-card hover:bg-secondary text-foreground flex items-center justify-center shadow-xs cursor-pointer"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next workflow stage"
              onClick={() => selectStage(activeIndex + 1)}
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
          <div className="inline-flex items-center gap-2 mb-1">
            <span className="size-2 rounded-full bg-primary" />
            <span className="eyebrow text-sky">{activeStage.eyebrow}</span>
          </div>
          <DialogTitle className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
            {activeStage.name}: {activeStage.headline}
          </DialogTitle>
          <DialogDescription className="text-white/80 text-base leading-relaxed">
            {activeStage.detail}
          </DialogDescription>

          <div className="grid sm:grid-cols-2 gap-3 my-2">
            <div className="rounded-xl bg-white/5 border border-white/10 p-4">
              <p className="eyebrow text-white/75 flex items-center gap-1.5 mb-2">
                <Cpu className="size-3.5 text-sky" /> Input
              </p>
              <p className="text-sm text-white/95">{activeStage.inputArtifact}</p>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-4">
              <p className="eyebrow text-white/75 flex items-center gap-1.5 mb-2">
                <FileOutput className="size-3.5 text-lime" /> Output
              </p>
              <p className="text-sm font-mono text-lime">{activeStage.outputArtifact}</p>
            </div>
          </div>

          <div className="rounded-xl bg-black/50 border border-white/10 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
              <span className="eyebrow text-white/75 flex items-center gap-1.5">
                <Code2 className="size-3.5 text-sky" /> Pipeline implementation
              </span>
              <span className="text-[11px] font-mono text-white/75">Python · OpenCV</span>
            </div>
            <pre className="p-4 overflow-x-auto text-xs sm:text-sm leading-relaxed text-sky-100 font-mono">
              <code>{activeStage.snippet}</code>
            </pre>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <span className="inline-flex items-center gap-1.5 text-xs text-white/80">
              <CheckCircle2 className="size-3.5 text-lime" /> Verified in core desktop workflow
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => selectStage(activeIndex + 1)}
                className="tactile-btn rounded-lg border border-white/15 bg-white/10 hover:bg-white/15 px-3.5 py-2 text-xs font-medium text-white cursor-pointer"
              >
                Next stage →
              </button>
              <a
                href="#technology"
                onClick={() => setModalOpen(false)}
                className="tactile-btn rounded-lg bg-primary hover:bg-primary/90 px-3.5 py-2 text-xs font-medium text-primary-foreground"
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
