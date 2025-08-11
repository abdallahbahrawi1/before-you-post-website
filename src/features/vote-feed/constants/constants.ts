import type { MetricKey } from "../types/types";

export const METRICS: Array<[MetricKey, string]> = [
  ["Clarity", "Could a stranger grasp the main point in 3 seconds?"],
  ["Credibility", "Does this feel accurate, professional, and authentic?"],
  ["Engagement", "Would you like, share, or comment on this?"],
];

export const DEFAULT_TIPS: Record<MetricKey, string[]> = {
  Clarity: [
    "Strong opening line / hook",
    "Clear call-to-action",
    "Minimal jargon",
  ],
  Credibility: [
    "No typos or click-bait",
    "Authoritative tone & sources",
    "Consistent branding",
  ],
  Engagement: [
    "Eye-catching visual / thumbnail",
    "Relevant emojis or formatting",
    "Emotional or novel angle",
  ],
};

export const DEFAULT_TAGS: Record<MetricKey, string[]> = {
  Clarity: ["Great hook", "CTA unclear", "Too much jargon"],
  Credibility: ["Looks professional", "Typos spotted", "Needs sources"],
  Engagement: ["Eye-catching", "Feels generic", "Try an emoji"],
};
