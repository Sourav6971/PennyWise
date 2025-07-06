"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Transaction } from "@/components/TransactionPage";
import { useRouter } from "next/navigation";

const categories = [
  "housing",
  "utilities",
  "food",
  "transportation",
  "healthMedical",
];
const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const [budgetInput, setBudgetInput] = useState({ category: "", amount: "" });
  const router = useRouter();

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/transaction");
      setTransactions(res.data.response || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  const fetchBudgets = async () => {
    try {
      const res = await axios.get("/api/budget");
      setBudgets(res.data.response || {});
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch budgets");
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchBudgets();
  }, []);

  const handleBudgetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/budget", budgetInput);
      toast.success("Budget set successfully");
      setBudgetInput({ category: "", amount: "" });
      fetchBudgets();
    } catch (error) {
      console.error(error);
      toast.error("Failed to set budget");
    }
  };

  const categoryTotals = categories.map((cat) => {
    const total = transactions
      .filter((t) => t.category === cat)
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    return { category: cat, amount: total };
  });

  const overallTotal = categoryTotals.reduce((sum, c) => sum + c.amount, 0);
  const overallBudget = categories.reduce(
    (sum, cat) => sum + (budgets[cat] || 0),
    0
  );

  const pieData = categoryTotals
    .filter((c) => c.amount > 0)
    .map((c) => ({
      name: c.category.charAt(0).toUpperCase() + c.category.slice(1),
      value: c.amount,
      category: c.category,
    }));

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Add Button */}
      <Button
        onClick={() => router.push("/")}
        className="absolute top-8 right-10 bg-black text-white hover:bg-neutral-800 transition"
      >
        Add
      </Button>

      {/* Pie Chart */}
      <Card className="bg-white rounded-xl shadow border border-gray-200 p-4">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Spending Distribution by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-10 w-10 text-indigo-500 animate-spin" />
            </div>
          ) : pieData.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-gray-500">
              No transactions to display.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={pieData}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  label
                >
                  {pieData.map((entry) => {
                    const colorIndex = categories.indexOf(entry.category);
                    return (
                      <Cell
                        key={`cell-${entry.category}`}
                        fill={COLORS[colorIndex % COLORS.length]}
                      />
                    );
                  })}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Budget Management */}
      <Card className="bg-white rounded-xl shadow border border-gray-200 p-4 flex flex-col gap-4">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Monthly Budget & Tracking
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleBudgetSubmit} className="flex flex-col gap-2">
            <Label>Select Category</Label>
            <select
              value={budgetInput.category}
              onChange={(e) =>
                setBudgetInput({ ...budgetInput, category: e.target.value })
              }
              required
              className="border rounded p-2"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
            <Label>Set Budget Amount</Label>
            <Input
              type="number"
              value={budgetInput.amount}
              onChange={(e) =>
                setBudgetInput({ ...budgetInput, amount: e.target.value })
              }
              placeholder="Enter budget amount"
              required
            />
            <Button type="submit" className="mt-2">
              Set Budget
            </Button>
          </form>

          {categories.map((cat) => {
            const spent =
              categoryTotals.find((c) => c.category === cat)?.amount || 0;
            const budget = budgets[cat] || 0;
            const percent = budget ? Math.min((spent / budget) * 100, 100) : 0;
            const overBudget = spent > budget;
            return (
              <div key={cat}>
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                  <span
                    className={overBudget ? "text-red-500" : "text-green-600"}
                  >
                    {spent.toFixed(0)} / {budget || "Not Set"}
                  </span>
                </div>
                <Progress
                  value={percent}
                  className={overBudget ? "bg-red-200" : "bg-green-200"}
                />
              </div>
            );
          })}
          <div className="flex justify-between pt-2 text-sm font-semibold">
            <span>
              Total Budget:{" "}
              <span className="text-green-600">₹{overallBudget}</span>
            </span>
            <span>
              Total Spent:{" "}
              <span className="text-red-500">₹{overallTotal.toFixed(0)}</span>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
