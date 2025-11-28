import { Transaction, LocationType, TransactionType, TransactionStatus } from "@/types/transaction";

const locations: LocationType[] = ["DHL_Mumbai", "DHL_HSR", "DHL_Kochi"];
const transactionTypes: TransactionType[] = ["Inbound", "Pickup"];
const statuses: TransactionStatus[] = ["Completed", "Pending", "Failed"];
const usernames = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Williams", "David Brown", "Emma Davis"];

function generateRandomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString();
}

function generateMockTransactions(count: number): Transaction[] {
  const transactions: Transaction[] = [];
  const today = new Date();
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  for (let i = 0; i < count; i++) {
    const createdAt = generateRandomDate(thirtyDaysAgo, today);
    const updatedAt = generateRandomDate(new Date(createdAt), today);
    
    transactions.push({
      id: `TXN-${String(i + 1).padStart(6, '0')}`,
      itemId: `ITEM-${Math.floor(Math.random() * 10000)}`,
      trayId: `TRAY-${Math.floor(Math.random() * 1000)}`,
      createdAt,
      updatedAt,
      quantity: Math.floor(Math.random() * 50) + 1,
      username: usernames[Math.floor(Math.random() * usernames.length)],
      transactionType: transactionTypes[Math.floor(Math.random() * transactionTypes.length)],
      robotId: `ROBOT-${Math.floor(Math.random() * 20) + 1}`,
      locationName: locations[Math.floor(Math.random() * locations.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)]
    });
  }

  return transactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export const mockTransactions = generateMockTransactions(300);
