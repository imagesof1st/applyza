import { useState } from "react";

export type DurationSource = `--${string}` | `var(${string})`;

const REDUCED_CEILING_SECONDS = 0.2;

export function reducedBeatSeconds(seconds?: number): number {
  if (seconds === undefined || !Number.isFinite(seconds) || seconds <= 0) return 0;
  return Math.min(seconds, REDUCED_CEILING_SECONDS);
}

export type DurationReader = (token: DurationSource, seconds: number) => number;

export interface DurationScope {
  readonly current: HTMLElement | null;
}

function parseSeconds(value: string): number | null {
  const first = value.split(",")[0];
  if (first === undefined) return null;
  const trimmed = first.trim();
  if (trimmed === "") return null;
  const match = /^(-?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)(ms|s)?$/i.exec(trimmed);
  const magnitude = match?.[1];
  if (magnitude === undefined) return null;
  const parsed = Number(magnitude);
  if (!Number.isFinite(parsed)) return null;
  const seconds = match?.[2]?.toLowerCase() === "ms" ? parsed / 1000 : parsed;
  return seconds > 0 ? seconds : null;
}

function probeSeconds(scope: HTMLElement, chain: string): number | null {
  const view = scope.ownerDocument.defaultView;
  if (view === null) return null;
  const inline = scope.style;
  const priorProperty = inline.getPropertyValue("transition-property");
  const priorPropertyPriority = inline.getPropertyPriority("transition-property");
  const priorDuration = inline.getPropertyValue("transition-duration");
  const priorDurationPriority = inline.getPropertyPriority("transition-duration");
  try {
    inline.setProperty("transition-property", "none", "important");
    inline.setProperty("transition-duration", chain, "important");
    return parseSeconds(view.getComputedStyle(scope).transitionDuration);
  } finally {
    inline.removeProperty("transition-property");
    inline.removeProperty("transition-duration");
    if (priorProperty !== "") {
      inline.setProperty("transition-property", priorProperty, priorPropertyPriority);
    }
    if (priorDuration !== "") {
      inline.setProperty("transition-duration", priorDuration, priorDurationPriority);
    }
  }
}

function resolveSeconds(
  scope: HTMLElement,
  token: DurationSource,
  seconds: number,
): number {
  if (token.startsWith("--")) {
    const view = scope.ownerDocument.defaultView;
    if (view === null) return seconds;
    const raw = view.getComputedStyle(scope).getPropertyValue(token);
    if (raw.trim() === "") return seconds;
    const direct = parseSeconds(raw);
    if (direct !== null) return direct;
    return probeSeconds(scope, `var(${token})`) ?? seconds;
  }
  return probeSeconds(scope, token) ?? seconds;
}

export function useDurationTokens(scope: DurationScope): DurationReader {
  const [read] = useState(() => createDurationReader(scope));
  return read;
}

function createDurationReader(scope: DurationScope): DurationReader {
  const cache = new Map<string, number>();
  return (token, seconds) => {
    const element = scope.current;
    if (element === null) return seconds;
    const key = `${token}|${seconds}`;
    const held = cache.get(key);
    if (held !== undefined) return held;
    const resolved = resolveSeconds(element, token, seconds);
    cache.set(key, resolved);
    return resolved;
  };
}
