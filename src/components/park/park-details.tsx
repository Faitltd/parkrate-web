"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { ArrowLeft, Clock, Globe, MapPin, Phone, Star, ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/star-rating";
import { useParkInteractions } from "./use-park-interactions";
import type { ThemePark } from "@/lib/types";

interface ParkDetailsProps {
  park: ThemePark;
}

export function ParkDetails({ park }: ParkDetailsProps) {
  const {
    actionMessage,
    handleDirections,
    handleHelpful,
    handleReviewSubmit,
    handleSave,
    handleShare,
    helpfulVotes,
    loading,
    reviewFormRef,
    reviewText,
    reviews,
    saved,
    selectedRating,
    setReviewText,
    setSelectedRating,
    syncError,
  } = useParkInteractions(park);

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://parkrate.com").replace(/\/$/, "");
  const canonical = `${siteUrl}/park/${park.id}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AmusementPark",
    name: park.name,
    description: park.description,
    image: park.image,
    url: canonical,
    priceRange: park.priceRange,
    audience: {
      "@type": "Audience",
      audienceType: park.audienceType,
    },
    location: {
      "@type": "Place",
      name: park.location,
    },
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Overall Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-2">{park.rating.toFixed(1)}</div>
                    <StarRating rating={park.rating} size="lg" showNumber={false} />
                    <p className="text-sm text-muted-foreground mt-2">
                      Based on {reviews.length} reviews
                    </p>
                  </div>
                  <div className="flex-1 w-full">
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={() => reviewFormRef.current?.scrollIntoView({ behavior: "smooth" })}
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Write a Review
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
              <CardHeader>
                <CardTitle>Reviews ({reviews.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {loading && (
                  <div className="rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
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

                <div ref={reviewFormRef} className="border rounded-xl p-4 bg-muted/30">
                  <h3 className="font-semibold mb-3">Share your experience</h3>
                  <Textarea
                    placeholder="Tell others about your visit to this park..."
                    className="mb-3"
                    rows={4}
                    value={reviewText}
                    onChange={(event) => setReviewText(event.target.value)}
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                          onClick={() => setSelectedRating(star)}
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
                    <Button onClick={handleReviewSubmit} disabled={loading}>
                      Post Review
                    </Button>
                  </div>
                </div>

                {reviews.map((review) => (
                  <div key={review.id} className="border-b last:border-b-0 pb-6 last:pb-0">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gradient-to-br from-orange-500 to-pink-500 text-white font-semibold">
                          {review.authorInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold">{review.author}</h4>
                            <StarRating rating={review.rating} size="sm" showNumber={false} />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {review.date}
                          </span>
                        </div>
                        <p className="text-muted-foreground mb-3">{review.text}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2"
                          disabled={helpfulVotes[review.id] || loading}
                          onClick={() => handleHelpful(review.id)}
                        >
                          <ThumbsUp className="w-4 h-4" />
                          Helpful ({review.helpful})
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
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
                  disabled={loading}
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
