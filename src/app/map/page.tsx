"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/star-rating";
import { themeParks } from "@/lib/data";
import { groupParksByRegion } from "@/lib/parks";

export default function MapPage() {
  const parksByRegion = useMemo(() => groupParksByRegion(themeParks), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to all parks
              </Button>
            </Link>
            <Link href="/compare">
              <Button variant="outline" size="sm">
                Compare Parks
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <MapPin className="w-10 h-10 text-primary" />
            Theme Parks by Region
          </h1>
          <p className="text-muted-foreground">
            Explore {themeParks.length} theme parks across North America
          </p>
        </div>

        {/* Regions */}
        <div className="space-y-12">
          {Object.entries(parksByRegion).map(([region, parks]) => (
            parks.length > 0 && (
              <div key={region}>
                <div className="mb-6 pb-2 border-b">
                  <h2 className="text-3xl font-bold">{region}</h2>
                  <p className="text-muted-foreground">{parks.length} parks</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {parks
                    .sort((a, b) => b.rating - a.rating)
                    .map((park) => (
                      <Link key={park.id} href={`/park/${park.id}`}>
                        <Card className="h-full cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                          <div className="relative h-36 overflow-hidden rounded-t-2xl">
                            <Image
                              src={park.image}
                              alt={park.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                              priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            <div className="absolute inset-0 flex items-start justify-between p-3">
                              <Badge className="bg-white/90 text-black hover:bg-white">
                                {park.priceRange}
                              </Badge>
                              <div className="flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                                <MapPin className="w-3.5 h-3.5" />
                                {park.location}
                              </div>
                            </div>
                          </div>

                          <CardHeader>
                            <CardTitle className="line-clamp-1">{park.name}</CardTitle>
                            <CardDescription className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {park.location}
                            </CardDescription>
                          </CardHeader>

                          <CardContent>
                            <div className="flex items-center justify-between mb-3">
                              <StarRating rating={park.rating} size="sm" />
                              <span className="text-xs text-muted-foreground">
                                {park.reviewCount.toLocaleString()} reviews
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline" className="text-xs border-orange-500/50 text-orange-600">
                                {park.audienceType}
                              </Badge>
                              <Badge variant="outline" className="text-xs border-pink-500/50 text-pink-600">
                                {park.parkType}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                </div>
              </div>
            )
          ))}
        </div>
      </main>
    </div>
  );
}
