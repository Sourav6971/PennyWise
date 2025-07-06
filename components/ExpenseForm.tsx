"use client";

import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Props {
  onTransactionAdded: () => void;
}

export default function ExpenseForm({ onTransactionAdded }: Props) {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "",
  });

  const categories = [
    "housing",
    "utilities",
    "food",
    "transportation",
    "health-medical",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${BACKEND_URL}/api/`, formData);
      setFormData({ amount: "", description: "", category: "" });
      onTransactionAdded(); // refresh transactions in parent
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 md:p-8 shadow-md space-y-5 w-full md:w-80"
    >
      <h2 className="text-lg font-semibold text-center text-gray-800">
        Add Expense
      </h2>

      <div className="space-y-1">
        <Label className="text-sm text-gray-700">Amount</Label>
        <Input
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          placeholder="Amount spent"
          required
        />
      </div>

      <div className="space-y-1">
        <Label className="text-sm text-gray-700">Description</Label>
        <Input
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Expense description"
          required
        />
      </div>

      <div className="space-y-1">
        <Label className="text-sm text-gray-700">Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value) =>
            setFormData({ ...formData, category: value })
          }
          required
        >
          <SelectTrigger className="bg-gray-50">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        className="w-full rounded-full bg-black cursor-pointer text-white text-sm h-10"
      >
        Add Transaction
      </Button>
    </form>
  );
}
