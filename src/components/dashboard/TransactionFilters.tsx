import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Download, RefreshCw } from "lucide-react";
import { LocationType, TransactionType } from "@/types/transaction";

interface TransactionFiltersProps {
  selectedLocation: LocationType | "all";
  setSelectedLocation: (location: LocationType | "all") => void;
  selectedType: TransactionType | "all";
  setSelectedType: (type: TransactionType | "all") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onRefresh: () => void;
  onExport: () => void;
}

const TransactionFilters = ({
  selectedLocation,
  setSelectedLocation,
  selectedType,
  setSelectedType,
  searchQuery,
  setSearchQuery,
  onRefresh,
  onExport,
}: TransactionFiltersProps) => {
  return (
    <div className="glass-card p-6 rounded-xl mb-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by Item ID or Tray ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glass-input pl-10"
          />
        </div>

        <Select value={selectedLocation} onValueChange={(value) => setSelectedLocation(value as LocationType | "all")}>
          <SelectTrigger className="glass-input">
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="DHL_Mumbai">DHL Mumbai</SelectItem>
            <SelectItem value="DHL_HSR">DHL HSR</SelectItem>
            <SelectItem value="DHL_Kochi">DHL Kochi</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedType} onValueChange={(value) => setSelectedType(value as TransactionType | "all")}>
          <SelectTrigger className="glass-input">
            <SelectValue placeholder="Transaction Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Inbound">Inbound</SelectItem>
            <SelectItem value="Pickup">Pickup</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onRefresh}
            className="flex-1 glass-input border-border hover:border-primary/50 hover:bg-primary/5"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button
            onClick={onExport}
            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
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
