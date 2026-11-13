import type { HeroContent } from '@/components/landing/hero';
import { sharedHeroAlert } from '@/lib/home/delivery-shared';

/**
 * /video-call-app-development-company — softsuave.com's "Video chat App Development Company India - Soft Suave" page,
 * word for word: the hero with its quote form, the about copy beside its picture, the eight features, the two
 * portfolio entries with their case-study links, and the closing consultation form (the site's own, which already
 * reads as the live one does). Images are under /images/video-call. The live "Try Our Free Demo App!" button is a
 * dead link (`#`, no popup behind it), so it points at the hero's quote form. The page names no trial or duration,
 * so there is no figure to correct to 40 hours.
 */

export const vcMeta = {
  path: '/video-call-app-development-company',
  shortTitle: 'Video Call App Development',
  title: 'Video chat App Development Company India - Soft Suave',
  description:
    'Video chat app development company in India specializing in custom, real-time communication solutions for mobile and web platforms.',
} as const;

const IMG = '/images/video-call';

export const vcHero: HeroContent = {
  titleLines: ['Video Calling App Development', 'Company in India'],
  accent: 'Video Calling App Development',
  titleScale: 'home',
  accentGradient: true,
  // The live banner's photo (a desk with a laptop and stationery), under the strong veil.
  image: { src: `${IMG}/video-call-app-dev-company-softsuave-min.webp`, width: 1920, height: 630, alt: '', veil: 'dark', still: true },
  body: [
    'Looking for dynamic & powerful Chat & Video Calling App Development Company? We deliver complete Video Consultation App solutions- Best in the industry!',
  ],
  points: [],
  ctas: [{ label: 'Try Our Free Demo App!', href: '#enquiry' }],
  form: {
    eyebrow: "Let's Discuss Your Project",
    title: 'Get free rough quote in 24 hrs',
    alert: sharedHeroAlert,
    submit: 'Submit',
    sending: 'Sending...',
    requirementLabel: 'How Can We Help(Requirement)',
    requirementPlaceholder: 'How Can We Help(Requirement)',
    subject: 'Video chat App Development Company India - Soft Suave',
  },
};

/** A paragraph as pieces: plain text, or `{ b }` for the words the live page bolds. */
export type Piece = string | { readonly b: string };

export const vcAbout = {
  title: 'Best Custom Video Call App Development Company',
  accent: 'Video Call App Development',
  body: 'We develop interactive video calling Apps that unleashes real-time engagement possibilities.',
  paragraphs: [
    [
      'Soft Suave is the best ',
      { b: 'Video Calling App Development Company in India' },
      ' that develops custom and innovative video call solutions for all platforms. The Mobile App Development team at Soft Suave has the expertise and experience working with several industry verticals like Healthcare, eCommerce, Construction and Real Estate. They follow the trend and use all the latest technologies to develop online video call solutions with multiple unique features. Our video call/consultation app not just offers a platform for a video call but also images, audios, videos, and contacts sharing in real-time. Soft Suave, renowned for ',
      { b: 'Video Calling Software Development' },
      ', also offers interactive, future-ready and unique features to stay competitive in the market.',
    ],
    [
      'Expert developers at Soft Suave go beyond their duty to collaborate with UI/UX teams and develop the best and interactive video call apps for your business. They are also well-versed in iOS and Android technologies & guidelines to build iOS and Android video chat apps that trend in the Play Store and App Store. As security is the primary concern in today’s tech world, Soft Suave’s developers focus primarily on offering end-to-end encryption for all the video call apps.',
    ],
  ] as readonly (readonly Piece[])[],
  image: { src: `${IMG}/video-call-content-img-softsuave.webp`, width: 400, height: 278, alt: 'Custom Video Call App Development Company Soft Suave' },
} as const;

export const vcFeatures = {
  title: 'Ground-breaking Features of Custom Video Call Application',
  accent: 'Video Call Application',
  body: 'We implement innovative features that work across all major browsers and devices.',
  items: [
    { name: 'Video Call Recording', body: [ 'Users can record video calls using predefined layouts without any hassles, add-ons or extensions.' ] },
    { name: 'Easy to Use', body: [ 'The app is integrated with easy-to-use features that make your ', { b: 'Video Consultation' }, ' effortless.' ] },
    { name: 'Multi-platform Support', body: [ 'Our video call app is compatible with all mobile phones with iOS and Android operating system.' ] },
    { name: 'Private Video conferences', body: [ 'Video calls made from our app guarantees are encrypted and offers complete privacy and high security.' ] },
    { name: 'Hassle-free Screen Sharing', body: [ 'Users can share their screen to present information available on their device to the viewers/audience.' ] },
    { name: 'Audio and Video Filters', body: [ 'Our video call apps allow you to apply audio and video filters in real-time.' ] },
    { name: 'Affordable Plans', body: [ 'Our Apps have supportive plans to leverage the outstanding features associated with the App.' ] },
    { name: 'End-to-end Encrypted Chat', body: [ 'Your chats with your clients are end-to-end encrypted to give you privacy over conversations.' ] },
  ] as readonly { readonly name: string; readonly body: readonly Piece[] }[],
} as const;

export const vcPortfolio = {
  title: 'Portfolio',
  body: 'See, hear, and interact with your patients through high‑quality peer‑to‑peer voice and video calls.',
  items: [
    {
      kicker: 'Custom Online',
      name: 'Video Consultation App',
      text: 'An online consultation app that empowers doctors and healthcare providers to offer high-quality care through video calls. This video consultation app lets doctors schedule and accept appointments with patients from anywhere, anytime and facilitates doctors to share downloadable prescriptions using chat.',
      cta: { label: 'View Case Study', href: '/case-study-online-consultation-platform-for-doctors' },
      image: { src: `${IMG}/project-one-screen-shot-1.webp`, width: 600, height: 529, alt: 'Online video consultation app development soft suave' },
    },
    {
      kicker: 'Innovative',
      name: 'Healthcare Video Call App',
      text: 'A custom, interactive and easy-to-use telemedicine app developed with an objective to democratize access to advanced healthcare management for everyone with the help of video consultation and promote healthcare through innovation in telemedicine.',
      cta: { label: 'View Case Study', href: '/case-study-telehealth-consultation-platform-for-doctors' },
      image: { src: `${IMG}/project-two-screenshots.webp`, width: 600, height: 529, alt: 'Healthcare video call app development company soft suave' },
    },
  ],
} as const;
