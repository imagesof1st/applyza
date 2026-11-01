"use client";

import {
  useId,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useGSAP } from "@gsap/react";

import { useDurationTokens } from "@/lib/duration-tokens";
import { gsap, ScrollTrigger } from "@/lib/gsap-scroll-trigger";
import { cn } from "@/lib/utils";

export interface ProcessCardStep {
  /** Stable React key. */
  id: string;
  /** Step heading. */
  title: string;
  /** Step explanation. */
  description: string;
  /** Optional short supporting points. */
  details?: string[];
  /** Optional icon supplied by the consumer. */
  icon?: ReactNode;
}

export interface ProcessCardsTimelineProps {
  /** Section heading rendered as h2. */
  title: string;
  /** Optional section introduction. */
  description?: string;
  /** Three to six steps in process order. */
  steps: ProcessCardStep[];
  /** Visible vertical offset between stacked cards in pixels. @default 32 */
  stackOffset?: number;
  /** Additional classes merged onto the section root with cn(). */
  className?: string;
}

type ProcessTimelineStyle = CSSProperties & {
  "--process-stack-offset": string;
};

const DESKTOP_MOTION_QUERY =
  "(prefers-reduced-motion: no-preference) and (min-width: 64rem) and (hover: hover) and (pointer: fine)";

const PROCESS_CARDS_CSS = `
.te-process-cards {
  --process-stack-base: clamp(5.5rem, 10vh, 7.5rem);
}

.te-process-card__surface {
  position: relative;
  isolation: isolate;
  min-height: 16rem;
  overflow: hidden;
  border-radius: 1.75rem;
  background-color: var(--background, #0A0A0A);
  background-image: linear-gradient(var(--surface, #14151C), var(--surface, #14151C));
  transform-origin: top center;
  transition: box-shadow 0.3s ease;
}

.te-process-card__layer {
  position: absolute;
  z-index: 0;
  inset: 0;
  pointer-events: none;
  border: 1px solid var(--process-card-border, var(--border, rgba(255, 255, 255, 0.1)));
  border-radius: inherit;
  background: var(--process-card, var(--surface, #14151C));
  box-shadow: 0 1.75rem 4rem -2.5rem var(--process-card-shadow, rgba(0, 0, 0, 0.8));
}

.te-process-card__number {
  color: var(--process-card-number, var(--primary, #E84320));
}

.te-process-card__stack-rail {
  position: absolute;
  z-index: 2;
  top: 0;
  inset-inline: 1.5rem;
  display: none;
  height: var(--process-stack-offset);
  align-items: center;
  gap: 0.625rem;
  pointer-events: none;
  font-size: 0.75rem;
  line-height: 1;
  white-space: nowrap;
}

.te-process-card__stack-title {
  min-width: 0;
  overflow: hidden;
  color: var(--foreground, #F5F5F5);
  font-weight: 600;
  text-overflow: ellipsis;
}

@media (min-width: 40rem) {
  .te-process-card__stack-rail {
    inset-inline: 2rem;
  }
}

@media ${DESKTOP_MOTION_QUERY} {
  .te-process-cards[data-enhanced="true"] .te-process-card__shell {
    position: sticky;
    top: var(--process-stack-base);
  }

  .te-process-cards[data-enhanced="true"] .te-process-card__stack-rail {
    display: flex;
    opacity: 0;
    font-size: clamp(
      0.625rem,
      calc(var(--process-stack-offset) - 4px),
      0.8125rem
    );
  }

  .te-process-cards[data-enhanced="true"]
    .te-process-card__shell[data-step-index="1"] {
    top: calc(var(--process-stack-base) + var(--process-stack-offset));
  }

  .te-process-cards[data-enhanced="true"]
    .te-process-card__shell[data-step-index="2"] {
    top: calc(
      var(--process-stack-base) + var(--process-stack-offset) +
        var(--process-stack-offset)
    );
  }

  .te-process-cards[data-enhanced="true"]
    .te-process-card__shell[data-step-index="3"] {
    top: calc(
      var(--process-stack-base) + var(--process-stack-offset) +
        var(--process-stack-offset) + var(--process-stack-offset)
    );
  }

  .te-process-cards[data-enhanced="true"]
    .te-process-card__shell[data-step-index="4"] {
    top: calc(
      var(--process-stack-base) + var(--process-stack-offset) +
        var(--process-stack-offset) + var(--process-stack-offset) +
        var(--process-stack-offset)
    );
  }

  .te-process-cards[data-enhanced="true"]
    .te-process-card__shell[data-step-index="5"] {
    top: calc(
      var(--process-stack-base) + var(--process-stack-offset) +
        var(--process-stack-offset) + var(--process-stack-offset) +
        var(--process-stack-offset) + var(--process-stack-offset)
    );
  }
}
`;

function clampStackOffset(value: number): number {
  if (!Number.isFinite(value)) return 32;
  return Math.min(48, Math.max(16, value));
}

/**
 * Process Cards Timeline is a semantic process section whose ordered cards
 * form a native-scroll depth stack on fine-pointer desktop layouts.
 */
export function ProcessCardsTimeline({
  title,
  description,
  steps,
  stackOffset = 32,
  className,
}: ProcessCardsTimelineProps) {
  const scope = useRef<HTMLElement | null>(null);
  const readBeat = useDurationTokens(scope);
  const generatedId = useId();
  const headingId = `te-process-cards-${generatedId.replaceAll(":", "")}`;
  const resolvedStackOffset = clampStackOffset(stackOffset);
  const orderKey = JSON.stringify(steps.map((step) => step.id));
  const timelineStyle: ProcessTimelineStyle = {
    "--process-stack-offset": `${resolvedStackOffset}px`,
  };

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add(DESKTOP_MOTION_QUERY, () => {
        root.setAttribute("data-enhanced", "true");

        const heading = root.querySelector<HTMLElement>(
          "[data-process-heading]",
        );
        if (heading) {
          const revealHeading = gsap.from(heading, {
            y: 24,
            autoAlpha: 0,
            duration: readBeat("--dur-3", 0.6),
            ease: "expo.out",
            paused: true,
            immediateRender: false,
          });

          ScrollTrigger.create({
            trigger: heading,
            start: "top 85%",
            once: true,
            onEnter: () => revealHeading.play(),
          });
        }

        const cards = gsap.utils.toArray<HTMLElement>(
          "[data-process-card]",
          root,
        );

        cards.forEach((card, index) => {
          const content = card.querySelector<HTMLElement>(
            "[data-process-content]",
          );
          if (content) {
            const revealContent = gsap.from(content, {
              y: 20,
              opacity: 0,
              duration: readBeat("--dur-3", 0.6),
              ease: "expo.out",
              paused: true,
              immediateRender: false,
            });

            ScrollTrigger.create({
              trigger: card,
              start: "top 88%",
              once: true,
              onEnter: () => revealContent.play(),
            });
          }

          const nextCard = cards[index + 1];
          if (!nextCard) return;

          const surface = card.querySelector<HTMLElement>(
            "[data-process-surface]",
          );
          const layer = card.querySelector<HTMLElement>(
            "[data-process-depth-layer]",
          );
          if (!surface || !layer) return;

          /*
           * One depth tween per preceding card. The wrapper receives only the
           * scale and the decorative layer receives only the opacity change,
           * so all required text remains at opacity 1 throughout the scrub.
           */
          gsap.to([surface, layer], {
            scale: (targetIndex: number) =>
              targetIndex === 0 ? 0.96 : 1,
            opacity: (targetIndex: number) =>
              targetIndex === 1 ? 0.68 : 1,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: nextCard,
              start: "top 82%",
              end: () => {
                const restingTop = Number.parseFloat(
                  getComputedStyle(nextCard).top,
                );
                return `top ${Number.isFinite(restingTop) ? restingTop : 0}px`;
              },
              scrub: 0.4,
              invalidateOnRefresh: true,
            },
          });

          const rail = card.querySelector<HTMLElement>(
            "[data-process-stack-rail]",
          );
          const cardTitle = card.querySelector<HTMLElement>(
            "[data-process-title]",
          );
          if (!rail || !cardTitle) return;

          const revealRail = gsap.fromTo(
            rail,
            { autoAlpha: 0 },
            {
              autoAlpha: 1,
              duration: readBeat("--dur-2", 0.3),
              ease: "power1.out",
              paused: true,
              immediateRender: true,
            },
          );

          ScrollTrigger.create({
            trigger: nextCard,
            start: () => {
              const restingTop = Number.parseFloat(
                getComputedStyle(card).top,
              );
              const headingOffset =
                cardTitle.getBoundingClientRect().top -
                card.getBoundingClientRect().top;
              const handover =
                (Number.isFinite(restingTop) ? restingTop : 0) + headingOffset;
              return `top ${handover}px`;
            },
            onEnter: () => revealRail.play(),
            onLeaveBack: () => revealRail.reverse(),
            invalidateOnRefresh: true,
          });
        });

        let active = true;
        void document.fonts.ready.then(() => {
          if (active) ScrollTrigger.refresh();
        });

        return () => {
          active = false;
          root.removeAttribute("data-enhanced");
        };
      });

      return () => mm.revert();
    },
    {
      scope,
      dependencies: [orderKey, readBeat, resolvedStackOffset],
      revertOnUpdate: true,
    },
  );

  return (
    <section
      ref={scope}
      aria-labelledby={headingId}
      data-process-cards-timeline=""
      style={timelineStyle}
      className={cn(
        "te-process-cards relative w-full py-16 sm:py-20 lg:py-28",
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: PROCESS_CARDS_CSS }} />

      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-16 px-4 sm:px-6 lg:px-8">
        <div data-process-heading className="max-w-xl lg:pt-4 lg:sticky lg:top-28 self-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-400 text-xs font-medium uppercase tracking-wider mb-4">
            <span className="size-1.5 rounded-full bg-[#E84320] animate-pulse" />
            Execution Methodology
          </div>
          <h2
            id={headingId}
            className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight"
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
          ) : null}

          <div className="mt-8 hidden lg:flex flex-col gap-3 pt-6 border-t border-white/10">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/40">
              System Highlights
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-300">
              <span className="size-1 rounded-full bg-[#E84320]" />
              <span>Dedicated US recruiter handling tailored outreach</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-300">
              <span className="size-1 rounded-full bg-[#E84320]" />
              <span>Real-time dashboard tracking interviews & offers</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-300">
              <span className="size-1 rounded-full bg-[#E84320]" />
              <span>Full confidentiality & custom role criteria controls</span>
            </div>
          </div>
        </div>

        <ol
          data-process-list
          className="m-0 flex min-w-0 list-none flex-col gap-6 p-0"
        >
          {steps.map((step, index) => (
            <li
              key={step.id}
              data-process-card
              data-step-index={index}
              className="te-process-card__shell relative min-w-0"
              style={{ zIndex: index + 1 }}
            >
              <div
                data-process-surface
                className="te-process-card__surface p-6 sm:p-8 border border-white/10 shadow-2xl backdrop-blur-md"
                style={{ minHeight: "22rem" }}
              >
                <span
                  aria-hidden="true"
                  data-process-depth-layer
                  className="te-process-card__layer transition-opacity"
                />

                {/* Collapsed Spine Rail */}
                <div
                  aria-hidden="true"
                  data-process-stack-rail
                  className="te-process-card__stack-rail bg-black/40 backdrop-blur-md border-b border-white/10 rounded-t-[1.75rem] px-4"
                >
                  <span className="shrink-0 font-semibold uppercase tracking-[0.16em] text-[#E84320]">
                    Step {index + 1} of {steps.length}
                  </span>
                  <span className="h-3 w-px shrink-0 bg-white/20" />
                  <span
                    data-process-stack-title
                    className="te-process-card__stack-title text-neutral-200"
                  >
                    {step.title}
                  </span>
                </div>

                <div
                  data-process-content
                  className="relative z-10 flex flex-col"
                >
                  <div className="flex items-center justify-between gap-6 border-b border-white/10 pb-5">
                    <span
                      data-process-step-label
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#E84320]"
                    >
                      <span className="size-1.5 rounded-full bg-[#E84320]" />
                      Step {index + 1} of {steps.length}
                    </span>
                    {step.icon ? (
                      <span
                        aria-hidden="true"
                        className="te-process-card__number pointer-events-none flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/25 text-[#E84320]"
                      >
                        {step.icon}
                      </span>
                    ) : null}
                  </div>

                  <div className="pt-6">
                    <h3
                      data-process-title
                      className="text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl"
                    >
                      {step.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-neutral-400 sm:text-[0.9375rem]">
                      {step.description}
                    </p>

                    {step.details && step.details.length > 0 ? (
                      <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 list-none p-0">
                        {step.details.map((detail) => (
                          <li
                            key={detail}
                            className="flex items-center gap-2 text-xs font-medium text-neutral-300"
                          >
                            <span className="size-1.5 shrink-0 rounded-full bg-[#E84320]/70" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
