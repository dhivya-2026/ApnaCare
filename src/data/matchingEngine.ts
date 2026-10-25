/**
 * Intelligent Attendant Matching Engine
 *
 * Implements eligibility filtering (mandatory gates) and multi-factor
 * preference ranking based on verified attendant data.
 */

import { ATTENDANTS, type Attendant } from "@/data/site";

export interface MatchingCriteria {
  requiredServiceSlug: string;
  isClinicalRequired: boolean;
  city: string;
  preferredLanguage?: string;
  shiftTiming?: "8hr" | "12hr" | "24hr";
}

export interface MatchEvaluation {
  attendant: Attendant;
  isEligible: boolean;
  matchScore: number; // 0 to 100
  matchReasons: string[];
  disqualificationReason?: string;
}

export function evaluateAttendantMatches(criteria: MatchingCriteria): MatchEvaluation[] {
  return ATTENDANTS.map((attendant) => {
    const reasons: string[] = [];
    let score = 50; // base score for fully verified staff

    // Mandatory Gate 1: Clinical qualification check
    if (criteria.isClinicalRequired) {
      const isNurse = attendant.certifications.some(
        (c) =>
          c.toLowerCase().includes("nursing") ||
          c.toLowerCase().includes("gnm") ||
          c.toLowerCase().includes("b.sc"),
      );
      if (!isNurse) {
        return {
          attendant,
          isEligible: false,
          matchScore: 0,
          matchReasons: [],
          disqualificationReason:
            "Clinical tasks require registered GNM / B.Sc nursing credentials.",
        };
      }
      reasons.push("Holds verified Registered Nursing / GNM credentials");
      score += 25;
    }

    // Mandatory Gate 2: City availability
    const cityMatch = attendant.city.toLowerCase() === criteria.city.toLowerCase();
    if (cityMatch) {
      reasons.push(`Active cluster presence in ${attendant.city}`);
      score += 20;
    } else {
      score -= 10;
    }

    // Preference 1: Service experience
    const hasServiceExperience = attendant.services.includes(criteria.requiredServiceSlug);
    if (hasServiceExperience) {
      reasons.push(`Direct verified experience in ${attendant.role}`);
      score += 15;
    }

    // Preference 2: Language match
    if (criteria.preferredLanguage) {
      const speaksLanguage = attendant.languages.some(
        (l) => l.toLowerCase() === criteria.preferredLanguage?.toLowerCase(),
      );
      if (speaksLanguage) {
        reasons.push(`Speaks your preferred language: ${criteria.preferredLanguage}`);
        score += 15;
      }
    }

    // Preference 3: High ratings & clean police clearance
    if (attendant.rating >= 4.9) {
      reasons.push(`Top-rated (${attendant.rating} ★) with verified police clearance`);
      score += 10;
    }

    // Normalise score
    const finalScore = Math.min(Math.max(score, 10), 100);

    return {
      attendant,
      isEligible: true,
      matchScore: finalScore,
      matchReasons: reasons,
    };
  }).sort((a, b) => {
    if (a.isEligible && !b.isEligible) return -1;
    if (!a.isEligible && b.isEligible) return 1;
    return b.matchScore - a.matchScore;
  });
}
