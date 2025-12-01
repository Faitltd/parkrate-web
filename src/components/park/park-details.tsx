"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef } from "react";
import { ArrowLeft, Clock, Filter, Globe, Loader2, MapPin, Phone, Sparkles, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ReviewCard } from "@/components/park/review-card";
import { StarRating } from "@/components/star-rating";
import { useParkInteractions } from "./use-park-interactions";
import type { ThemePark } from "@/lib/types";

interface ParkDetailsProps {
  park: ThemePark;
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function ParkDetails({ park }: ParkDetailsProps) {
  const {
    actionMessage,
    authLoading,
    changeSort,
    clientIdPresent,
    handleDirections,
    handleReviewSubmit,
    handlePhotosSelected,
    handleSave,
    handleShare,
    handleVote,
    hasMore,
    isLoggedIn,
    loading,
    loadingMore,
    loadMore,
    page,
    pageSize,
    reviewFormRef,
    reviewText,
    reviews,
    saved,
    selectedRating,
    setReviewText,
    setSelectedRating,
    setVisitDate,
    signIn,
    signOut,
    sort,
    syncError,
    total,
    totalPages,
    user,
    photoPreviews,
    removePhoto,
    visitDate,
  } = useParkInteractions(park);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://parkrate.com").replace(/\/$/, "");
  const canonical = `${siteUrl}/park/${park.id}`;
  const parsedHours = parseHours(park.hours);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AmusementPark",
    name: park.name,
    description: park.description,
    image: park.image,
    url: canonical,
    priceRange: park.priceRange,
    telephone: park.phone,
    sameAs: [`https://${park.website}`],
    audience: {
      "@type": "Audience",
      audienceType: park.audienceType,
    },
    location: {
      "@type": "Place",
      name: park.location,
    },
    openingHoursSpecification: parsedHours
      ? daysOfWeek.map((day) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: day,
          opens: parsedHours.opens,
          closes: parsedHours.closes,
        }))
      : undefined,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: park.rating,
      reviewCount: park.reviewCount,
    },
    amenityFeature: park.features.map((feature) => ({
      "@type": "LocationFeatureSpecification",
      name: feature,
    })),
  };

  useEffect(() => {
    const sentinel = loadMoreRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore && !loadingMore) {
          void loadMore();
        }
      },
      { rootMargin: "240px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadMore, loadingMore]);

  return (
    <div className="min-h-screen page-surface">
      <Script
        id={`park-schema-${park.id}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to all parks
              </Button>
            </Link>
            <div className="flex gap-2">
              <Link href="/map">
                <Button variant="outline" size="sm">
                  Map View
                </Button>
              </Link>
              <Link href="/compare">
                <Button variant="outline" size="sm">
                  Compare Parks
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="relative h-96 rounded-3xl overflow-hidden mb-8">
          <Image
            src={park.image}
            alt={park.name}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6 text-white z-10">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge className="bg-white/90 text-black hover:bg-white">
                  {park.audienceType}
                </Badge>
                <Badge className="bg-white/90 text-black hover:bg-white">
                  {park.parkType}
                </Badge>
              </div>
              <h1 className="text-5xl font-bold mb-2">{park.name}</h1>
              <div className="flex items-center gap-2 text-lg">
                <MapPin className="w-5 h-5" />
                {park.location}
              </div>
            </div>
            <Badge className="bg-white/90 text-black hover:bg-white text-lg px-4 py-2 self-start md:self-end">
              {park.priceRange}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.75fr_1fr] gap-8 items-start">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="flex items-center gap-2">
                    Review Pulse
                    <Badge variant="secondary" className="gap-1">
                      <Sparkles className="w-3 h-3" />
                      Live
                    </Badge>
                  </CardTitle>
                  <Badge variant="outline" className="text-xs">
                    Sorted by {sort === "helpful" ? "helpfulness" : "newest first"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-2">{park.rating.toFixed(1)}</div>
                    <StarRating rating={park.rating} size="lg" showNumber={false} />
                    <p className="text-sm text-muted-foreground mt-2">
                      Based on {total} reviews
                    </p>
                  </div>
                  <div className="flex-1 w-full">
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={() => reviewFormRef.current?.scrollIntoView({ behavior: "smooth" })}
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Share your visit
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-6 space-y-4">
                  <h3 className="font-semibold mb-4">Rating Breakdown</h3>
                  {Object.entries(park.categoryRatings).map(([category, rating]) => (
                    <div key={category} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="capitalize font-medium">{category}</span>
                        <span className="text-muted-foreground">{rating.toFixed(1)}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-pink-500 transition-all duration-300"
                          style={{ width: `${(rating / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {park.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {park.categories.map((category) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Features & Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {park.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Review Gallery
                      <Badge variant="secondary" className="gap-1">
                        <Sparkles className="w-3 h-3" />
                        Ranked
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Showing {reviews.length} of {total} reviews ·{" "}
                      {sort === "helpful" ? "Most helpful first" : "Newest first"}
                    </p>
                    {total > 100 && (
                      <p className="text-xs text-muted-foreground">
                        Page {page} of {totalPages} · auto-loading {pageSize} at a time
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={sort === "helpful" ? "default" : "outline"}
                      size="sm"
                      className="gap-2"
                      onClick={() => changeSort("helpful")}
                    >
                      <Sparkles className="w-4 h-4" />
                      Most Helpful
                    </Button>
                    <Button
                      variant={sort === "newest" ? "default" : "outline"}
                      size="sm"
                      className="gap-2"
                      onClick={() => changeSort("newest")}
                    >
                      <Filter className="w-4 h-4" />
                      Newest
                    </Button>
                    {isLoggedIn ? (
                      <>
                        <Badge variant="outline" className="gap-2">
                          Signed in as {user?.name ?? "Google user"}
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={signOut} disabled={authLoading}>
                          Sign out
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" onClick={signIn} disabled={authLoading}>
                        {clientIdPresent ? "Sign in with Google" : "Use Google (demo)"}
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {loading && (
                  <div className="rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Syncing latest reviews...
                  </div>
                )}
                {syncError && (
                  <div className="rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
                    {syncError}
                  </div>
                )}
                {actionMessage && (
                  <div className="rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
                    {actionMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviews.map((review) => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      onVote={handleVote}
                      disabled={loading}
                    />
                  ))}
                  {!reviews.length && !loading && (
                    <div className="col-span-full rounded-lg border border-dashed p-6 text-center text-muted-foreground">
                      No reviews yet — be the first to share your take.
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div ref={loadMoreRef} className="h-2 w-full" />
                  {hasMore ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => loadMore()}
                      disabled={loadingMore}
                      className="min-w-[180px]"
                    >
                      {loadingMore && <Loader2 className="w-4 h-4 animate-spin" />}
                      {loadingMore ? "Loading more" : `Load ${pageSize} more`}
                    </Button>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      You&apos;re seeing all available reviews.
                    </p>
                  )}
                </div>

                <div ref={reviewFormRef} className="border rounded-2xl p-5 bg-muted/40">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Share your experience</h3>
                    <Badge variant="outline">Earn helpful votes</Badge>
                  </div>
                  {!isLoggedIn && (
                    <div className="mb-3 flex flex-wrap items-center gap-3 rounded-lg border border-dashed bg-background px-3 py-2 text-sm text-muted-foreground">
                      <span>Sign in with Google to post a review.</span>
                      <Button size="sm" onClick={signIn} disabled={authLoading}>
                        {clientIdPresent ? "Sign in with Google" : "Use Google (demo)"}
                      </Button>
                    </div>
                  )}
                  <Textarea
                    placeholder="Tell others about your visit to this park..."
                    className="mb-3"
                    rows={4}
                    value={reviewText}
                    onChange={(event) => setReviewText(event.target.value)}
                    disabled={!isLoggedIn || loading}
                  />
                  <div className="mb-3 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-muted-foreground">
                        Add photos (up to 6)
                      </label>
                      <Input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(event) => handlePhotosSelected(event.target.files)}
                        disabled={!isLoggedIn || loading}
                        className="max-w-xs"
                      />
                    </div>
                    {photoPreviews.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {photoPreviews.map((photo, index) => (
                          <div key={photo} className="relative overflow-hidden rounded-xl border bg-background">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={photo} alt={`Upload ${index + 1}`} className="h-24 w-full object-cover" />
                            <button
                              type="button"
                              className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-xs text-white"
                              onClick={() => removePhoto(index)}
                              aria-label="Remove photo"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                            aria-pressed={selectedRating === star}
                            onClick={() => setSelectedRating(star)}
                            disabled={!isLoggedIn || loading}
                          >
                            <Star
                              className={`w-6 h-6 cursor-pointer hover:fill-amber-400 hover:text-amber-400 transition-colors ${
                                selectedRating && star <= selectedRating
                                  ? "fill-amber-400 text-amber-400"
                                  : "fill-gray-200 text-muted-foreground"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <Input
                        type="date"
                        value={visitDate}
                        onChange={(event) => setVisitDate(event.target.value)}
                        className="w-48"
                        aria-label="Visit date"
                        disabled={!isLoggedIn || loading}
                      />
                    </div>
                    <Button onClick={handleReviewSubmit} disabled={loading || !isLoggedIn}>
                      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                      Post Review
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 xl:sticky xl:top-28">
            <Card>
              <CardHeader>
                <CardTitle>Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Hours</p>
                    <p className="text-sm text-muted-foreground">{park.hours}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Phone</p>
                    <a
                      href={`tel:${park.phone}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {park.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Website</p>
                    <a
                      href={`https://${park.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {park.website}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Location</p>
                    <p className="text-sm text-muted-foreground">{park.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-3">
                <Button className="w-full" size="lg" onClick={handleDirections} disabled={loading}>
                  Get Directions
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  size="lg"
                  onClick={handleSave}
                  disabled={loading || !isLoggedIn}
                >
                  {saved ? "Saved" : "Save for Later"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  size="lg"
                  onClick={handleShare}
                  disabled={loading}
                >
                  Share
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

const parseHours = (hours: string) => {
  const match = hours.match(/(\d{1,2}):(\d{2})\s*(AM|PM)\s*-\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return null;

  const to24h = (h: string, m: string, meridiem: string) => {
    let hour = Number(h) % 12;
    if (meridiem.toUpperCase() === "PM") hour += 12;
    return `${hour.toString().padStart(2, "0")}:${m}`;
  };

  const opens = to24h(match[1], match[2], match[3]);
  const closes = to24h(match[4], match[5], match[6]);
  return { opens, closes };
};
