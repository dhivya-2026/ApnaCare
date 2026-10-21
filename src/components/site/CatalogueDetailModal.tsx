import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { BadgeCheck, Check, X, ShieldAlert, Sparkles, Building2, UserCheck, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookLink, CallLink } from "./Layout";
import { formatINR, SITE } from "@/data/site";
import type { CatalogueService } from "@/data/serviceCatalogue";
import { cn } from "@/lib/utils";

interface CatalogueDetailModalProps {
  service: CatalogueService | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenBusinessEnquiry?: (service: CatalogueService) => void;
}

export function CatalogueDetailModal({
  service,
  open,
  onOpenChange,
  onOpenBusinessEnquiry,
}: CatalogueDetailModalProps) {
  if (!service) return null;

  const isBusiness = service.actionType === "business_enquiry";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl">
        <DialogHeader className="text-left space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider">
              {service.categoryId.replace(/-/g, " ")}
            </span>
            {service.isClinical ? (
              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300">
                Clinical Professional
              </span>
            ) : (
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                Non-Medical Support
              </span>
            )}
          </div>
          <DialogTitle className="text-2xl sm:text-3xl font-bold font-display text-foreground">
            {service.name}
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground leading-relaxed">
            {service.description}
          </DialogDescription>
        </DialogHeader>

        {/* Target ICP / Customer */}
        <div className="mt-4 rounded-2xl bg-secondary/50 p-4 border border-border/60">
          <p className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
            <UserCheck className="size-4" />
            Who This Service Is For
          </p>
          <p className="mt-1 text-sm font-medium text-foreground">{service.intendedCustomer}</p>
        </div>

        {/* Key Benefits */}
        <div className="mt-5 space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Key Service Benefits
          </p>
          <ul className="space-y-2">
            {service.keyBenefits.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-foreground">
                <Check className="size-4 shrink-0 text-primary mt-0.5" aria-hidden />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Inclusions vs Non-Medical Boundaries */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-primary/20 bg-primary-soft/40 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <BadgeCheck className="size-4" />
              What The Attendant Helps With
            </p>
            <ul className="mt-2.5 space-y-1.5 text-xs text-foreground/90">
              {service.whatIncluded.map((item) => (
                <li key={item} className="flex items-start gap-1.5">
                  <span className="text-primary font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-destructive flex items-center gap-1.5">
              <ShieldAlert className="size-4" />
              What Is Not Included (Boundaries)
            </p>
            <ul className="mt-2.5 space-y-1.5 text-xs text-muted-foreground">
              {service.whatNotIncluded.map((item) => (
                <li key={item} className="flex items-start gap-1.5">
                  <X className="size-3.5 shrink-0 text-destructive mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Verification & Availability Info */}
        <div className="mt-6 rounded-2xl bg-muted/40 p-4 border border-border text-xs text-muted-foreground space-y-1.5">
          <p className="font-semibold text-foreground flex items-center gap-1.5">
            <Calendar className="size-4 text-primary" />
            Availability & Scheduling
          </p>
          <p>{service.availability}</p>
          <p className="pt-1 text-[11px] text-muted-foreground">
            <strong>Caregiver Qualification:</strong> {service.providerType}. 100% Aadhaar-authenticated and background-checked.
          </p>
        </div>

        {/* Rate & Action Footer */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
          <div>
            <p className="text-xs text-muted-foreground">
              {isBusiness ? "Pricing Structure" : "Starting Transparent Rate"}
            </p>
            {service.startingPrice ? (
              <p className="font-display text-2xl font-bold text-foreground">
                {formatINR(service.startingPrice)}
                <span className="text-xs font-normal text-muted-foreground">
                  /{service.pricingUnit || "day"} + 18% GST
                </span>
              </p>
            ) : (
              <p className="font-display text-lg font-bold text-foreground">
                Custom Institutional Quote
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2.5">
            {isBusiness ? (
              <Button
                variant="warm"
                size="lg"
                className="min-h-[44px]"
                onClick={() => {
                  onOpenChange(false);
                  if (onOpenBusinessEnquiry) {
                    onOpenBusinessEnquiry(service);
                  }
                }}
              >
                <Building2 className="size-4 mr-2" />
                Submit Business Enquiry
              </Button>
            ) : (
              <>
                <BookLink
                  service={service.mappedCoreServiceSlug || "elderly-care"}
                  variant="warm"
                  size="lg"
                  className="min-h-[44px]"
                  onClick={() => onOpenChange(false)}
                >
                  {service.actionType === "request" ? "Request Assistance" : "Book This Service"}
                </BookLink>
                <CallLink
                  variant="outline"
                  size="lg"
                  className="min-h-[44px]"
                >
                  Call Support
                </CallLink>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
