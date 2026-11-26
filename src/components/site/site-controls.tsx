"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Menu,
  Play,
  ScanFace,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { contactSchema, developerEmail, repoUrl } from "@/lib/product";

export const navItems = ["Overview", "Features", "Workflow", "Technology", "Use Cases", "Pricing"];

export function Brand({ large = false }: { large?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 font-bold tracking-tight leading-none ${
        large ? "text-3xl" : "text-lg sm:text-xl"
      }`}
    >
      <ScanFace className={large ? "size-9" : "size-6 sm:size-7"} strokeWidth={1.8} />
      <span className="inline-flex items-baseline leading-none">
        FaceAttend<span className="font-semibold opacity-60">.AI</span>
      </span>
    </span>
  );
}

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuId = useId();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.toLowerCase().replace(" ", "-"));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-4 sm:top-6 left-0 right-0 z-40 px-4 md:px-10">
      <div className="mx-auto max-w-[1240px] rounded-full bg-background/85 backdrop-blur-xl px-5 sm:px-6 py-3 soft-shadow flex items-center justify-between gap-4 border border-border/70">
        <a
          href="#top"
          aria-label="FaceAttend.AI home"
          className="inline-flex items-center min-w-0 shrink-0"
        >
          <Brand />
        </a>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const id = item.toLowerCase().replace(" ", "-");
            const isCurrent = active === id;
            return (
              <a
                key={item}
                href={`#${id}`}
                className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  isCurrent
                    ? "bg-night text-night-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                }`}
                aria-current={isCurrent ? "location" : undefined}
              >
                {item}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            asChild
            variant="night"
            className="hidden lg:inline-flex rounded-full px-5 h-9 font-bold"
          >
            <a href={repoUrl} target="_blank" rel="noreferrer">
              <Github className="size-4" /> GitHub <ArrowUpRight className="size-3.5" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen(!open)}
            className="lg:hidden shrink-0 rounded-full size-11"
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open && (
        <nav
          id={menuId}
          aria-label="Mobile navigation"
          className="mx-auto max-w-[1240px] mt-2 rounded-2xl bg-background/95 backdrop-blur-xl border border-border p-4 shadow-xl grid gap-1 lg:hidden"
        >
          {navItems.map((item) => {
            const id = item.toLowerCase().replace(" ", "-");
            return (
              <a
                key={item}
                onClick={() => setOpen(false)}
                href={`#${id}`}
                className="py-2.5 px-3 rounded-lg text-sm font-bold text-foreground hover:bg-secondary hover:text-primary transition-colors"
              >
                {item}
              </a>
            );
          })}
          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-1 py-2.5 px-3 rounded-lg text-sm font-bold bg-night text-night-foreground inline-flex items-center justify-between"
          >
            <span>GitHub Repository</span>
            <ArrowUpRight className="size-4" />
          </a>
        </nav>
      )}
    </header>
  );
}

export function Demo({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);

  return (
    <>
      <Button
        variant={compact ? "glass" : "hero"}
        size={compact ? "xl" : "lg"}
        className="tactile-btn"
        onClick={() => {
          setReady(false);
          setError(false);
          setOpen(true);
        }}
      >
        <Play className="size-4" fill="currentColor" />
        {compact ? "Watch Demo" : "Watch the walkthrough"}
        <span className="text-sm tabular-nums opacity-70">0:21</span>
      </Button>

      <WalkthroughDialog
        open={open}
        onOpenChange={setOpen}
        ready={ready}
        setReady={setReady}
        error={error}
        setError={setError}
      />
    </>
  );
}

export function HeroWalkthroughCard() {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);

  return (
    <>
      <div className="animate-float">
        <button
          type="button"
          onClick={() => {
            setReady(false);
            setError(false);
            setOpen(true);
          }}
          aria-label="Play system walkthrough video (0:21)"
          className="tactile-btn text-left flex items-center gap-4 bg-white/10 hover:bg-white/18 backdrop-blur-xl border border-white/20 p-3.5 pr-6 rounded-2xl soft-shadow transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 group cursor-pointer"
        >
          <div className="relative size-16 rounded-xl overflow-hidden shrink-0 bg-night border border-white/20">
            <Image
              src="/assets/faceattend-demo.jpg"
              alt=""
              width={1080}
              height={1920}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors" />
            <div className="absolute inset-0 pointer-events-none animate-scanner-bar">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-sky-400/90" />
            </div>
          </div>
          <div>
            <p className="text-base font-medium text-white leading-tight">System Walkthrough</p>
            <p className="text-sm text-white/75 mt-1">Live Facial Recognition</p>
            <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-sm text-white tabular-nums">
              <Play className="size-3 fill-white" /> 0:21
            </span>
          </div>
        </button>
      </div>

      <WalkthroughDialog
        open={open}
        onOpenChange={setOpen}
        ready={ready}
        setReady={setReady}
        error={error}
        setError={setError}
      />
    </>
  );
}

function WalkthroughDialog({
  open,
  onOpenChange,
  ready,
  setReady,
  error,
  setError,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  ready: boolean;
  setReady: (v: boolean) => void;
  error: boolean;
  setError: (v: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-night text-night-foreground border-white/15">
        <DialogTitle>System Walkthrough</DialogTitle>
        <DialogDescription className="text-night-foreground/75">
          Registration, model training, live face recognition, and attendance reporting.
        </DialogDescription>
        {!ready && !error && (
          <p role="status" className="text-sm text-night-foreground/65">
            Loading High-Res Demo...
          </p>
        )}
        {error ? (
          <p role="alert" className="text-destructive">
            The video could not load.{" "}
            <a href="/assets/faceattend-walkthrough.mp4" className="underline">
              Open direct video
            </a>{" "}
            or{" "}
            <a href={repoUrl} className="underline" target="_blank" rel="noreferrer">
              view on GitHub
            </a>
            .
          </p>
        ) : (
          <video
            controls
            autoPlay
            playsInline
            preload="metadata"
            poster="/assets/faceattend-demo.jpg"
            onLoadedData={() => setReady(true)}
            onError={() => setError(true)}
            className="w-full rounded-lg aspect-video bg-black"
          >
            <source src="/assets/faceattend-walkthrough.mp4" type="video/mp4" />
            <track kind="captions" src="/walkthrough.vtt" srcLang="en" label="English" default />
          </video>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function CopyCode({ code, title }: { code: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className="bg-night text-night-foreground rounded-2xl overflow-hidden border border-white/10 shadow-lg">
      <div className="flex items-center justify-between border-b border-night-foreground/15 px-5 py-3.5">
        <span className="text-xs font-mono text-white/70">{title}</span>
        <Button
          variant="glass"
          size="icon"
          aria-label={`Copy ${title}`}
          title={`Copy ${title}`}
          className="tactile-btn size-11"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(code);
              setCopied(true);
              setFailed(false);
              setTimeout(() => setCopied(false), 2200);
            } catch {
              setFailed(true);
            }
          }}
        >
          {copied ? <Check /> : <Copy />}
        </Button>
      </div>
      <pre className="p-5 overflow-auto text-[12px] sm:text-sm leading-7 font-mono">
        <code>{code}</code>
      </pre>
      <span role="status" className="sr-only">
        {copied
          ? "Copied to clipboard"
          : failed
            ? "Copy unavailable. Select the code to copy it."
            : ""}
      </span>
    </div>
  );
}

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export function ContactForm() {
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const nameId = useId();
  const emailId = useId();
  const emailHintId = useId();
  const messageId = useId();

  const validateField = (field: keyof FieldErrors, value: string): string | undefined => {
    const trimmed = value.trim();
    if (field === "name" && trimmed.length === 0) return "Enter your full name.";
    if (field === "email") {
      if (trimmed.length === 0) return "Enter your email address.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        return "Enter an email address in the format you@institution.com.";
      }
    }
    if (field === "message" && trimmed.length === 0)
      return "Enter a brief description of your requirement.";
    return undefined;
  };

  const handleBlur = (field: keyof FieldErrors, value: string) => {
    const err = validateField(field, value);
    setFieldErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleInput = (field: keyof FieldErrors, value: string) => {
    if (fieldErrors[field]) {
      const err = validateField(field, value);
      if (!err) {
        setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    }
  };

  return (
    <form
      ref={formRef}
      noValidate
      aria-labelledby="contact-heading"
      className="grid gap-6 bg-card p-7 sm:p-9 rounded-2xl border shadow-xs"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);
        const raw = {
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          message: String(fd.get("message") ?? ""),
          website: String(fd.get("website") ?? ""),
        };

        const nextErrors: FieldErrors = {
          name: validateField("name", raw.name),
          email: validateField("email", raw.email),
          message: validateField("message", raw.message),
        };

        const result = contactSchema.safeParse(raw);
        if (!result.success || nextErrors.name || nextErrors.email || nextErrors.message) {
          setFieldErrors(nextErrors);
          setSuccess(false);
          setStatus(
            nextErrors.name ??
              nextErrors.email ??
              nextErrors.message ??
              result.error?.issues[0]?.message ??
              "Please check your details.",
          );

          // Route focus to first invalid field
          const firstInvalidName = nextErrors.name
            ? "name"
            : nextErrors.email
              ? "email"
              : "message";
          const target = form.elements.namedItem(firstInvalidName) as HTMLElement | null;
          target?.focus();
          return;
        }

        setFieldErrors({});
        setPending(true);
        setStatus("");

        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result.data),
          });

          if (!res.ok) {
            throw new Error("Server rejected submission");
          }

          setSuccess(true);
          setStatus("Your message has been received. Thank you for getting in touch.");
          form.reset();
          setFieldErrors({});
        } catch {
          setSuccess(false);
          setStatus(`We could not save your message. Please try again or email ${developerEmail}.`);
        } finally {
          setPending(false);
        }
      }}
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={nameId} className="text-sm font-medium text-foreground">
            Full Name{" "}
            <span aria-hidden="true" className="text-destructive">
              *
            </span>
          </label>
          <input
            id={nameId}
            name="name"
            autoComplete="name"
            enterKeyHint="next"
            required
            maxLength={100}
            aria-invalid={fieldErrors.name ? "true" : "false"}
            aria-describedby={fieldErrors.name ? `${nameId}-error` : undefined}
            onBlur={(e) => handleBlur("name", e.currentTarget.value)}
            onChange={(e) => handleInput("name", e.currentTarget.value)}
            placeholder="Your name"
            className={`field-control w-full min-h-[48px] rounded-xl border bg-background px-3.5 py-2.5 text-base ${
              fieldErrors.name ? "user-invalid-fallback" : ""
            }`}
          />
          {fieldErrors.name && (
            <p
              id={`${nameId}-error`}
              className="text-sm text-destructive flex items-center gap-1.5 mt-0.5"
            >
              <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
              <span>{fieldErrors.name}</span>
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={emailId} className="text-sm font-medium text-foreground">
            Email Address{" "}
            <span aria-hidden="true" className="text-destructive">
              *
            </span>
          </label>
          <span id={emailHintId} className="text-sm text-muted-foreground">
            Format: you@institution.com
          </span>
          <input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            enterKeyHint="next"
            required
            maxLength={255}
            aria-invalid={fieldErrors.email ? "true" : "false"}
            aria-describedby={fieldErrors.email ? `${emailHintId} ${emailId}-error` : emailHintId}
            onBlur={(e) => handleBlur("email", e.currentTarget.value)}
            onChange={(e) => handleInput("email", e.currentTarget.value)}
            placeholder="you@institution.com"
            className={`field-control w-full min-h-[48px] rounded-xl border bg-background px-3.5 py-2.5 text-base ${
              fieldErrors.email ? "user-invalid-fallback" : ""
            }`}
          />
          {fieldErrors.email && (
            <p
              id={`${emailId}-error`}
              className="text-sm text-destructive flex items-center gap-1.5 mt-0.5"
            >
              <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
              <span>{fieldErrors.email}</span>
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={messageId} className="text-sm font-medium text-foreground">
          Message{" "}
          <span aria-hidden="true" className="text-destructive">
            *
          </span>
        </label>
        <textarea
          id={messageId}
          name="message"
          required
          maxLength={2000}
          rows={4}
          enterKeyHint="done"
          aria-invalid={fieldErrors.message ? "true" : "false"}
          aria-describedby={fieldErrors.message ? `${messageId}-error` : undefined}
          onBlur={(e) => handleBlur("message", e.currentTarget.value)}
          onChange={(e) => handleInput("message", e.currentTarget.value)}
          placeholder="Tell us about your requirement"
          className={`field-control w-full rounded-xl border bg-background px-3.5 py-3 text-base resize-y ${
            fieldErrors.message ? "user-invalid-fallback" : ""
          }`}
        />
        {fieldErrors.message && (
          <p
            id={`${messageId}-error`}
            className="text-sm text-destructive flex items-center gap-1.5 mt-0.5"
          >
            <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
            <span>{fieldErrors.message}</span>
          </p>
        )}
      </div>

      {/* Spam honeypot: hidden from visitors and assistive tech */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <span className="text-sm text-muted-foreground">
          Your details are used solely to respond to your inquiry.
        </span>
        <Button size="xl" type="submit" disabled={pending} className="tactile-btn rounded-xl">
          {pending ? "Sending…" : "Send Message"}
          <ArrowUpRight />
        </Button>
      </div>

      {status && (
        <p
          role={success ? "status" : "alert"}
          aria-live="polite"
          className={
            success
              ? "text-sm font-medium text-foreground bg-secondary border border-primary/30 rounded-xl px-4 py-3"
              : "text-sm font-medium text-destructive bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3"
          }
        >
          {status}
        </p>
      )}
    </form>
  );
}
