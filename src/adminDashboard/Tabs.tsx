// src/components/admin/Tabs.tsx
import React from "react";
import {
  Users,

  TrendingUp,
  Package,
  CreditCard,

  Activity,
  User,

  Calendar,
} from "lucide-react";

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs: Tab[] = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "users", label: "Users", icon: Users },
    { id: "affiliators", label: "Affiliators", icon: User },
    { id: "packages", label: "Packages", icon: Package },
    { id: "bookings", label: "Bookings", icon: Calendar },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "logs", label: "Activity Logs", icon: Activity },
  ];

  return (
    <div className="mb-8 overflow-x-auto border-b border-gray-200">
      <nav className="flex space-x-4 min-w-max">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap flex items-center gap-2 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Tabs;