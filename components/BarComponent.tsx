"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { Transaction } from "@/components/TransactionPage";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const categoryLabels: Record<string, string> = {
  housing: "Housing",
  utilities: "Utilities",
  food: "Food",
  transportation: "Transportation",
  "health-medical": "Health & Medical",
};

function processData(transactions: Transaction[]) {
  const categories = Object.keys(categoryLabels);
  const aggregation: Record<string, number> = {};

  transactions.forEach((item) => {
    const category = item.category;
    const amount = parseFloat(item.amount) || 0;

    if (aggregation[category]) {
      aggregation[category] += amount;
    } else {
      aggregation[category] = amount;
    }
  });

  return categories.map((category) => ({
    category,
    label: categoryLabels[category],
    amount: aggregation[category] || 0,
  }));
}

export default function BarComponent({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timeout);
  }, [transactions]);

  const data = processData(transactions);

  return (
    <div className="bg-white/70 backdrop-blur rounded-xl p-4 shadow w-full overflow-x-auto">
      {loading ? (
        <div className="flex items-center justify-center w-full h-[250px] sm:h-[300px] md:h-[350px]">
          <Loader2 className="h-10 w-10 text-indigo-500 animate-spin" />
        </div>
      ) : (
        <div className="min-w-[600px] md:min-w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 20, left: 10, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="label"
                label={{
                  value: "Categories",
                  position: "insideBottom",
                  offset: -40,
                  style: { fill: "#4B5563", fontSize: 14 },
                }}
                tick={{ fill: "#374151", fontSize: 12 }}
              />
              <YAxis
                label={{
                  value: "Amount",
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: "#4B5563", fontSize: 14 },
                }}
                tick={{ fill: "#374151", fontSize: 12 }}
              />
              <Tooltip />
              <Bar dataKey="amount" fill="#6366F1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
