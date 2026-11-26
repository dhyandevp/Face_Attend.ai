"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Copy, Github, Menu, Play, ScanFace, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { contactSchema, repoUrl } from "@/lib/product";

export const navItems = ["Overview", "Features", "Pricing", "Workflow", "Technology", "Use Cases"];

export function Brand({ large = false }: { large?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-semibold ${large ? "text-3xl" : "text-xl"}`}
    >
      <ScanFace className={large ? "size-9" : "size-7"} strokeWidth={1.7} />
      FaceAttend<span className="font-normal opacity-60 -ml-2">.AI</span>
    </span>
  );
}

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.toLowerCase().replace(" ", "-"));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-5 left-0 right-0 z-40 px-4 md:px-10">
      <div className="mx-auto max-w-[1240px] rounded-lg bg-background/90 backdrop-blur-xl px-5 py-4 soft-shadow grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 lg:flex lg:justify-between border border-border/50">
        <a href="#top" aria-label="FaceAttend.AI home" className="min-w-0">
          <Brand />
        </a>
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => {
            const id = item.toLowerCase().replace(" ", "-");
            return (
              <a
                key={item}
                href={`#${id}`}
                className={`text-[13px] transition-colors hover:text-primary ${active === id ? "text-primary font-medium" : "text-muted-foreground"}`}
                aria-current={active === id ? "location" : undefined}
              >
                {item}
              </a>
            );
          })}
        </nav>
        <Button asChild variant="night" className="hidden lg:inline-flex">
          <a href={repoUrl} target="_blank" rel="noreferrer">
            <Github className="size-4" /> GitHub <ArrowUpRight className="size-3" />
          </a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="lg:hidden shrink-0"
        >
          {open ? <X /> : <Menu />}
        </Button>
        {open && (
          <nav
            aria-label="Mobile navigation"
            className="col-span-2 grid gap-1 lg:hidden border-t pt-3"
          >
            {navItems.map((item) => (
              <a
                key={item}
                onClick={() => setOpen(false)}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="py-2 text-sm text-foreground hover:text-primary"
              >
                {item}
              </a>
            ))}
            <a
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
              className="py-2 text-sm text-foreground"
            >
              GitHub ↗
            </a>
          </nav>
        )}
      </div>
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
        onClick={() => {
          setReady(false);
          setError(false);
          setOpen(true);
        }}
      >
        <Play className="size-4" fill="currentColor" />
        {compact ? "Watch Demo" : "Watch the walkthrough"}
        <span className="font-mono text-xs opacity-60">0:21</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl bg-night text-night-foreground border-white/10">
          <DialogTitle>System Walkthrough</DialogTitle>
          <DialogDescription className="text-night-foreground/70">
            Registration, model training, live face recognition, and attendance reporting.
          </DialogDescription>
          {!ready && !error && (
            <p role="status" className="text-sm text-night-foreground/60">
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
              className="w-full rounded-md aspect-video bg-black"
            >
              <source src="/assets/faceattend-walkthrough.mp4" type="video/mp4" />
              <track kind="captions" src="/walkthrough.vtt" srcLang="en" label="English" default />
            </video>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export function CopyCode({ code, title }: { code: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className="bg-night text-night-foreground rounded-lg overflow-hidden border border-white/10">
      <div className="flex items-center justify-between border-b border-night-foreground/15 px-5 py-3">
        <span className="eyebrow opacity-60">{title}</span>
        <Button
          variant="glass"
          size="icon"
          aria-label={`Copy ${title}`}
          title={`Copy ${title}`}
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
      <pre className="p-5 overflow-auto text-[12px] sm:text-sm leading-7">
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

export function ContactForm() {
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);

  return (
    <form
      className="grid gap-5"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);
        const data = Object.fromEntries(fd);
        const result = contactSchema.safeParse(data);

        if (!result.success) {
          setStatus(result.error.issues[0]?.message ?? "Please check your details.");
          return;
        }

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
        } catch {
          setSuccess(false);
          setStatus(
            "We could not save your message. Please try again or email faceattentai@gmail.com.",
          );
        } finally {
          setPending(false);
        }
      }}
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <label className="text-sm">
          Full Name
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            placeholder="Your name"
            className="mt-2 w-full rounded-md border bg-background p-3 focus:outline-primary"
          />
        </label>
        <label className="text-sm">
          Email Address
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={255}
            placeholder="you@institution.com"
            className="mt-2 w-full rounded-md border bg-background p-3 focus:outline-primary"
          />
        </label>
      </div>

      <label className="text-sm">
        Message
        <textarea
          name="message"
          required
          maxLength={2000}
          rows={4}
          placeholder="Tell us about your requirement"
          className="mt-2 w-full rounded-md border bg-background p-3 focus:outline-primary resize-y"
        />
      </label>

      {/* Spam honeypot: hidden from visitors */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex items-center justify-between gap-4">
        <span className="text-xs text-muted-foreground">
          Your details are used to handle your inquiry.
        </span>
        <Button size="xl" type="submit" disabled={pending}>
          {pending ? "Sending…" : "Send Message"}
          <ArrowUpRight />
        </Button>
      </div>

      {status && (
        <p
          role={success ? "status" : "alert"}
          className={success ? "text-sm text-foreground" : "text-sm text-destructive"}
        >
          {status}
        </p>
      )}
    </form>
  );
}
