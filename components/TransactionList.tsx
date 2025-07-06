"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BACKEND_URL } from "@/app/config";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Pencil, Trash2, Check, X, FileWarning } from "lucide-react";

interface Transaction {
  _id: string;
  amount: string;
  description: string;
  category: string;
  updatedAt?: string;
}

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Transaction>>({});

  const fetchTransactions = async () => {
    const res = await axios.get(`${BACKEND_URL}/api/transaction`);
    setTransactions(res.data.response);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleEdit = (txn: Transaction) => {
    setEditId(txn._id);
    setEditData({
      amount: txn.amount,
      description: txn.description,
      category: txn.category.toLowerCase(),
    });
  };

  const handleSave = async () => {
    if (!editId) return;
    await axios.put(`${BACKEND_URL}/api/`, { id: editId, ...editData });
    setEditId(null);
    fetchTransactions();
  };

  const handleCancel = () => {
    setEditId(null);
    setEditData({});
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`${BACKEND_URL}/api/`, { data: { id } });
    fetchTransactions();
  };

  const categories = [
    "housing",
    "utilities",
    "food",
    "transportation",
    "health-medical",
  ];

  return (
    <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 min-h-[70vh] flex flex-col justify-start">
      <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-800 mb-6 text-center">
        Manage Your Transactions
      </h2>

      {transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 text-center text-neutral-500 mt-12">
          <FileWarning size={48} className="mb-4 text-neutral-400" />
          <p className="text-lg font-medium">No transactions found</p>
          <p className="text-sm text-neutral-500 mt-1">
            Start by adding your first expense to track your spending easily.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map((txn) => (
            <Card
              key={txn._id}
              className="bg-white/70 backdrop-blur-md rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition"
            >
              <CardHeader className="pb-0">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <div>
                    <CardTitle className="text-lg sm:text-xl font-medium text-neutral-800">
                      {editId === txn._id
                        ? "Edit Transaction"
                        : txn.description}
                    </CardTitle>
                    <p className="text-sm text-neutral-500">
                      {txn.updatedAt
                        ? new Date(txn.updatedAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "N/A"}
                    </p>
                  </div>
                  {editId !== txn._id && (
                    <p className="text-lg font-semibold text-green-600 mt-2 sm:mt-0">
                      ₹{txn.amount}
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-4 space-y-4">
                {editId === txn._id ? (
                  <div className="grid gap-4">
                    <div className="grid gap-1">
                      <Label>Amount</Label>
                      <Input
                        type="number"
                        placeholder="Amount"
                        value={editData.amount || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, amount: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label>Description</Label>
                      <Input
                        placeholder="Description"
                        value={editData.description || ""}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label>Category</Label>
                      <Select
                        value={editData.category || ""}
                        onValueChange={(value) =>
                          setEditData({ ...editData, category: value })
                        }
                      >
                        <SelectTrigger>
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
                    <div className="flex gap-2 justify-end">
                      <Button
                        onClick={handleSave}
                        className="flex gap-1 items-center"
                      >
                        <Check size={16} />
                        Save
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={handleCancel}
                        className="flex gap-1 items-center"
                      >
                        <X size={16} />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <p className="text-sm text-neutral-600 capitalize">
                      Category:{" "}
                      <span className="font-medium">{txn.category}</span>
                    </p>
                    <div className="flex gap-2 mt-2 sm:mt-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(txn)}
                        className="flex gap-1 items-center"
                      >
                        <Pencil size={16} />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(txn._id)}
                        className="flex gap-1 items-center"
                      >
                        <Trash2 size={16} />
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
