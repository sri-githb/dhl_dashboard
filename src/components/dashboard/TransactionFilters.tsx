import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, Download, RefreshCw, Calendar as CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { LocationType, TransactionType, TransactionStatus } from "@/types/transaction";

interface TransactionFiltersProps {
  selectedLocation: LocationType | "all";
  setSelectedLocation: (location: LocationType | "all") => void;
  selectedType: TransactionType | "all";
  setSelectedType: (type: TransactionType | "all") => void;
  selectedStatus: TransactionStatus | "all";
  setSelectedStatus: (status: TransactionStatus | "all") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onRefresh: () => void;
  onExport: () => void;
  selectedDate?: Date;
  setSelectedDate: (date: Date | undefined) => void;
}

const TransactionFilters = ({
  selectedLocation,
  setSelectedLocation,
  selectedType,
  setSelectedType,
  selectedStatus,
  setSelectedStatus,
  searchQuery,
  setSearchQuery,
  onRefresh,
  onExport,
  selectedDate,
  setSelectedDate,
}: TransactionFiltersProps) => {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="glass-card p-6 rounded-xl mb-6 space-y-4 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="relative lg:col-span-2">
          <Search className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300",
            searchFocused ? "text-primary scale-110" : "text-muted-foreground"
          )} />
          <Input
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className={cn(
              "pl-12 pr-4 h-11 rounded-full border-2 transition-all duration-300 bg-background/50 backdrop-blur-sm",
              searchFocused 
                ? "border-primary shadow-[0_0_20px_rgba(255,204,0,0.2)] scale-[1.02]" 
                : "border-border hover:border-primary/30"
            )}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "glass-input justify-start text-left font-normal h-11 transition-all duration-200 hover:border-primary/50",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-popover border-border" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
              className="p-3 pointer-events-auto"
            />
            {selectedDate && (
              <div className="px-3 pb-3">
                <Button
                  variant="ghost"
                  className="w-full text-sm"
                  onClick={() => setSelectedDate(undefined)}
                >
                  Clear date
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>

        <Select value={selectedLocation} onValueChange={(value) => setSelectedLocation(value as LocationType | "all")}>
          <SelectTrigger className="glass-input h-11 transition-all duration-200 hover:border-primary/50">
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="DHL_Mumbai">DHL Mumbai</SelectItem>
            <SelectItem value="DHL_HSR">DHL HSR</SelectItem>
            <SelectItem value="DHL_Kochi">DHL Kochi</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedType} onValueChange={(value) => setSelectedType(value as TransactionType | "all")}>
          <SelectTrigger className="glass-input h-11 transition-all duration-200 hover:border-primary/50">
            <SelectValue placeholder="Transaction Type" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Inbound">Inbound</SelectItem>
            <SelectItem value="Pickup">Pickup</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as TransactionStatus | "all")}>
          <SelectTrigger className="glass-input h-11 transition-all duration-200 hover:border-primary/50">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Failed">Failed</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2 lg:col-span-2">
          <Button
            variant="outline"
            onClick={onRefresh}
            className="flex-1 glass-input border-border hover:border-primary/50 hover:bg-primary/5 h-11 transition-all duration-200 hover:scale-105"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button
            onClick={onExport}
            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground h-11 transition-all duration-200 hover:scale-105"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionFilters;
