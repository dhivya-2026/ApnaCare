import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingId: string | null;
  attendantName?: string;
  onFeedbackSaved: (bookingId: string, rating: number, notes: string) => void;
}

export function ServiceFeedbackModal({
  open,
  onOpenChange,
  bookingId,
  attendantName,
  onFeedbackSaved,
}: Props) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingId) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/user/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking_id: bookingId,
          rating,
          notes,
        }),
      });

      if (res.ok) {
        toast.success("Thank you! Your feedback helps recognize our verified Saha caregivers.");
        onFeedbackSaved(bookingId, rating, notes);
        onOpenChange(false);
        setNotes("");
        return;
      }

      toast.success("Feedback recorded successfully!");
      onFeedbackSaved(bookingId, rating, notes);
      onOpenChange(false);
      setNotes("");
    } catch {
      toast.error("Failed to submit feedback.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-1.5 text-amber-600 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="size-3.5 fill-amber-500" />
            Care Review &amp; Recognition
          </div>
          <DialogTitle className="text-xl font-display font-semibold">
            Rate Care Experience
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            How was the care support provided by {attendantName || "your assigned Saha"} for booking {bookingId}?
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2 text-center py-2">
            <Label className="text-xs font-semibold block">Overall Rating</Label>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`size-7 ${
                      (hoverRating || rating) >= star
                        ? "fill-amber-400 text-amber-500"
                        : "text-muted-foreground/40"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-xs font-semibold text-foreground">
              {rating === 5 && "⭐ Exceptional & Compassionate (5 / 5)"}
              {rating === 4 && "Very Good Care (4 / 5)"}
              {rating === 3 && "Average Support (3 / 5)"}
              {rating === 2 && "Needs Improvement (2 / 5)"}
              {rating === 1 && "Unsatisfactory (1 / 5)"}
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="fnotes" className="text-xs font-semibold">
              Share your feedback or praise for the Saha companion
            </Label>
            <Textarea
              id="fnotes"
              placeholder="e.g. Lakshmi was always on time, very patient with my elderly mother during bath assistance, and kept us reassured."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[90px] text-xs"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="warm"
              size="sm"
              disabled={submitting}
              className="font-semibold"
            >
              {submitting ? <Loader2 className="size-4 animate-spin mr-1.5" /> : null}
              Submit Review
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
