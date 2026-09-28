/**
 * Copy for the /clients index.
 *
 * softsuave.com's /clients page is a "Clients" hero, the "Trusted by Leading
 * Brands" logo band, the Industry Recognitions strip, the testimonials and the
 * closing consultation form — nothing else. The recognitions and testimonials
 * render the homepage's own sections unchanged (their copy already matches the
 * live page word for word); the logo band is where this page differs, so its
 * heading, standfirst and roster live here.
 *
 * See `src/lib/home/content.ts` for `recognitions` and `testimonials`.
 */

import type { ClientLogo } from "@/lib/home/content";
import type { PhotoMastheadContent } from "@/components/common/photo-masthead";

export const clientsPageMeta = {
  slug: "clients",
  path: "/clients",
  // Title and description are the live page's, verbatim.
  title: "Know the Trusted Clients of Soft Suave Technologies Team",
  description:
    "For over 13 years, Soft Suave have been the trusted partner to startups and SMBs, achieving a 97% retention rate with results that speak for themselves.",
} as const;

/** Page masthead. The live hero is the one word — no eyebrow, no paragraph. */
/**
 * The live hero: the single word over its full-width handshake photograph
 * (softsuave.com's own `client-bg.webp`, re-encoded at 1600px).
 */
export const clientsPageHero: PhotoMastheadContent = {
  title: "Clients",
  image: {
    src: "/images/clients/hero-handshake.webp",
    alt: "Two business partners shaking hands in front of a city skyline",
  },
  veil: "soft",
};

/**
 * The logo band — the live page's "Trustred by Leading Brands" section.
 *
 * `logos` is the live carousel's full roster in the live order (every slide,
 * not only the one on screen), each mark deduplicated — the live markup lists
 * JobSpace and Utiliko twice. The artwork is softsuave.com's own files,
 * bundled byte-for-byte under `/public/brand/clients/`; the 21 marks the
 * homepage band already carries reuse its files and names.
 */
export const clientsPageBrands: {
  title: string;
  body: string;
  cta: { label: string; href: string };
  logos: ClientLogo[];
} = {
  // Live reads "Trustred by Leading Brands" — a typo, corrected here.
  title: "Trusted by Leading Brands",
  body: "Our commitment to innovation and excellence has earned the trust of industry-leading clients, reinforcing our dedication to delivering top-tier solutions and lasting partnerships.",
  // Live points this at /free-quote; the review wants every "Talk To Experts"
  // on /contact.
  cta: { label: "Talk To Experts", href: "/contact" },
  logos: [
    { name: "AMD Telecom", src: "/brand/clients/amd-telecom.webp" },
    { name: "Phoenix Technologies", src: "/brand/clients/phoenix-technologies.webp" },
    { name: "Perkypet", src: "/brand/clients/perkypet.webp" },
    { name: "JobSpace", src: "/brand/clients/jobspace.webp" },
    { name: "Outsource", src: "/brand/clients/outsource.webp" },
    { name: "Utiliko", src: "/brand/clients/utiliko.webp" },
    { name: "Urmilla Enterprises", src: "/brand/clients/urmilla-enterprises.webp" },
    { name: "TNQTech", src: "/brand/clients/tnqtech.webp" },
    { name: "Heap", src: "/brand/clients/heap.webp" },
    { name: "Influx", src: "/brand/clients/influx.webp" },
    { name: "iGTB", src: "/brand/clients/igtb.webp" },
    { name: "Poorvika", src: "/brand/clients/poorvika.webp" },
    { name: "IDFC FIRST Bank", src: "/brand/clients/idfc-first-bank.webp" },
    { name: "Socrat.ai", src: "/brand/clients/socrat-ai.webp" },
    { name: "Translytics", src: "/brand/clients/translytics.webp" },
    { name: "Azzetta", src: "/brand/clients/azzetta.webp" },
    { name: "Aditya Birla Capital", src: "/brand/clients/aditya-birla-capital.webp" },
    { name: "HSBC", src: "/brand/clients/hsbc.webp" },
    { name: "Tramés", src: "/brand/clients/trames.webp" },
    { name: "Impiger Technologies", src: "/brand/clients/impiger-technologies.webp" },
    { name: "MontyCloud", src: "/brand/clients/montycloud.webp" },
    { name: "Evobot", src: "/brand/clients/evobot.webp" },
    { name: "Bulletin", src: "/brand/clients/bulletin.webp" },
    { name: "Logixal", src: "/brand/clients/logixal.webp" },
    { name: "Milagro", src: "/brand/clients/milagro.webp" },
    { name: "Glyde", src: "/brand/clients/glyde.webp" },
    { name: "Adappt", src: "/brand/clients/adappt.webp" },
    { name: "Arlynk", src: "/brand/clients/arlynk.webp" },
    { name: "Tradesocio", src: "/brand/clients/tradesocio.webp" },
    { name: "Syme", src: "/brand/clients/syme.webp" },
    { name: "PaceWisdom", src: "/brand/clients/pacewisdom.webp" },
    { name: "NPEC", src: "/brand/clients/npec.webp" },
    { name: "Adjecti", src: "/brand/clients/adjecti.webp" },
    { name: "Quber", src: "/brand/clients/quber.webp" },
    { name: "Camu", src: "/brand/clients/camu.webp" },
    { name: "Graphene Cloud", src: "/brand/clients/graphene-cloud.webp" },
    { name: "Vivant", src: "/brand/clients/vivant.webp" },
    { name: "Northern Arc", src: "/brand/clients/northern-arc.webp" },
    { name: "Omnium", src: "/brand/clients/omnium.webp" },
    { name: "Turquoise", src: "/brand/clients/turquoise.webp" },
    { name: "Safe Home Direct", src: "/brand/clients/safe-home-direct.webp" },
    { name: "Pedagogy.Cloud", src: "/brand/clients/pedagogy-cloud.webp" },
    { name: "dotSolved", src: "/brand/clients/dotsolved.webp" },
    { name: "Climber Software", src: "/brand/clients/climber-software.webp" },
    { name: "Appstrail", src: "/brand/clients/appstrail.webp" },
    { name: "ZySec.AI", src: "/brand/clients/zysec-ai.webp" },
    { name: "Vatins", src: "/brand/clients/vatins.webp" },
    { name: "SquareShift", src: "/brand/clients/squareshift.webp" },
    { name: "Sumanas Technologies", src: "/brand/clients/sumanas-technologies.webp" },
    { name: "Appmetry", src: "/brand/clients/appmetry.webp" },
    { name: "Who's Up", src: "/brand/clients/whos-up.webp" },
    { name: "Warmpoint", src: "/brand/clients/warmpoint.webp" },
    { name: "Enigma", src: "/brand/clients/enigma.webp" },
    { name: "The 2020 Diet", src: "/brand/clients/the-2020-diet.webp" },
    { name: "Teamicate", src: "/brand/clients/teamicate.webp" },
    { name: "Sulekha", src: "/brand/clients/sulekha.webp" },
    { name: "PromosTV", src: "/brand/clients/promostv.webp" },
    { name: "Tipstat", src: "/brand/clients/tipstat.webp" },
    { name: "Eagle Bot", src: "/brand/clients/eagle-bot.webp" },
    { name: "RevDau", src: "/brand/clients/revdau.webp" },
    { name: "Omri", src: "/brand/clients/omri.webp" },
    { name: "OfficeSpace", src: "/brand/clients/officespace.webp" },
    { name: "Oasis Digital", src: "/brand/clients/oasis-digital.webp" },
    { name: "Netsmartz", src: "/brand/clients/netsmartz.webp" },
    { name: "Decathlon", src: "/brand/clients/decathlon.webp" },
    { name: "ZAP!", src: "/brand/clients/zap.webp" },
    { name: "Yooba", src: "/brand/clients/yooba.webp" },
    { name: "mySnapps", src: "/brand/clients/mysnapps.webp" },
    { name: "MRX", src: "/brand/clients/mrx.webp" },
    { name: "McLaren Strategic Ventures", src: "/brand/clients/mclaren-strategic-ventures.webp" },
    { name: "Mcbird", src: "/brand/clients/mcbird.webp" },
    { name: "Mastermind", src: "/brand/clients/mastermind.webp" },
    { name: "Marriott", src: "/brand/clients/marriott.webp" },
    { name: "LynkManager", src: "/brand/clients/lynkmanager.webp" },
    { name: "LyncSpace", src: "/brand/clients/lyncspace.webp" },
    { name: "Love Food Hate Waste", src: "/brand/clients/love-food-hate-waste.webp" },
    { name: "LottoSocial", src: "/brand/clients/lottosocial.webp" },
    { name: "Linn Energy", src: "/brand/clients/linn-energy.webp" },
    { name: "Gulf Infotech", src: "/brand/clients/gulf-infotech.webp" },
    { name: "GoToSolr", src: "/brand/clients/gotosolr.webp" },
    { name: "Gipper", src: "/brand/clients/gipper.webp" },
    { name: "ginstr", src: "/brand/clients/ginstr.webp" },
    { name: "Fyndher", src: "/brand/clients/fyndher.webp" },
    { name: "Yalla", src: "/brand/clients/yalla.webp" },
    { name: "Flexicious", src: "/brand/clients/flexicious.webp" },
    { name: "EventBooking", src: "/brand/clients/eventbooking.webp" },
    { name: "Eostis", src: "/brand/clients/eostis.webp" },
    { name: "Ducont", src: "/brand/clients/ducont.webp" },
    { name: "DocToc", src: "/brand/clients/doctoc.webp" },
    { name: "Dlevered", src: "/brand/clients/dlevered.webp" },
    { name: "DB", src: "/brand/clients/db.webp" },
    { name: "BuildingOwl", src: "/brand/clients/buildingowl.webp" },
    { name: "Beautiful Mind", src: "/brand/clients/beautiful-mind.webp" },
    { name: "AuthoritySpy", src: "/brand/clients/authorityspy.webp" },
    { name: "Arcturus", src: "/brand/clients/arcturus.webp" },
    { name: "Appinux", src: "/brand/clients/appinux.webp" },
    { name: "Atomise", src: "/brand/clients/atomise.webp" },
    { name: "Ad.net", src: "/brand/clients/adnet.webp" },
    { name: "CloudBankin", src: "/brand/clients/cloudbankin.webp" },
    { name: "TrafficSpy", src: "/brand/clients/trafficspy.webp" },
    { name: "UniPick", src: "/brand/clients/unipick.webp" },
    { name: "Ixly Technologies", src: "/brand/clients/ixly-technologies.webp" },
    { name: "Fit AI", src: "/brand/clients/fit-ai.webp" },
  ],
};
