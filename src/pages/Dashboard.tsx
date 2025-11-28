import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { mockTransactions } from "@/utils/mockData";
import { Transaction, LocationType, TransactionType, DashboardStats } from "@/types/transaction";
import SummaryCards from "@/components/dashboard/SummaryCards";
import TransactionFilters from "@/components/dashboard/TransactionFilters";
import TransactionTable from "@/components/dashboard/TransactionTable";
import Pagination from "@/components/dashboard/Pagination";

const ITEMS_PER_PAGE = 20;

const Dashboard = () => {
  const navigate = useNavigate();
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [selectedLocation, setSelectedLocation] = useState<LocationType | "all">("all");
  const [selectedType, setSelectedType] = useState<TransactionType | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesLocation = selectedLocation === "all" || transaction.locationName === selectedLocation;
      const matchesType = selectedType === "all" || transaction.transactionType === selectedType;
      const matchesSearch =
        searchQuery === "" ||
        transaction.itemId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.trayId.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesLocation && matchesType && matchesSearch;
    });
  }, [transactions, selectedLocation, selectedType, searchQuery]);

  const stats: DashboardStats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayTransactions = filteredTransactions.filter(
      (t) => new Date(t.createdAt) >= today
    );

    return {
      totalTransactions: todayTransactions.length,
      inboundTransactions: todayTransactions.filter((t) => t.transactionType === "Inbound").length,
      pickupTransactions: todayTransactions.filter((t) => t.transactionType === "Pickup").length,
      activeRobots: new Set(transactions.map((t) => t.robotId)).size,
    };
  }, [filteredTransactions, transactions]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("userMobile");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleRefresh = () => {
    toast.success("Data refreshed");
  };

  const handleExport = () => {
    const csv = [
      ["ID", "Item ID", "Tray ID", "Type", "Location", "Robot", "Quantity", "User", "Status", "Created"],
      ...filteredTransactions.map((t) => [
        t.id,
        t.itemId,
        t.trayId,
        t.transactionType,
        t.locationName,
        t.robotId,
        t.quantity,
        t.username,
        t.status,
        t.createdAt,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions-${new Date().toISOString()}.csv`;
    a.click();
    toast.success("Export completed");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1600px] mx-auto">
        <header className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              DHL Robot Transaction Monitor
            </h1>
            <p className="text-muted-foreground">
              Real-time monitoring of cube robot transactions
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="glass-input border-border hover:border-accent/50 hover:bg-accent/5"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </header>

        <SummaryCards stats={stats} />

        <TransactionFilters
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onRefresh={handleRefresh}
          onExport={handleExport}
        />

        <div className="mb-4 text-sm text-muted-foreground">
          Showing {paginatedTransactions.length} of {filteredTransactions.length} transactions
        </div>

        <TransactionTable transactions={paginatedTransactions} />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
