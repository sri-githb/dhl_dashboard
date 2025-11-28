import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { mockTransactions } from "@/utils/mockData";
import { Transaction, LocationType, TransactionType, TransactionStatus, DashboardStats } from "@/types/transaction";
import Header from "@/components/dashboard/Header";
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
  const [selectedStatus, setSelectedStatus] = useState<TransactionStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [username] = useState(sessionStorage.getItem("userMobile") || "User");

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
      const matchesStatus = selectedStatus === "all" || transaction.status === selectedStatus;
      const matchesSearch =
        searchQuery === "" ||
        transaction.itemId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.trayId.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesLocation && matchesType && matchesStatus && matchesSearch;
    });
  }, [transactions, selectedLocation, selectedType, selectedStatus, searchQuery]);

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
    <div className="min-h-screen bg-background">
      <Header username={username} onLogout={handleLogout} />
      
      <div className="pt-24 px-6 pb-6">
        <div className="max-w-[1600px] mx-auto">
          <SummaryCards stats={stats} />

          <TransactionFilters
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
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
    </div>
  );
};

export default Dashboard;
