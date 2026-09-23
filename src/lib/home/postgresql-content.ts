/**
 * Copy for the "PostgreSQL Development" landing page
 * (`/postgresql-development-company`).
 *
 * Every heading, paragraph and list item below is the approved marketing copy
 * from the "PostgreSQL" tab of the landing-page content doc, reproduced
 * verbatim — including its SEO title, meta description and URL. Shapes match
 * the prop types exported by the shared landing sections, so each section is
 * `<Component content={…} />` with no adapter in between. Built the same way
 * as `/vuejs-development-company` and the other pages from the same doc.
 *
 * Three bands are the homepage's own sections rendered verbatim (see the
 * route), as the doc asks: the clients band, the testimonials, and the closing
 * CTA.
 *
 * Deliberate departures from the source, noted rather than silently applied:
 *
 *  - Unlike its siblings, the doc's SEO title here carries NO " | Soft Suave"
 *    suffix, so the route renders `pgMeta.title` exactly as written instead of
 *    appending one.
 *
 *  - The doc gives no eyebrow for the mid-page CTA, nor a placeholder for the
 *    form's requirement field; both follow the sibling pages' pattern.
 *
 * Images: Pexels photographs from the image pipeline — slots
 * `postgresql-hero`, `ov-postgresql-development-company` and `pg-svc-*` in
 * content/images.manifest.json.
 */

import { partnerHeroBadges } from "./hero-badges";
import { landingImage, landingPhoto, overviewImage } from "./overview-images";
import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesCarouselContent } from "@/components/common/services-carousel";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { CardGridContent } from "@/components/landing/industries";
import type { TechStackContent } from "@/components/home/tech-stack";
import type { FaqContent } from "@/components/landing/faq";

export const pgMeta = {
  slug: "postgresql-development-company",
  path: "/postgresql-development-company",
  /** The full <title>, verbatim — see the module docblock. */
  title: "PostgreSQL Development Company for Reliable Databases",
  description:
    "Build dependable databases with Soft Suave, a PostgreSQL development company backed by 13+ years of technology expertise and 400+ AI & Engineering Specialists.",
} as const;

export const pgHero: HeroContent = {
  // The H1, split so the last line takes the coral accent.
  titleLines: ["PostgreSQL Development Company", "for Dependable Data Systems"],
  body: [
    "Business applications need databases that preserve accuracy as data, users, and integrations grow. Soft Suave serves as a reliable PostgreSQL development company for teams improving schema design, query performance, migrations, and database operations while keeping database work aligned with application requirements.",
    "Bring us your database bottlenecks or expansion plans, and we’ll help identify the most practical next step.",
  ],
  points: [
    "PostgreSQL Architecture and Optimization",
    "High Availability and Replication Expertise",
    "Secure Database Migration and Integration",
    "400+ AI & Engineering Specialists",
    "ISO/IEC 27001:2022 Certified",
  ],
  badges: partnerHeroBadges,
  form: {
    eyebrow: "Business Enquiry",
    title: "Let's Discuss Your Project",
    note: "Alert: This form is for business, not candidates. To apply for jobs,",
    noteLink: { label: "click here", href: "/career-overview" },
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "What do you want to build?",
    requirementPlaceholder:
      "Your current database and workload, the bottleneck or change you are planning, and whether this is a new PostgreSQL build, a migration, or performance work on an existing one.",
    subject: "PostgreSQL Development enquiry",
  },
  image: landingPhoto("postgresql-hero"),
};

export const pgOverview: OverviewContent = {
  eyebrow: "Overview",
  title: "Building Stronger Data Foundations With PostgreSQL",
  paragraphs: [
    "PostgreSQL is an open-source relational database management system used to store, organize, and query application data. It supports transactions, relationships, data types, indexing, and database capabilities required across web, mobile, analytics, and enterprise systems.",
    "Database structure should reflect how an application actually works. This principle guides Soft Suave’s approach as a PostgreSQL development company, from data relationships to reporting and system integration. Our work can include schema design, functions, query development, migrations, performance reviews, backup planning, and connections with backend services.",
    "Backed by 13+ years of technology expertise, our engineers coordinate with application, cloud, DevOps, and data teams. We align PostgreSQL work with your coding standards, access controls, deployment processes, and maintenance expectations. Our delivery presence across Chennai, Bengaluru, and the United States supports clear communication and consistent project coordination with clients worldwide.",
  ],
  image: overviewImage("postgresql-development-company"),
};

export const pgServices: ServicesCarouselContent = {
  eyebrow: "Services",
  title: "PostgreSQL Development Services for Data Systems",
  body: "Our PostgreSQL development services create dependable data foundations that support current operations and adapt as your applications and business requirements evolve.",
  items: [
    {
      name: "Custom PostgreSQL Database Development",
      body: "Custom PostgreSQL development covers structured schemas, stored procedures, functions, constraints, and data models designed around your application workflows and rules.",
      image: landingImage("pg-svc-custom"),
    },
    {
      name: "PostgreSQL Schema and Architecture Design",
      body: "Plan tables, relationships, indexes, partitions, and access patterns that support data integrity, application behavior, reporting requirements, and future database changes.",
      image: landingImage("pg-svc-schema"),
    },
    {
      name: "PostgreSQL Migration and Modernization",
      body: "Move data from legacy or alternative databases to PostgreSQL through assessment, mapping, staged migration, compatibility review, validation, and coordinated cutover.",
      image: landingImage("pg-svc-migration"),
    },
    {
      name: "PostgreSQL Query and Performance Review",
      body: "Examine execution plans, indexing, joins, query patterns, configuration, and resource usage to identify bottlenecks and recommend focused PostgreSQL performance improvements.",
      image: landingImage("pg-svc-performance"),
    },
    {
      name: "PostgreSQL Application Integration",
      body: "Connect PostgreSQL with backend services, APIs, reporting tools, cloud platforms, and third-party systems using integration methods suited to your architecture.",
      image: landingImage("pg-svc-integration"),
    },
    {
      name: "PostgreSQL Support and Maintenance",
      body: "Maintain PostgreSQL environments through issue resolution, version upgrades, backup reviews, monitoring adjustments, query changes, security updates, and ongoing database documentation.",
      image: landingImage("pg-svc-support"),
    },
  ],
};

/** The mid-page band between the services and the why-us section. */
export const pgPlanCta: CtaBandContent = {
  eyebrow: "Next Step",
  title: "Move From Database Complexity to Clearer Growth",
  body: "Transform a difficult database environment into a structured foundation that supports changing application needs. Our PostgreSQL team can help you plan the improvements needed to move forward.",
  cta: { label: "Plan Your Database Improvements", href: "#enquiry" },
};

export const pgWhyUs: CardGridContent = {
  eyebrow: "Why Choose Us",
  title: "Why Choose Soft Suave for PostgreSQL Development?",
  body: "Work with a PostgreSQL partner prepared to support your immediate priorities and the future direction of your database environment.",
  items: [
    {
      name: "Experience Across Database Project Stages",
      body: "Apply 13+ years of technology expertise to database planning, development, migration, and support.",
    },
    {
      name: "Broader Engineering Support When Needed",
      body: "Access 400+ AI & Engineering Specialists for application, cloud, data, integration, and testing needs.",
    },
    {
      name: "Data Models Based on Your Application",
      body: "Structure schemas and database logic around your application workflows and reporting requirements.",
    },
    {
      name: "ISO/IEC 27001:2022 Certification",
      body: "Our ISO/IEC 27001:2022 certification supports structured information security management throughout project delivery.",
    },
    {
      name: "Delivery Presence Across Key Locations",
      body: "Delivery presence across Chennai, Bengaluru, and the United States supports coordinated communication.",
    },
    {
      name: "Continued PostgreSQL Database Support",
      body: "Continue with monitoring, upgrades, query reviews, issue resolution, and database improvements after deployment.",
    },
  ],
};

/** The source table's eight categories, in its order. */
export const pgTech: TechStackContent = {
  eyebrow: "Technologies",
  title: "Technology Stack Built Around Your PostgreSQL Environment",
  body: "Your architecture should guide the technology and not the other way around. We choose a practical tech stack that supports how your PostgreSQL environment operates today and evolves tomorrow.",
  groups: [
    { name: "PostgreSQL Core", items: ["PostgreSQL", "SQL", "PL/pgSQL"] },
    { name: "Database Modeling", items: ["Schemas", "Tables", "Constraints", "Indexes", "Views"] },
    { name: "Data Types and Extensions", items: ["JSONB", "Arrays", "Full-text search", "PostGIS"] },
    { name: "Administration", items: ["pgAdmin", "psql", "Backup and restore tools"] },
    { name: "Backend Integration", items: ["Node.js", ".NET", "Java", "Python", "PHP"] },
    { name: "Migration and Versioning", items: ["Flyway", "Liquibase", "Schema migration tools"] },
    { name: "DevOps and Deployment", items: ["Docker", "Kubernetes", "CI/CD"] },
    { name: "Managed Cloud Databases", items: ["AWS RDS", "Azure Database", "Google Cloud SQL"] },
  ],
};

export const pgFaqs: FaqContent = {
  eyebrow: "Ask Us",
  title: "Frequently Asked Questions About PostgreSQL Development",
  body: "Review questions about PostgreSQL development, migrations, integrations, performance, project costs, delivery timelines, security, and ongoing support.",
  items: [
    {
      q: "What services does a PostgreSQL development company offer?",
      a: "A PostgreSQL development company can design schemas, develop queries and functions, integrate applications, plan migrations, review performance, and maintain database environments. Services depend on your application architecture, data relationships, current workloads, operational requirements, existing technology landscape, and database ownership model.",
    },
    {
      q: "Is PostgreSQL suitable for business applications?",
      a: "Yes. PostgreSQL supports transactional applications, content platforms, business systems, analytics workloads, geospatial solutions, and data-intensive business products. Suitability depends on data structure, query patterns, availability expectations, integration requirements, team capabilities, operational constraints, and how the application is expected to evolve.",
    },
    {
      q: "Can PostgreSQL work with our current applications and APIs?",
      a: "Yes. PostgreSQL can connect with web applications, mobile backends, APIs, reporting platforms, data pipelines, and third-party systems. Integration planning should address connection management, authentication, transaction boundaries, data formats, error handling, synchronization needs, and ownership of business logic across connected components.",
    },
    {
      q: "Can you migrate our existing database to PostgreSQL?",
      a: "Yes. We can assess your current database and plan a complete or phased PostgreSQL migration. The process considers schemas, data types, stored logic, existing dependencies, application compatibility, downtime constraints, validation requirements, rollback planning, and the sequence for moving workloads safely.",
    },
    {
      q: "Can your PostgreSQL specialists work with our internal team?",
      a: "Yes. Our PostgreSQL specialists can coordinate with internal developers, infrastructure teams, product owners, and external vendors. Responsibilities, communication methods, access requirements, review processes, and release activities are agreed early so database work remains aligned with wider application and business priorities.",
    },
    {
      q: "How much do PostgreSQL development services cost?",
      a: "PostgreSQL development costs depend on database scope, schema complexity, data volume, integrations, migration requirements, performance work, testing, and operational responsibilities. We confirm project pricing after reviewing requirements and scope.",
    },
    {
      q: "How long does a PostgreSQL development project take?",
      a: "Delivery timelines depend on the project scope, complexity, integrations, and resource requirements. A realistic schedule is confirmed after the discovery discussion. A new database design, targeted performance review, application integration, and staged migration each require different planning and implementation schedules.",
    },
    {
      q: "Do you provide PostgreSQL support after deployment?",
      a: "Yes. Support can include issue resolution, query reviews, database upgrades, backup checks, monitoring adjustments, schema changes, and documentation updates. We first review your environment, access arrangements, deployment process, priorities, and the responsibilities clearly shared between your team and our engineers.",
    },
  ],
};
