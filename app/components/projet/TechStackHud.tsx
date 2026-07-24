"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Projet, ProjetModule } from "../../data/projets";

const EASE = [0.22, 1, 0.36, 1] as const;

// Carte module : nom + pastille de statut.
function ModuleCard({ module, i }: { module: ProjetModule; i: number }) {
  return (
    <div className="relative border border-accent/40 bg-panel/50 px-5 py-4">
      <div className="flex items-center justify-between font-mono text-[10px] tracking-wider text-muted">
        <span>MODULE_{String(i + 1).padStart(2, "0")}</span>
        <span className="flex items-center gap-1.5 text-accent">
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
          />
          {module.status}
        </span>
      </div>
      <p className="mt-2 font-display text-lg font-black italic tracking-tight text-foreground">
        {module.name}
      </p>
    </div>
  );
}

export default function TechStackHud({
  stack,
  specs,
}: {
  stack: Projet["stack"];
  specs: Projet["specs"];
}) {
  const reduce = useReducedMotion();

  const specItems = [
    { label: "DATA_TYPE.LOG", key: "TIMESTAMP", value: specs.timestamp },
    { label: "ACCESS_PUBLIC", key: "TARGET", value: specs.license },
    { label: "USER_LEAD", key: "ASSIGNMENT", value: specs.role },
    { label: "SECURE_CONN.TRUE", key: "COORDINATES", value: specs.location },
  ];

  return (
    <motion.section
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="flex flex-col gap-16 px-6 py-24 md:px-40"
    >
      {/* TECH_STACK_HUD */}
      <div className="border border-accent/30 p-8">
        <div className="relative mb-8 inline-block">
          <span
            aria-hidden
            className="absolute inset-0 bg-accent/30"
            style={{ transform: "translate(0.4rem, 0.4rem) skewX(-12deg)" }}
          />
          <span className="relative block -skew-x-12 bg-accent px-6 py-2">
            <span className="block skew-x-12 font-display text-sm font-black italic tracking-wider text-[#0a1a2b]">
              02 / TECH_STACK_HUD
            </span>
          </span>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <p className="mb-4 border-b border-accent/20 pb-2 font-mono text-sm font-bold tracking-wider text-accent">
              PRIMARY_CORE
            </p>
            <div className="grid grid-cols-2 gap-4">
              {stack.primaryCore.map((m, i) => (
                <ModuleCard key={m.name} module={m} i={i} />
              ))}
            </div>
          </div>
          <div>
            <p className="mb-4 border-b border-accent/20 pb-2 font-mono text-sm font-bold tracking-wider text-accent">
              RENDER_ENGINE
            </p>
            <div className="grid grid-cols-2 gap-4">
              {stack.renderEngine.map((m, i) => (
                <ModuleCard key={m.name} module={m} i={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MISSION_SPECIFICATIONS */}
      <div className="border border-accent p-8">
        <p className="mb-8 flex items-center gap-4 font-mono text-sm font-bold tracking-wider text-accent">
          MISSION_SPECIFICATIONS_V2.0
          <span aria-hidden className="h-px flex-1 bg-accent/40" />
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {specItems.map((s) => (
            <div key={s.key} className="border-l border-accent/40 pl-4">
              <p className="font-mono text-[10px] tracking-wider text-muted">
                {s.label}
              </p>
              <p className="mt-1 font-mono text-[10px] tracking-wider text-muted">
                {s.key}
              </p>
              <p className="mt-2 font-display text-xl font-black italic tracking-tight text-foreground">
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Badges de statut */}
        <div className="mt-10 flex flex-wrap gap-3">
          {["BUFFER: STABLE", "ENCRYPTION: ACTIVE", "UPLINK: SECURE"].map((b) => (
            <span key={b} className="-skew-x-12 bg-accent/15 px-3 py-1.5">
              <span className="block skew-x-12 font-mono text-[10px] font-bold tracking-wider text-accent">
                {b}
              </span>
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
