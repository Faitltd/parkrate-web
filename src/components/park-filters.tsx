import { ChangeEvent } from "react";
import { ArrowUpDown, Filter, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import type { SortOption } from "@/lib/parks";
import type { AudienceType, ParkType } from "@/lib/types";

interface ParkFiltersProps {
  searchTerm: string;
  audienceFilter: AudienceType | "all";
  parkTypeFilter: ParkType | "all";
  sortBy: SortOption;
  onSearchTermChange: (value: string) => void;
  onAudienceChange: (value: AudienceType | "all") => void;
  onParkTypeChange: (value: ParkType | "all") => void;
  onSortChange: (value: SortOption) => void;
  onClearFilters: () => void;
  showClear: boolean;
}

export function ParkFiltersBar({
  searchTerm,
  audienceFilter,
  parkTypeFilter,
  sortBy,
  onSearchTermChange,
  onAudienceChange,
  onParkTypeChange,
  onSortChange,
  onClearFilters,
  showClear,
}: ParkFiltersProps) {
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(event.target.value);
  };

  return (
    <div className="space-y-4">
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          type="text"
          placeholder="Search theme parks, locations, or categories..."
          className="pl-10 h-12 text-base rounded-xl"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 max-w-2xl mx-auto">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Filter className="w-4 h-4" />
          Filters:
        </div>

        <Select
          value={audienceFilter}
          onValueChange={(value: AudienceType | "all") => onAudienceChange(value)}
        >
          <SelectTrigger className="w-[180px] rounded-xl">
            <SelectValue placeholder="Audience Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Audiences</SelectItem>
            <SelectItem value="Kids">Kids</SelectItem>
            <SelectItem value="Adults">Adults</SelectItem>
            <SelectItem value="Families">Families</SelectItem>
            <SelectItem value="All Ages">All Ages</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={parkTypeFilter}
          onValueChange={(value: ParkType | "all") => onParkTypeChange(value)}
        >
          <SelectTrigger className="w-[180px] rounded-xl">
            <SelectValue placeholder="Park Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Water Park">Water Park</SelectItem>
            <SelectItem value="Dry Park">Dry Park</SelectItem>
            <SelectItem value="Mixed">Mixed</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2 text-sm font-medium ml-4">
          <ArrowUpDown className="w-4 h-4" />
          Sort by:
        </div>

        <Select value={sortBy} onValueChange={(value: SortOption) => onSortChange(value)}>
          <SelectTrigger className="w-[200px] rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating-high">Highest Rated</SelectItem>
            <SelectItem value="rating-low">Lowest Rated</SelectItem>
            <SelectItem value="reviews">Most Reviewed</SelectItem>
            <SelectItem value="food">Best Food</SelectItem>
            <SelectItem value="rides">Best Rides</SelectItem>
            <SelectItem value="parking">Best Parking</SelectItem>
            <SelectItem value="cleanliness">Best Cleanliness</SelectItem>
            <SelectItem value="staff">Best Staff</SelectItem>
            <SelectItem value="value">Best Value</SelectItem>
            <SelectItem value="alphabetical">A-Z</SelectItem>
          </SelectContent>
        </Select>

        {showClear && (
          <button
            onClick={onClearFilters}
            className="text-sm text-muted-foreground hover:text-foreground underline"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
