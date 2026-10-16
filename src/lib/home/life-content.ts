/**
 * Copy for the /life-at-softsuave page — the culture page.
 *
 * SOURCE: https://www.softsuave.com/life-at-softsuave, section for section,
 * with its copy verbatim:
 *
 *   H1 "Living it Up at Soft Suave" over the annual-event photo      → `lifeHero`
 *   "Passionate Work, Playful Connections…" + its paragraph, the
 *     photo rows and "Join Our Team"                                → `lifeGallery`
 *   "Driven by Purpose" — Envision / Leverage / Infinite             → `lifePurpose`
 *   "Perks of being a Soft Suave" — eight perks                      → `lifePerks`
 *   "Imagination at Work…" — office photo and five cards             → `lifePractice`
 *   "Awards & Certifications"                                        → `lifeAwards`
 *
 * The photographs and illustrations are Soft Suave's own, taken from the live
 * page and re-encoded into `public/images/life/`.
 *
 * The perks are bare labels on live — an icon and a two- or three-word
 * caption, no description — and are bare labels here too.
 */

import type { PhotoMastheadContent } from "@/components/common/photo-masthead";
import type { LifeGalleryContent } from "@/components/life/life-gallery";
import type { LifePurposeContent } from "@/components/life/life-purpose";
import type { LifePerksContent } from "@/components/life/life-perks";
import type { LifePracticeContent } from "@/components/life/life-practice";
import type { LifeAwardsContent } from "@/components/life/life-awards";

export const lifeMeta = {
  slug: "life-at-softsuave",
  path: "/life-at-softsuave",
  /* Live's <title> verbatim — it carries no brand suffix there. */
  title: "Know More About Life at Soft Suave",
  shortTitle: "Life at Soft Suave",
  description:
    "Life at Soft Suave blends productivity and enjoyment. We work hard and celebrate equally during festive seasons and activities, maintaining a friendly and goal-oriented environment.",
} as const;

export const lifeHero: PhotoMastheadContent = {
  title: "Living it Up at Soft Suave",
  image: {
    src: "/images/life/hero-annual-event.webp",
    alt: "The Soft Suave team together on stage at the company's annual event",
    // The people sit in the lower half of the frame; keep them in shot when
    // the strip crops the 2.6:1 photo down on narrow screens.
    position: "50% 62%",
  },
};

/** One of live's office and event photos (`cleberation-N.webp` there). */
const photo = (n: number, alt: string) => ({
  src: `/images/life/celebration-${String(n).padStart(2, "0")}.webp`,
  alt,
});

export const lifeGallery: LifeGalleryContent = {
  eyebrow: "Where Work and Play Collide",
  title: "Passionate Work, Playful Connections: At Soft Suave, We Celebrate What We Achieve",
  body: "Soft Suave meticulously selects team members who share our values. We offer a freedom-oriented approach, empowering you to achieve results your way. Here, you'll find the tools, infrastructure, and support you need to grow your career and fuel your satisfaction.",
  rows: [
    [
      photo(1, "Soft Suave team members playing a game on the office floor"),
      photo(2, "Colleagues joining an office game between the workstations"),
      photo(3, "Team members playing a balloon game in an office cabin"),
      photo(4, "A colleague in a Santa hat at the office Christmas celebration"),
      photo(5, "Soft Suave employees gathered on the office floor during a celebration"),
      photo(6, "Team members playing a ball game in front of the Soft Suave logo wall"),
      photo(7, "Colleagues cheering on an office ball game at Soft Suave"),
    ],
    [
      photo(8, "Soft Suave employees playing cricket on an outdoor turf"),
      photo(9, "Colleagues playing badminton on an indoor court"),
      photo(10, "A team member leaping for a smash during a badminton game"),
      photo(11, "A Soft Suave batsman at the crease in the cricket nets"),
      photo(12, "Two colleagues in a doubles badminton rally"),
      photo(13, "The Soft Suave team group photo at the annual sports day"),
    ],
  ],
  cta: { label: "Join Our Team", href: "/career-overview" },
};

export const lifePurpose: LifePurposeContent = {
  eyebrow: "Workplace Happy Hours",
  title: "Driven by Purpose",
  items: [
    {
      name: "Envision",
      body: "We make it easy for teams to work together and design user interfaces that are smooth and effective.",
      image: { src: "/images/life/purpose-envision.webp", width: 565, height: 499 },
    },
    {
      name: "Leverage",
      body: "We bring out your best, crafting cutting-edge digital experiences that win for our clients.",
      image: { src: "/images/life/purpose-leverage.webp", width: 819, height: 451 },
    },
    {
      name: "Infinite",
      body: "We unleash your creativity, so you can design solutions that adapt and thrive in any situation.",
      image: { src: "/images/life/purpose-infinite.webp", width: 485, height: 483 },
    },
  ],
};

/** The eight perks the live page lists, as bare labels — exactly as live has them. */
export const lifePerks: LifePerksContent = {
  eyebrow: "Perks@SoftSuave",
  title: "Perks of being a Soft Suave",
  items: [
    { name: "5 Days a Week", icon: "clock" },
    { name: "Employee First", icon: "users" },
    { name: "Rewards & Benefits", icon: "award" },
    { name: "Fun Connect", icon: "sparkles" },
    { name: "Advanced Resources", icon: "layers" },
    { name: "Onsite Opportunities", icon: "globe" },
    { name: "Referral Program", icon: "handshake" },
    { name: "Positive Environment", icon: "heart" },
  ],
};

export const lifePractice: LifePracticeContent = {
  eyebrow: "Connecting the Dots",
  title: "Imagination at Work. Robust Software Engineering in Practice.",
  image: {
    src: "/images/life/office-floor.webp",
    width: 532,
    height: 272,
    alt: "Soft Suave engineers at work on the Chennai office floor",
  },
  items: [
    {
      name: "Creative Coding",
      body: "A positive work environment fosters a thriving creative culture for our coders.",
    },
    {
      name: "Digital Diversity",
      body: "We champion a diverse workforce, united by a shared commitment to employee satisfaction and exceptional digital solutions.",
    },
    {
      name: "Seamless Execution",
      body: "A positive work environment facilitates smooth collaboration and efficient project execution.",
    },
    {
      name: "Proven Processes",
      body: "We maintain high employee satisfaction through established, effective work processes.",
    },
    {
      name: "Meta Morphism",
      body: "We support continuous professional growth and development. Ready to join a team where work and play intertwine? We'd love to meet you!",
    },
  ],
};

/**
 * Live's heading for its badge row. The badges themselves are NOT restated:
 * the band reads `recognitions.items` from `content.ts`, the one list of
 * accolades the whole site renders.
 */
export const lifeAwards: LifeAwardsContent = {
  eyebrow: "Awards",
  title: "Awards & Certifications",
};
