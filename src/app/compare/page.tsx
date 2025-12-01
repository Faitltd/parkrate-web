"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StarRating } from "@/components/star-rating";
import { themeParks } from "@/lib/data";
import { findParkById } from "@/lib/parks";
import type { ThemePark } from "@/lib/types";

export default function ComparePage() {
  const [selectedParks, setSelectedParks] = useState<string[]>([]);

  const addPark = (parkId: string) => {
    if (!parkId) return;

    setSelectedParks((current) => {
      if (current.includes(parkId) || current.length >= 3) return current;
      return [...current, parkId];
    });
  };

  const removePark = (parkId: string) => {
    setSelectedParks((current) => current.filter((id) => id !== parkId));
  };

  const parks = useMemo(
    () =>
      selectedParks
        .map((id) => findParkById(themeParks, id))
        .filter((park): park is ThemePark => Boolean(park)),
    [selectedParks]
  );

  return (
    <div className="min-h-screen page-surface">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to all parks
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Compare Theme Parks</h1>
          <p className="text-muted-foreground mb-6">
            Select up to 3 parks to compare ratings, features, and more
          </p>

          {/* Park Selector */}
          <div className="flex flex-wrap gap-3 items-center">
            <Select onValueChange={addPark} value="">
              <SelectTrigger className="w-[280px] rounded-xl">
                <SelectValue placeholder="Add a park to compare..." />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {themeParks
                  .filter(park => !selectedParks.includes(park.id))
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((park) => (
                    <SelectItem key={park.id} value={park.id}>
                      {park.name} - {park.location}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            {selectedParks.length > 0 && (
              <Button
                variant="outline"
                onClick={() => setSelectedParks([])}
                className="gap-2"
              >
                <X className="w-4 h-4" />
                Clear All
              </Button>
            )}

            <span className="text-sm text-muted-foreground">
              {selectedParks.length}/3 parks selected
            </span>
          </div>
        </div>

        {/* Comparison Grid */}
        {parks.length === 0 ? (
          <Card className="p-12">
            <div className="text-center">
              <Plus className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No parks selected</h3>
              <p className="text-muted-foreground">
                Choose parks from the dropdown above to start comparing
              </p>
            </div>
          </Card>
        ) : (
          <div className={`grid grid-cols-1 ${parks.length === 2 ? 'md:grid-cols-2' : parks.length === 3 ? 'md:grid-cols-3' : ''} gap-6`}>
            {parks.map((park) => park && (
              <Card key={park.id} className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 z-10"
                  onClick={() => removePark(park.id)}
                >
                  <X className="w-4 h-4" />
                </Button>

                <CardHeader>
                  <CardTitle className="pr-8">{park.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{park.location}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Overall Rating */}
                  <div>
                    <h4 className="font-semibold mb-2">Overall Rating</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold">{park.rating.toFixed(1)}</span>
                      <StarRating rating={park.rating} size="md" showNumber={false} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {park.reviewCount.toLocaleString()} reviews
                    </p>
                  </div>

                  {/* Category Ratings */}
                  <div>
                    <h4 className="font-semibold mb-3">Category Ratings</h4>
                    <div className="space-y-3">
                      {Object.entries(park.categoryRatings).map(([category, rating]) => (
                        <div key={category}>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="capitalize">{category}</span>
                            <span className="font-semibold">{rating.toFixed(1)}</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-orange-500 to-pink-500"
                              style={{ width: `${(rating / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price & Type */}
                  <div>
                    <h4 className="font-semibold mb-2">Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price Range:</span>
                        <span className="font-semibold">{park.priceRange}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Audience:</span>
                        <span className="font-semibold">{park.audienceType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Park Type:</span>
                        <span className="font-semibold">{park.parkType}</span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold mb-2">Features</h4>
                    <ul className="space-y-1">
                      {park.features.slice(0, 4).map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* View Details Button */}
                  <Link href={`/park/${park.id}`}>
                    <Button className="w-full" variant="outline">
                      View Full Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
