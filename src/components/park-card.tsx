import Link from "next/link";
import { MapPin, Users } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { StarRating } from "./star-rating";
import type { ThemePark } from "@/lib/types";

interface ParkCardProps {
  park: ThemePark;
}

export function ParkCard({ park }: ParkCardProps) {
  return (
    <Link href={`/park/${park.id}`}>
      <Card className="h-full cursor-pointer overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <img
            src={park.image}
            alt={park.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-white/90 text-black hover:bg-white">
              {park.priceRange}
            </Badge>
          </div>
        </div>

        <CardHeader>
          <CardTitle className="flex items-start justify-between gap-2">
            <span className="line-clamp-1">{park.name}</span>
          </CardTitle>
          <CardDescription className="flex items-center gap-1 text-base">
            <MapPin className="w-4 h-4" />
            {park.location}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between mb-3">
            <StarRating rating={park.rating} size="md" />
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              {park.reviewCount}
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {park.description}
          </p>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs border-orange-500/50 text-orange-600">
              {park.audienceType}
            </Badge>
            <Badge variant="outline" className="text-xs border-pink-500/50 text-pink-600">
              {park.parkType}
            </Badge>
            {park.categories.slice(0, 1).map((category) => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
