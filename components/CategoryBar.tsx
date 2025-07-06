import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const categories = [
  {
    name: "Housing",
    items: ["Rent", "Mortgage", "Property tax", "Repairs & maintenance"],
  },
  {
    name: "Utilities",
    items: ["Electricity", "Water", "Gas", "Internet", "Mobile phone"],
  },
  {
    name: "Food",
    items: ["Groceries", "Dining out", "Coffee/snacks"],
  },
  {
    name: "Transportation",
    items: [
      "Public transport (bus, metro)",
      "Fuel",
      "Car maintenance",
      "Ride-sharing (Uber/Ola)",
    ],
  },
  {
    name: "Health & Medical",
    items: ["Medicines", "Doctor visits", "Health insurance"],
  },
];

export default function CategoryBar() {
  return (
    <aside className="hidden md:flex md:flex-col w-64 p-4 border-r-4 h-screen sticky top-0 bg-background">
      <span className="font-extrabold text-3xl pb-10 underline underline-offset-8">
        Categories
      </span>
      <ScrollArea className="h-full pr-2">
        {categories.map((category) => (
          <div key={category.name} className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-primary">
              {category.name}
            </h2>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="rounded-full hover:none"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </ScrollArea>
    </aside>
  );
}
