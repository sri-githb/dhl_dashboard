import { Transaction } from "@/types/transaction";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable = ({ transactions }: TransactionTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Failed":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "";
    }
  };

  const getTypeColor = (type: string) => {
    return type === "Inbound"
      ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
      : "bg-purple-500/20 text-purple-400 border-purple-500/30";
  };

  return (
    <div className="data-table">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="text-muted-foreground font-semibold">Transaction ID</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Item ID</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Tray ID</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Type</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Location</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Robot ID</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Quantity</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Username</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Status</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                className="border-border/30 hover:bg-secondary/50 transition-colors"
              >
                <TableCell className="font-medium text-foreground">{transaction.id}</TableCell>
                <TableCell className="text-muted-foreground">{transaction.itemId}</TableCell>
                <TableCell className="text-muted-foreground">{transaction.trayId}</TableCell>
                <TableCell>
                  <Badge className={getTypeColor(transaction.transactionType)}>
                    {transaction.transactionType}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{transaction.locationName}</TableCell>
                <TableCell className="text-muted-foreground">{transaction.robotId}</TableCell>
                <TableCell className="text-muted-foreground">{transaction.quantity}</TableCell>
                <TableCell className="text-muted-foreground">{transaction.username}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {format(new Date(transaction.createdAt), "MMM dd, HH:mm")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionTable;
