export type TransactionType = "Inbound" | "Pickup";
export type TransactionStatus = "Completed" | "Pending" | "Failed";
export type LocationType = "DHL_Mumbai" | "DHL_HSR" | "DHL_Kochi";

export interface Transaction {
  id: string;
  itemId: string;
  trayId: string;
  createdAt: string;
  updatedAt: string;
  quantity: number;
  username: string;
  transactionType: TransactionType;
  robotId: string;
  locationName: LocationType;
  status: TransactionStatus;
}

export interface DashboardStats {
  totalTransactions: number;
  inboundTransactions: number;
  pickupTransactions: number;
  activeRobots: number;
}
