/**
 * Copy for `/ad/android-development-company` — a clone of
 * softsuave.com/ad/android-development-company, the paid-traffic landing page
 * for Android app development.
 *
 * Only what the live page RENDERS, word for word. Live order: masthead
 * ("Enquire Now") · hero (+ form, + four review scores) · clients · "Comprehensive
 * Android App Solutions" · "Why Choose Soft Suave" (three tabs) · "Industries We
 * Serve" · "Proven App Screens" · testimonials · "Get in Touch with us!". Every
 * "Enquire Now" / "Get …" button opens the enquiry popup. The page names no trial
 * length, so there is no duration to correct.
 *
 * (The live masthead's mail button also carries a "Mail Us" label that is never
 * shown — it is hidden — so the button is an icon, named by the address.)
 */

import type { HeroContent } from "@/components/landing/hero";
import type { CardGridContent } from "@/components/generative-ai/industries";
import type { EnquiryFormContent } from "@/components/common/enquiry-form";
import type { StepTabsContent } from "@/components/ad/step-tabs";
import type { AppScreensContent } from "@/components/ad/app-screens";
import type { ContactBandContent } from "@/components/ad/contact-band";
import { testimonials } from "@/lib/home/content";
import { TRIAL_HREF } from "@/lib/home/ad-app-developer-content";

export const anMeta = {
  path: "/ad/android-development-company",
  // The live page's <title>; it sets no description, so the site's usual one is used.
  title: "Top Android App Development Company in India",
  description:
    "Soft Suave designs and develops custom Android apps for startups and enterprise businesses, with unmatched speed, loading time and smooth functionality.",
} as const;

export { TRIAL_HREF };

const GET = (label: string) => ({ label, href: TRIAL_HREF });

const form: EnquiryFormContent = {
  eyebrow: "Save 60%",
  title: "Connect with Us",
  body: "Get No Obligation Free Quote!",
  note: "Alert: This form is for business, not candidates. To apply for jobs,",
  noteLink: { label: "click here", href: "/career-overview" },
  submit: "Submit",
  sending: "Sending...",
  requirementLabel: "Your Requirements",
  requirementPlaceholder: "Your Requirements",
  subject: "Ad landing: Free quote (Android development company)",
};

const rev = (name: string, file: string) => ({ src: `/brand/ad/android/rev-${file}.webp`, alt: name });

export const anHero: HeroContent = {
  titleLines: ["Android App Development Services In India", "We Turn Your Great Ideas into Amazing Android Apps"],
  titleSubLast: true,
  body: [
    "We design and develop custom android apps for startups and enterprise businesses. Our android development services will bring life to your ideas and ensure unmatched speed, loading time, and smooth functionality.",
  ],
  points: [
    "Save Upto 60% Development Cost",
    "Accelerated Development Cycle",
    "Fully Confidential, Strict NDA",
    "Clients include Startups & SMEs",
  ],
  ctas: [],
  logoCta: GET("Enquire Now"),
  // The live masthead's mail button.
  logoMail: "contact@softsuave.com",
  // The four review scores, each over its platform's own mark.
  ratings: {
    laurel: "/brand/ad/android/laurel.webp",
    items: [
      { score: "4.9/5", logo: { ...rev("Goodfirms Review", "goodfirms"), width: 314, height: 96 } },
      { score: "4.5/5", logo: { ...rev("Upwork Review", "upwork"), width: 314, height: 96 } },
      { score: "4.7/5", logo: { ...rev("Appfutura Review", "appfutura"), width: 314, height: 96 } },
      { score: "4.8/5", logo: { ...rev("Clutch Review", "clutch"), width: 314, height: 96 } },
    ],
  },
  form,
};

export const anClients = {
  title: "Trusted by the world’s most innovative businesses",
  logos: [
    { name: "Yooba", src: "/brand/ad/android/client-yooba.webp" },
    { name: "Ginster", src: "/brand/ad/android/client-ginster.webp" },
    { name: "Warm Point Alarm", src: "/brand/ad/android/client-warmpoint.webp" },
    { name: "Goto Solr", src: "/brand/ad/android/client-gotosolr.webp" },
    { name: "Ad.Net", src: "/brand/ad/android/client-adnet.webp" },
    { name: "Decathlon", src: "/brand/ad/android/client-decathlon.webp" },
    { name: "Marriott", src: "/brand/ad/android/client-marriott.webp" },
    { name: "Doctoc", src: "/brand/ad/android/client-doctoc.webp" },
  ],
} as const;

const svc = (file: string) => [{ src: `/brand/ad/android/svc-${file}.webp`, alt: "", width: 112, height: 112 }];
export const anServices: CardGridContent = {
  eyebrow: "",
  title: "Comprehensive Android App Solutions",
  body: "We offer a range of Android development services that are fully capable of supporting established companies and their SME counterparts.",
  items: [
    { name: "Android Mobile App Development", body: "Our android mobile app development services help you build a solution that presents your brand’s authentic voice in a store with millions of apps.", images: svc("android-phone"), link: false },
    { name: "Android TV App Development", body: "Develop custom Android TV apps with our expert team. We create scalable, user-friendly solutions to enhance your TV viewing experience and digital presence.", images: svc("android-tv"), link: false },
    { name: "Android Tablet App Development", body: "Get custom Android tablet apps tailored to your business. Our expert developers deliver scalable, user-friendly solutions to enhance your digital presence.", images: svc("android-tab"), link: false },
  ],
};
export const anServicesCta = GET("Get Free Quote!");

const why = (file: string, alt: string) => ({ src: `/brand/ad/android/why-${file}.webp`, width: 1000, height: 1000, alt });
export const anWhy: StepTabsContent = {
  title: "Why Choose Soft Suave for Android App Development?",
  intro: "We Aim in Project Risk Minimization & 100% Confidentiality to Your Data",
  steps: [
    {
      n: "01",
      label: "Ideate",
      title: "Have a wireframe in mind?",
      accent: "wireframe",
      body: "Streamline your design process with our wireframing services.",
      cta: GET("Get Started"),
      image: why("ideate", "Ideate"),
    },
    {
      n: "02",
      label: "Develop",
      title: "Start designing your app!",
      accent: "designing",
      body: "Our enterprise mobility team creates high-quality apps for native, cross-platform, and wearable devices.",
      cta: GET("Get Started"),
      image: why("develop", "Develop"),
    },
    {
      n: "03",
      label: "Release",
      title: "Get your app build ready!",
      accent: "build ready!",
      body: "Deploy your mobile app in the marketplace and source to be on your own.",
      cta: GET("Get Started"),
      image: why("release", "Release"),
    },
  ],
};

const ind = (name: string, file: string) => ({
  name,
  body: "",
  images: [{ src: `/brand/ad/android/ind-${file}.webp`, alt: name, width: 112, height: 112 }],
  link: false as const,
});
export const anIndustries: CardGridContent = {
  eyebrow: "",
  title: "Industries We Serve",
  body: "We at Smarther worked with different kind of industries and delivered successful solutions. With 11+ years of experience we have deployed over 1250+ apps to our clients.",
  items: [
    ind("Media & Entertainment", "media"),
    ind("Retail", "retail"),
    ind("Software & Technology", "software"),
    ind("Telecom", "telecom"),
    ind("Transportation & Logistics", "transportation"),
    ind("Construction", "construction"),
    ind("Education", "education"),
    ind("Health Care", "health"),
  ],
};
export const anIndustriesCta = GET("Get Quote Now");

export const anScreens: AppScreensContent = {
  eyebrow: "Success",
  title: "Proven App Screens",
  body: "Soft Suave develops innovative and successful apps to variety of industries like Healthcare, Education, eCommerce, Retail, Real estate, and Information Technology.",
  screens: [1, 2, 3, 4, 5].map((i) => ({
    src: `/brand/ad/android/screen-0${i}.webp`,
    alt: `Screen 0${i}`,
    width: 244,
    height: 499,
  })),
  cta: GET("Get Your App"),
};

/** The six reviews the live carousel shows, in its order. The live page gives the written ones no role. */
const byName = (name: string) => testimonials.items.find((t) => t.name.includes(name))!;
const written = (name: string, quote: string, photo: string) => ({
  quote,
  name,
  role: "",
  rating: "5.0",
  photo: `/brand/testimonials/${photo}.webp`,
});
export const anTestimonials = {
  eyebrow: "",
  title: "What Clients Are Saying About Us",
  body: "Soft Suave assisted industries across the world by providing exceptional software service and resources with our talented developers and app development teams. Have a look at some of our satisfied clients.",
  items: [
    written("Sophiea. K", "The communication with Soft Suave’s developers was very easy and their response time was quick. The team helped me build very beautiful and visually aesthetic websites at an economical cost.", "sophiea-k"),
    { ...byName("Aaron"), role: "" },
    { ...byName("Roland"), quote: "I've been asking software to help me develop a mobile app. The team is available right from the start. They're nice guys to work with and highly recommend them. Thanks.", role: "" },
    written("Vinny Nuthakki", "I love working with the team at Soft Suave because they helped me save time and money.From day 1, Soft Suave has been a reliable development partner who handles the work with the utmost professionalism.", "vinny-nuthakki"),
    written("Marcio. M", "Working with Soft Suave is a great experience so far. The developer I am working with right now is outstanding. The project manager always assigns the best resources to work on my project.", "marcio-m"),
    written("Robert. S", "Working with Soft Suave’s developers has been an extremely efficacious process for me. The answers are timely, explanations are never rushed, and communications are consistently clear and concise.", "robert-s"),
  ],
};

export const anContact: ContactBandContent = {
  title: "Get in Touch with us!",
  body: "Let Us Become Your Partner In Developing A Memorable Digital Experience!",
  email: "contact@softsuave.com",
  form: {
    title: "Get Free Estimation",
    submit: "Submit Now",
    sending: "Sending...",
    requirementLabel: "Your Requirements",
    requirementPlaceholder: "Your Requirements",
    subject: "Ad landing: Get Free Estimation (Android development company)",
  },
};

/** What every "Enquire Now" / "Get …" button opens: the hero's own form. */
export const anPopup = form;
