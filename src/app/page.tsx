"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParkCard } from "@/components/park-card";
import { ParkFiltersBar } from "@/components/park-filters";
import { themeParks } from "@/lib/data";
import { getFilteredAndSortedParks } from "@/lib/parks";
import type { ParkFilters, SortOption } from "@/lib/parks";

export default function Home() {
  const [filters, setFilters] = useState<ParkFilters>({
    searchTerm: "",
    audience: "all",
    parkType: "all",
  });
  const [sortBy, setSortBy] = useState<SortOption>("rating-high");

  const filteredAndSortedParks = useMemo(
    () => getFilteredAndSortedParks(themeParks, filters, sortBy),
    [filters, sortBy]
  );

  const hasActiveFilters = filters.audience !== "all" || filters.parkType !== "all";

  return (
    <div className="min-h-screen page-surface">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white fill-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                ParkRate
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-sm text-muted-foreground hidden md:block">
                Find and review the world's best theme parks
              </p>
              <div className="flex gap-2">
                <Link href="/compare">
                  <Button variant="outline" size="sm" className="gap-2">
                    Compare Parks
                  </Button>
                </Link>
                <Link href="/map">
                  <Button variant="outline" size="sm" className="gap-2">
                    Map View
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <ParkFiltersBar
            searchTerm={filters.searchTerm}
            audienceFilter={filters.audience}
            parkTypeFilter={filters.parkType}
            sortBy={sortBy}
            onSearchTermChange={(value) => setFilters((prev) => ({ ...prev, searchTerm: value }))}
            onAudienceChange={(value) => setFilters((prev) => ({ ...prev, audience: value }))}
            onParkTypeChange={(value) => setFilters((prev) => ({ ...prev, parkType: value }))}
            onSortChange={setSortBy}
            onClearFilters={() =>
              setFilters((prev) => ({ ...prev, audience: "all", parkType: "all" }))
            }
            showClear={hasActiveFilters}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">
            {filters.searchTerm ? `Search Results for "${filters.searchTerm}"` : "All Theme Parks"}
          </h2>
          <p className="text-muted-foreground">
            {filteredAndSortedParks.length} {filteredAndSortedParks.length === 1 ? "park" : "parks"} found
          </p>
        </div>

        {/* Parks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedParks.map((park) => (
            <ParkCard key={park.id} park={park} />
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedParks.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No parks found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or browse all parks
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
