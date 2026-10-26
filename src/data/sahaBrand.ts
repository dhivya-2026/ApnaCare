/**
 * Centralized Brand Terminology: Saha
 *
 * Saha — ApnaCare's signature name for its trusted care and support team.
 * "Meet the people behind your peace of mind."
 *
 * Core Concept:
 * - Individual: Saha
 * - Collective: Saha team / Our Saha Team
 * - Matching CTA: Find Your Saha / Choose Your Saha
 * - Joining Workforce: Become a Saha / Join the Saha Team
 * - Application: Saha Application
 * - Portal: Saha Portal Login
 *
 * Clinical Boundary Notice:
 * Saha is ApnaCare's brand term for non-clinical care companions and support staff.
 * It is NOT a clinical medical qualification. Nurses (GNM / B.Sc) and medical specialists
 * retain their distinct statutory credentials and professional titles.
 */

export const SAHA_BRAND = {
  name: "Saha",
  tagline: "The people who provide your support.",
  brandStatement: "Meet the people behind your peace of mind.",
  teamIntro:
    "Meet the Saha team — people who support your family through everyday care needs, hospital visits, and important moments at home.",
  collective: "Saha team",
  collectiveTitle: "Our Saha Team",
  singular: "Saha",
  singularWithRole: "Saha Care Companion",
  
  ctas: {
    findYourSaha: "Find Your Saha",
    chooseYourSaha: "Choose Your Saha",
    meetOurTeam: "Meet Our Saha Team",
    meetYourSaha: "Meet Your Saha",
    becomeASaha: "Become a Saha",
    joinTheTeam: "Join the Saha Team",
    sahaApplication: "Saha Application",
    sahaProfiles: "Saha Profiles",
    sahaPortal: "Saha Portal Login",
    bookSaha: "Book Your Saha",
  },

  clinicalBoundaryNotice:
    "Saha care companions provide compassionate, non-clinical personal care and daily living assistance. Licensed clinical procedures (injections, IV infusions, catheter care, sterile wound dressings) are performed exclusively by registered GNM/B.Sc nurses under physician prescription.",
} as const;

export type SahaBrand = typeof SAHA_BRAND;
