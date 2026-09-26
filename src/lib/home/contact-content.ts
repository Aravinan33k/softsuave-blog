/**
 * Copy for /contact, taken verbatim from https://www.softsuave.com/contact.
 *
 * Every string here is the live page's own wording — headings, form prompts,
 * validation messages, dropdown options, addresses, award captions and
 * testimonials — including its capitalisation and punctuation. Only the
 * presentation is ours. Two things on the live page are left out because the
 * live page itself hides them in HTML comments: the Vinny Nuthakki testimonial
 * and Roland White's "Phoenix - Industry Advisor" designation.
 *
 * Images: the award certificates and card icons were downloaded from the live
 * page into `public/images/contact/`. The testimonial portraits were already
 * bundled (byte-identical) under `public/brand/testimonials/`, so those are
 * reused rather than duplicated.
 */

import type { Testimonial } from "./content";

export const contactMeta = {
  /** The live page's <title> and og:title. */
  title: "Reach Out to Soft Suave Technologies Team",
  description:
    "No matter how you prefer to connect, we’ve got you covered. Reach out to Soft Suave by contact form, scheduled meeting, WhatsApp, Teams or email.",
} as const;

export const contactHeading = "Reach Out Anytime, Your Way";

/** The live page's service dropdown — values and labels exactly as listed there. */
export const serviceOptions = [
  "Custom Software/Application Development",
  "AI/ML Development & Solutions",
  "Team Extension (Staff Augmentation)",
  "Maintenance & Support Services",
  "Other Technology Needs",
  "Looking for a Job/Career",
] as const;

export const contactForm = {
  icon: "/images/contact/icon-contact-form.webp",
  title: "Contact Form",
  subtitle: "Let's talk! Fill out the form",
  steps: {
    name: { question: "Hey there! What’s your name?", placeholder: "Full Name", error: "Please enter a valid name." },
    email: {
      question: "Great! Let’s get your email!",
      placeholder: "Email ID",
      error: "Please enter a valid email address.",
    },
    phone: {
      question: "Got a number we can reach you at?",
      placeholder: "Phone Number",
      error: "Please enter a valid phone number.",
    },
    service: {
      question: "What brings you here?",
      placeholder: "Select your service",
      error: "Please select a requirement.",
    },
  },
  next: "Next",
  back: "Back",
  submit: "Submit ➣",
  sending: "Sending…",
  /** The live form redirects to a thank-you page this app does not have, so the card confirms in place. */
  success: "Thank you! Your enquiry has been received. Our team will get back to you shortly.",
  alert: {
    label: "Alert:",
    text: "This form is for business, not candidates. To apply for jobs,",
    linkLabel: "click here",
    href: "/career-overview",
  },
  subject: "Contact page enquiry",
} as const;

export const scheduleMeeting = {
  icon: "/images/contact/icon-schedule.svg",
  title: "Schedule Meeting",
  subtitle: "Book a time with our team",
  timezoneLabel: "Time Zone",
  timezonePlaceholder: "Select Timezone",
  /** The booking step, after a slot is picked — the live page's own wording. */
  details: {
    title: "Enter Details",
    messageQuestion: "What’s on your mind for our meeting?",
    messagePlaceholder: "Type here...",
    messageError: "Please tell us what the meeting is about.",
  },
  // Not on the live page (it shows no copy for these states, and redirects to
  // a thank-you page on success); written here for this app.
  loading: "Loading available slots…",
  empty: "No open slots right now.",
  error: "Unable to load slots.",
  success: "Your meeting is booked. A calendar invite is on its way to your inbox.",
  /** Fallback when the live calendar cannot load — the NeetoCal booking page it draws from ("View More Slots" is the live page's label). */
  fallback: { label: "View More Slots ➡", href: "https://softsuave.neetocal.com/meeting-with-softsuave" },
} as const;

export const quickContact = {
  icon: "/images/contact/icon-quick-contact.webp",
  title: "Quick Contact",
  subtitle: "Connect with us instantly!",
  whatsapp: { label: "WhatsApp", href: "https://wa.me/918220362113", icon: "/images/contact/icon-whatsapp.webp" },
  teams: { label: "Teams", href: "https://teams.live.com/l/invite/FEA1DKBQ1Hy8Kng9QE", icon: "/images/contact/icon-teams.webp" },
  email: { label: "contact@softsuave.com", text: "Drop us an email", href: "mailto:contact@softsuave.com" },
  /**
   * The live "Live Chat" row opens a third-party chat widget (Tidio) that this
   * app does not load — its script is outside the CSP. It opens the same
   * WhatsApp conversation instead, which is the live page's other instant
   * channel.
   */
  liveChat: {
    label: "Live Chat",
    text: "Instant answers - Real time support.",
    href: "https://wa.me/918220362113",
    icon: "/images/contact/icon-live-chat.png",
  },
} as const;

export type Office = {
  flag: "us" | "in";
  place: string;
  company: string;
  lines: readonly string[];
  phone: { label: string; href: string };
};

export const offices: readonly Office[] = [
  {
    flag: "us",
    place: "United States",
    company: "Soft Suave LLC",
    lines: ["3030 K Street NW, Suite 102, Washington, DC 20007."],
    phone: { label: "+1 (410) 220-6301", href: "tel:+14102206301" },
  },
  {
    flag: "in",
    place: "Chennai",
    company: "Soft Suave Technologies",
    lines: ["SSPDL Alpha City, Gamma Block, 5th Floor,Navalur", "Chennai – 600130."],
    phone: { label: "+91 8015159981", href: "tel:+918015159981" },
  },
  {
    flag: "in",
    place: "Bangalore",
    company: "Soft Suave Technologies",
    lines: ["MFAR Silverline Tech Park, 1st Floor, EPIP 2nd Phase, Whitefield, 180, EPIP Zone, Bangalore, Karnataka – 560066."],
    phone: { label: "080-42161324", href: "tel:08042161324" },
  },
];

export const contactAwards = {
  eyebrow: "Awards",
  title: "Industry Recognitions",
  body: "Our commitment to innovation and excellence has earned us industry-leading awards and recognition, reinforcing our dedication to delivering top-tier solutions.",
  items: [
    { key: "service-provider", title: "Recognized Top Service Provider", src: "/images/contact/award-top-service-provider.svg" },
    { key: "mobile-app-company", title: "Top Mobile app Development Company", src: "/images/contact/award-top-mobile-app-company.svg" },
    { key: "mobile-developer", title: "Top Mobile Developer", src: "/images/contact/award-top-mobile-developer.svg" },
    { key: "it-service-company", title: "Top IT Service Company", src: "/images/contact/award-top-it-service-company.svg" },
    { key: "development-firm", title: "Leading Development Firm", src: "/images/contact/award-leading-development-firm.svg" },
  ],
} as const;

/**
 * Rendered by the homepage's own testimonials section (`components/home/testimonials`),
 * so the items take its `Testimonial` shape; only the wording is the live contact page's.
 */
export const contactTestimonials: {
  eyebrow: string;
  title: string;
  body: string;
  items: readonly Testimonial[];
} = {
  eyebrow: "Testimonials",
  title: "What Our Clients Say About Us",
  body: "We've empowered hundreds of clients globally to achieve their business goals. Hear firsthand how our expertise and AI-driven solutions have made a difference.",
  items: [
    {
      quote:
        "Soft Suave's commitment to meeting deadlines, flexibility in working hours, and ability to seamlessly integrate with our U.S. team make them a reliable and invaluable technology partner.",
      name: "Tim Maliyil",
      role: "Chief Operating Officer - Phoenix Technologies",
      photo: "/brand/testimonials/tim-maliyil.webp",
      rating: "5.0",
      videoUrl: "https://www.youtube.com/watch?v=vLCCMWY4S1s",
    },
    {
      quote:
        "Their 40-hour free trial isn't just a marketing promise-it's a genuine opportunity to experience top-notch developer skills. I was beyond impressed with what they delivered during the trial period!",
      name: "Dara Huang MD",
      role: "Co-Founder - Perkypet",
      photo: "/brand/testimonials/dara-huang.webp",
      rating: "5.0",
      videoUrl: "https://www.youtube.com/watch?v=IuQRso68Tso",
    },
    {
      quote:
        "I have been working with Soft Suave for past 3 years and the experience was quite unique. Soft Suave helped us overcome the barriers that we had from software development point of view. Partnering with Soft Suave reduced our costs by 40% and increased our delivery speed by 20%.",
      name: "Dimitris Rokos",
      role: "Founder, CEO - AMD telecom",
      photo: "/brand/testimonials/dimitris-rokos.webp",
      rating: "5.0",
      videoUrl: "https://www.youtube.com/watch?v=G5IBYgvpRxQ",
    },
    {
      quote:
        "I've been asking Soft Suave to help me develop a mobile app. The team is available right from the start. They're nice guys to work with and highly recommend them. Thanks.",
      name: "Roland White",
      photo: "/brand/testimonials/roland-white.webp",
      rating: "5.0",
      videoUrl: "https://youtu.be/_YRv-r2q6xY",
    },
    {
      quote:
        "Soft Suave provides amazing service. I am completely satisfied with the projects and look forward to continuing my relationship. I will also recommend their services without question.",
      name: "Aaron. G",
      photo: "/brand/testimonials/aaron-g.webp",
      rating: "5.0",
      videoUrl: "https://youtu.be/fkjg--dAEY4",
    },
  ],
};
