"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import BarComponent from "@/components/BarComponent";
import ExpenseForm from "@/components/ExpenseForm";

export interface Transaction {
  _id: string;
  amount: string;
  description: string;
  category: string;
  updatedAt?: string;
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BACKEND_URL}/api/transaction`);
      setTransactions(res.data.response);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-[90vh] flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 tracking-tight">
          Track Your Expenses Effortlessly
        </h1>
        <p className="text-gray-600 text-sm md:text-base mt-1">
          Visualize your spending and manage your budget seamlessly.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full flex-1">
        {/* Bar Chart */}
        <div className="flex-1 flex items-start justify-center">
          <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6">
            <BarComponent transactions={transactions} />
          </div>
        </div>

        {/* Expense Form */}
        <div className="w-full md:w-[340px] flex items-start justify-center">
          <div className="w-full">
            <ExpenseForm onTransactionAdded={fetchTransactions} />
          </div>
        </div>
      </div>
    </div>
  );
}
