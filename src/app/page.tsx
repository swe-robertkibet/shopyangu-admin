"use client";

import { useEffect } from "react";
import StatsCards from "@/components/dashboard/StatsCards";
import Charts from "@/components/dashboard/Charts";
import { useStore } from "@/lib/store";

export default function DashboardPage() {
  const { fetchStats, stats, isLoading, error } = useStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (error.stats) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        Error loading dashboard: {error.stats}
      </div>
    );
  }

  if (isLoading.stats || !stats) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <StatsCards />
      <Charts />
    </div>
  );
}
