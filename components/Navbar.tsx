"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dancing_Script } from "next/font/google";

const oswald = Dancing_Script({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Navbar() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Transactions", href: "/transactions" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  const pathname = usePathname();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 py-3 sm:py-4 m-2 sm:m-4 md:m-8 bg-white rounded-xl shadow-sm border gap-3 md:gap-0">
      <div
        className={cn(
          "text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide text-primary text-center md:text-left",
          oswald.className
        )}
      >
        PennyWise
      </div>
      <div className="flex flex-wrap justify-center md:justify-end gap-2 sm:gap-4 md:gap-6 w-full md:w-auto">
        {navItems.map((item) => (
          <Link href={item.href} key={item.name}>
            <Button
              variant={pathname === item.href ? "default" : "ghost"}
              className={cn(
                "capitalize text-sm sm:text-base",
                pathname === item.href && "bg-primary text-primary-foreground"
              )}
            >
              {item.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
