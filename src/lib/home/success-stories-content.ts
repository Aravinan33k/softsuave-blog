/**
 * Copy for the /success-stories index.
 *
 * Mirrors softsuave.com/success-stories: the "Success Stories" banner, then
 * two grids of video cards — Client Stories and Employee Stories — each card a
 * thumbnail and a headline linking to the story on YouTube, then the "Book
 * Free Consultation" enquiry band. Headings, intros, card titles, video links
 * and thumbnail alts are the live copy verbatim; the thumbnails are mirrored
 * into `public/images/success-stories/`.
 *
 * The live page is videos, not written testimonials — this page does not reuse
 * the homepage's testimonial grid.
 */

export const successStoriesPageMeta = {
  slug: "success-stories",
  path: "/success-stories",
  /** The live `<title>`. Used as-is; the route does not append the brand. */
  title: "Soft Suave Success Stories: Proven Business Impact",
  /**
   * NOT the live description — the live tag is a Magento page's description
   * pasted onto this one. This says what the page actually holds.
   */
  description:
    "Watch Soft Suave's client and employee success stories — clients on the development support we delivered, and team members on their journey from trainee to team leader.",
} as const;

/** The live banner's only content is its "Success Stories" title. */
export const successStoriesPageHero = {
  title: "Success Stories",
} as const;

export interface VideoStory {
  readonly key: string;
  readonly title: string;
  /** The YouTube video the live card links to. */
  readonly href: string;
  readonly image: {
    readonly src: string;
    readonly alt: string;
    readonly width: number;
    readonly height: number;
  };
}

export interface VideoStoryGroup {
  readonly id: string;
  readonly title: string;
  readonly intro: string;
  readonly items: readonly VideoStory[];
}

const IMG = "/images/success-stories";

export const clientStories: VideoStoryGroup = {
  id: "client-stories",
  title: "Client Stories",
  intro:
    "Soft Suave helps Clients, Startups and SMBs around the world achieve their mission-critical priorities successfully. Check out what they have to tell about us.",
  items: [
    {
      key: "dimitris-rokos",
      title: "Dimitris Rokos Compliments Soft Suave for Reducing Costs & Boosting Delivery Speed",
      href: "https://www.youtube.com/watch?v=G5IBYgvpRxQ",
      image: { src: `${IMG}/dimitris-rokos-thumbnail.webp`, alt: "Client Thumbnail", width: 1280, height: 720 },
    },
    {
      key: "tim-maliyil",
      title: "Tim Maliyil Praises Soft Suave for Reliable, High-Quality & Cost-Effective Development Support",
      href: "https://www.youtube.com/watch?v=vLCCMWY4S1s",
      image: { src: `${IMG}/tim-maliyil-thumbnail.webp`, alt: "Client Thumbnail", width: 1280, height: 720 },
    },
    {
      key: "dara-huang",
      title: "Dara Huang Recognizes Soft Suave for Seamless Collaboration and Agile Development Excellence",
      href: "https://www.youtube.com/watch?v=IuQRso68Tso",
      image: { src: `${IMG}/dara-huang-thumbnail.webp`, alt: "Client Thumbnail", width: 1280, height: 720 },
    },
    {
      key: "peer-support-app",
      title: "Applauding the end-to-end Peer Support App Development",
      href: "https://youtu.be/fkjg--dAEY4",
      image: { src: `${IMG}/client-thumbnail-1.webp`, alt: "Client Thumbnail", width: 400, height: 225 },
    },
    {
      key: "roland-white",
      title: "Roland White Raves About Soft Suave's Incredible app experience",
      href: "https://youtu.be/_YRv-r2q6xY",
      image: { src: `${IMG}/roland-white.webp`, alt: "Roland White - Ginger Guru", width: 1280, height: 720 },
    },
  ],
};

export const employeeStories: VideoStoryGroup = {
  id: "employee-stories",
  title: "Employee Stories",
  intro:
    "Unlocking employee’s potential and growing along with our employees is Soft Suave’s utmost concern. Here is what our exceptional employees have to say about their success journey with Soft Suave.",
  items: [
    {
      key: "jayasin-prabu",
      title: "Success Journey of a Software Engineer to Team Leader",
      href: "https://youtu.be/Iuxr9jVKPNw",
      image: { src: `${IMG}/js-thumbnail.webp`, alt: "Jayasin Prabu - Fullstack Team Lead - Soft Suave", width: 400, height: 225 },
    },
    {
      key: "dinesh",
      title: "Journey of a Trainee to the Most Sought-after MEAN Stack Developer",
      href: "https://youtu.be/IYrhA-vMQ9Y",
      image: { src: `${IMG}/dk-thumbnail.webp`, alt: "Dinesh - MEAN Stack Lead - Soft Suave", width: 400, height: 225 },
    },
    {
      key: "beski-franklin",
      title: "Journey of a Software Trainee to Full-stack Team Leader",
      href: "https://www.youtube.com/watch?v=eR7WRZyxtJg",
      image: { src: `${IMG}/franklin-thumbnail.webp`, alt: "Beski Franklin - Fullstack Team Lead - Soft Suave", width: 400, height: 225 },
    },
    {
      key: "karthik",
      title: "Journey of a App Developer Trainee to Full-stack Team Leader",
      href: "https://www.youtube.com/watch?v=RljEuTsS1B4",
      image: { src: `${IMG}/karthik-fullstack-team-lead.webp`, alt: "Karthik - Fullstack Team Lead - Soft Suave", width: 416, height: 234 },
    },
    {
      key: "trainee-to-team-leader",
      title: "Software Engineer (Trainee) to Team Leader",
      href: "https://www.youtube.com/watch?v=H0t3d7-u-3w",
      image: { src: `${IMG}/maria-than-1.webp`, alt: "Team Lead - Soft Suave", width: 600, height: 338 },
    },
  ],
};

/** The live closing band, verbatim — passed to `Contact` in place of its default copy. */
export const successStoriesClosingBand = {
  title: "Book Free Consultation",
  body: "Get a 30-minute free consultation from a field expert. Validate your idea for free and get a rough quote once you complete this form.",
  cta: { label: "Schedule a Call", href: "/30-min-free-consultation" },
} as const;
