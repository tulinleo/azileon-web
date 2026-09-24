import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Panel from "./Panel";
import SectionHeader from "./SectionHeader";
import { hardwareProjects } from "../data/hardwareProjects";
import { webProjects } from "../data/webProjects";
import { useT } from "../i18n";

/* Every project on one grid, filtered by kind with a segmented control; the grid dips out and back in on a change.
   Cards lead to the project's write-up on /projects. */
type Kind = "all" | "hardware" | "web";
const KINDS: Kind[] = ["all", "hardware", "web"];

export default function Projects() {
  const t = useT();
  const [kind, setKind] = useState<Kind>("all");
  const [fading, setFading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const pick = (k: Kind) => {
    if (k === kind) return;
    setFading(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setKind(k);
      setFading(false);
    }, 200);
  };

  const all = [
    ...hardwareProjects.map((p) => ({
      key: p.key,
      kind: "hardware" as Kind,
      image: p.photos.device,
      title: t(p.titleKey),
      client: p.client,
      label: t("hwSectionLabel"),
      tag: {
        background: "var(--color-tag-amber-bg)",
        color: "var(--color-tag-amber)",
      },
      to: "/projects#hardware",
    })),
    ...webProjects.map((w) => ({
      key: w.key,
      kind: "web" as Kind,
      image: w.image,
      title: t(w.titleKey),
      client: w.client,
      label: t("webSectionLabel"),
      tag: {
        background: "var(--color-tag-blue-bg)",
        color: "var(--color-tag-blue)",
      },
      to: "/projects#web",
    })),
  ];
  const shown = kind === "all" ? all : all.filter((p) => p.kind === kind);
  const labels: Record<Kind, string> = {
    all: t("filterAll"),
    hardware: t("hwSectionLabel"),
    web: t("webSectionLabel"),
  };
  const count = (k: Kind) =>
    k === "all" ? all.length : all.filter((p) => p.kind === k).length;

  return (
    <Panel id="projects">
      <div className="fade-in flex flex-wrap justify-between items-end gap-6 mb-10">
        <SectionHeader
          label={t("projectsLabel")}
          title={t("projectsTitle")}
          className="mb-0"
        />
        <div
          className="relative grid grid-cols-3 gap-1 bg-page p-1 rounded-btn"
          role="group"
          aria-label={t("projectsTitle")}
        >
          <span
            aria-hidden="true"
            className="absolute top-1 bottom-1 left-1 w-[calc((100%-16px)/3)] rounded-[11px] bg-surface shadow-[0_1px_3px_rgba(0,0,0,.1)] transition-transform duration-[400ms] ease-soft"
            style={{
              transform: `translateX(calc(${KINDS.indexOf(kind)} * (100% + 4px)))`,
            }}
          />
          {KINDS.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => pick(k)}
              aria-pressed={kind === k}
              className={`relative border-0 cursor-pointer px-4 py-2.5 rounded-[11px] text-sm font-medium bg-transparent whitespace-nowrap ${kind === k ? "text-ink" : "text-ink-3 hover:text-ink"}`}
            >
              {labels[k]} <span className="text-ink-3 text-xs">{count(k)}</span>
            </button>
          ))}
        </div>
      </div>

      <div
        className={`grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-4 transition-[opacity,transform] duration-300 ease-soft ${
          fading ? "opacity-0 translate-y-2.5" : "opacity-100 translate-y-0"
        }`}
      >
        {shown.map((p) => (
          <Link
            key={p.key}
            to={p.to}
            className="group lift block text-ink no-underline hover:text-ink"
          >
            <div className="lift-body h-full flex flex-col overflow-hidden rounded-tile bg-paper border border-line">
              <div className="aspect-[16/10] bg-page overflow-hidden">
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top block transition-transform duration-700 ease-soft group-hover:scale-105"
                  />
                )}
              </div>
              <div className="px-5 pt-[18px] pb-[22px] flex flex-col gap-2.5">
                <div className="flex justify-between items-center gap-3">
                  <span className="text-[13px] text-ink-3">{p.client}</span>
                  <span
                    className="text-[11px] uppercase tracking-[0.05em] font-semibold px-2.5 py-[5px] rounded-full"
                    style={p.tag}
                  >
                    {p.label}
                  </span>
                </div>
                <h3 className="font-heading text-[19px] font-medium leading-[1.3]">
                  {p.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Panel>
  );
}
