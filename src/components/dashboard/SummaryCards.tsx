import { DashboardStats } from "@/types/transaction";
import { Activity, TrendingUp, TrendingDown, Cpu } from "lucide-react";

interface SummaryCardsProps {
  stats: DashboardStats;
}

const SummaryCards = ({ stats }: SummaryCardsProps) => {
  const cards = [
    {
      title: "Total Transactions Today",
      value: stats.totalTransactions,
      icon: Activity,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Inbound Transactions",
      value: stats.inboundTransactions,
      icon: TrendingDown,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      title: "Pickup Transactions",
      value: stats.pickupTransactions,
      icon: TrendingUp,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
    {
      title: "Active Robots",
      value: stats.activeRobots,
      icon: Cpu,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={card.title}
          className="stat-card animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">{card.title}</p>
              <p className="text-3xl font-bold text-foreground">{card.value}</p>
            </div>
            <div className={`${card.bgColor} ${card.color} p-3 rounded-xl`}>
              <card.icon className="w-6 h-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
