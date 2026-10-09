export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  rating: number;
  /** Overrides the initials derived from `name`. */
  initials?: string;
};

export const testimonialsContent = {
  badge: "Client Stories",
  headline: "Why Clients Choose Soft Suave FDEs",
  description: "See why clients hire Forward Deployed Engineers from Soft Suave for dependable support throughout complex engineering and implementation initiatives.",
  segmentsPrompt: "We work with companies of all sizes",
  segments: [
    "Startups",
    "SaaS Companies",
    "Enterprises",
    "Agencies",
    "Tech Companies",
  ],
};

/** Sourced from the client testimonials published on softsuave.com. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Soft Suave's commitment to meeting deadlines, flexibility in working hours, and ability to seamlessly integrate with our U.S. team make them a reliable and invaluable technology partner.",
    name: "Tim Maliyil",
    role: "Chief Operating Officer, Phoenix Technologies",
    rating: 5,
  },
  {
    quote:
      "I have been working with Soft Suave for past 3 years and the experience was quite unique. Soft Suave helped us overcome the barriers that we had from software development point of view. Partnering with Soft Suave reduced our costs by 40% and increased our delivery speed by 20%.",
    name: "Dimitris Rokos",
    role: "Founder & CEO, AMD Telecom",
    rating: 5,
  },
  {
    quote:
      "Their 40-hour free trial isn't just a marketing promise-it's a genuine opportunity to experience top-notch developer skills. I was beyond impressed with what they delivered during the trial period!",
    name: "Dara Huang MD",
    role: "Co-Founder, Perkypet",
    rating: 5,
  },
];

/** "Tim Maliyil" -> "TM", "Dara Huang MD" -> "DH". */
export function toInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}
