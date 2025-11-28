import { CalendarClock, ThumbsDown, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/star-rating";
import type { NormalizedReview, VoteValue } from "@/lib/types";

type ReviewCardProps = {
  review: NormalizedReview;
  onVote: (reviewId: string, vote: VoteValue) => void;
  disabled?: boolean;
};

const formatDate = (value: string | null | undefined) => {
  if (!value) return "recently";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime())
    ? value
    : parsed.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
};

export function ReviewCard({ review, onVote, disabled }: ReviewCardProps) {
  const voted = review.userVote;
  const visitLabel = review.visitDate
    ? `Visited ${formatDate(review.visitDate)}`
    : `Posted ${formatDate(review.createdAt)}`;

  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-card/80 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-pink-500 opacity-80" />
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-11 w-11">
            <AvatarFallback className="bg-gradient-to-br from-orange-500 to-pink-500 text-white">
              {review.authorInitials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold leading-tight">{review.author || "Anonymous"}</p>
            <p className="text-xs text-muted-foreground">{visitLabel}</p>
          </div>
        </div>
        <Badge variant="secondary" className="rounded-full">
          {review.netHelpful >= 0 ? `+${review.netHelpful}` : review.netHelpful} helpful
        </Badge>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <StarRating rating={review.rating} size="sm" showNumber={false} />
        <span className="text-xs text-muted-foreground">Rated {review.rating.toFixed(1)}</span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{review.text}</p>

      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1">
            <ThumbsUp className="h-3.5 w-3.5" />
            {review.helpfulVotes} helpful
          </span>
          <span className="inline-flex items-center gap-1">
            <ThumbsDown className="h-3.5 w-3.5" />
            {review.unhelpfulVotes} not helpful
          </span>
          {review.visitDate && (
            <span className="inline-flex items-center gap-1">
              <CalendarClock className="h-3.5 w-3.5" />
              Visited {formatDate(review.visitDate)}
            </span>
          )}
        </div>
        <Badge variant={voted ? "default" : "outline"} className="rounded-full">
          {voted ? (voted === 1 ? "You found this helpful" : "You marked not helpful") : "Vote"}
        </Badge>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          variant={voted === 1 ? "default" : "outline"}
          size="sm"
          disabled={disabled || !!voted}
          onClick={() => onVote(review.id, 1)}
          className="gap-2"
        >
          <ThumbsUp className="h-4 w-4" />
          Helpful
        </Button>
        <Button
          variant={voted === -1 ? "destructive" : "ghost"}
          size="sm"
          disabled={disabled || !!voted}
          onClick={() => onVote(review.id, -1)}
          className="gap-2"
        >
          <ThumbsDown className="h-4 w-4" />
          Not Helpful
        </Button>
      </div>
    </div>
  );
}
