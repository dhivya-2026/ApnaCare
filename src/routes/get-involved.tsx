import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, Building2, HeartHandshake, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/get-involved")({
  head: () =>
    seo(
      "Get Involved — Partner, Volunteer, or Join LifeSakthi",
      "Participate in LifeSakthi's mission across South India: become a verified Saha care professional, collaborate as an NGO or institutional partner, volunteer, or request family support.",
      {
        canonical: "https://apna-care.vercel.app/get-involved",
        keywords: [
          "volunteer women empowerment India",
          "become a Saha caregiver",
          "NGO partnership South India",
          "LifeSakthi careers",
        ],
      }
    ),
  component: GetInvolvedPage,
});

const PATHWAYS = [
  {
    icon: Briefcase,
    title: "Women Seeking Training & Employment",
    badge: "Active Hiring & SHG Onboarding",
    description:
      "Join LifeSakthi as a trained, police-verified Saha Care Companion. Earn dignified income with structured training and respectful working conditions.",
    ctaLabel: "Apply as a Saha",
    ctaTo: "/become-an-attendant",
  },
  {
    icon: Building2,
    title: "NGOs, SHGs & Institutional Partners",
    badge: "Collaborative Outreach",
    description:
      "Co-develop women's vocational skilling, girl-child development programmes, or hospital and community wellbeing initiatives across South India.",
    ctaLabel: "View Ecosystem Partnerships",
    ctaTo: "/ecosystem-partners",
  },
  {
    icon: Users,
    title: "Volunteers & Community Contributors",
    badge: "Community Participation",
    description:
      "Contribute your time, mentorship, health literacy expertise, or local community coordination to support women and children.",
    ctaLabel: "Register Your Interest",
    ctaTo: "#participate-form",
  },
  {
    icon: HeartHandshake,
    title: "Parents & Families Seeking Support",
    badge: "Operational Care Desk",
    description:
      "Access verified elderly care, hospital bedside assistance, certified home nursing, or maternal and newborn support.",
    ctaLabel: "Request Care Support",
    ctaTo: "/booking",
  },
];

function GetInvolvedPage() {
  return (
    <div className="bg-background">
      <section className="border-b border-border bg-primary-soft/35 section-spacing">
        <div className="container-page max-w-4xl">
          <p className="eyebrow">Participate in LifeSakthi</p>
          <h1 className="mt-3 font-display text-fluid-hero font-semibold text-foreground">
            Together, We Can Build Stronger Futures.
          </h1>
          <p className="mt-4 text-fluid-body text-muted-foreground">
            Whether you are a woman looking for dignified skill-based employment, an organisation seeking community impact partnerships, a volunteer, or a family seeking care—there is a clear path for you at LifeSakthi.
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-2">
            {PATHWAYS.map((item) => {
              const Icon = item.icon;
              const isHash = item.ctaTo.startsWith("#");
              return (
                <article
                  key={item.title}
                  className="flex flex-col justify-between rounded-3xl border border-border bg-card p-6 sm:p-8"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="grid size-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                        <Icon className="size-5" />
                      </span>
                      <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground">
                        {item.badge}
                      </span>
                    </div>
                    <h2 className="mt-4 font-display text-2xl font-semibold text-foreground">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-6">
                    {isHash ? (
                      <Button asChild variant="outline" className="rounded-full">
                        <a href={item.ctaTo}>
                          {item.ctaLabel}
                          <ArrowRight className="size-4" />
                        </a>
                      </Button>
                    ) : (
                      <Button asChild className="rounded-full">
                        <Link to={item.ctaTo}>
                          {item.ctaLabel}
                          <ArrowRight className="size-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="participate-form" className="border-t border-border bg-card section-spacing">
        <div className="container-page max-w-3xl">
          <div className="text-center mb-8">
            <p className="eyebrow">Connect With Our Coordination Desk</p>
            <h2 className="mt-2 font-display text-fluid-section font-semibold text-foreground">
              Volunteer, Partner, or Share an Enquiry
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Tell us how you would like to collaborate with LifeSakthi and our regional coordinator will respond promptly.
            </p>
          </div>
          <EnquiryForm />
        </div>
      </section>
    </div>
  );
}
