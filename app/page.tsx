import Link from "next/link";
import CategoryBar from "@/components/CategoryBar";
import Transactions from "@/components/TransactionPage";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-white to-gray-50">
      <div className="w-full md:w-auto">
        <CategoryBar />
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-6 lg:p-8 space-y-8 w-full">
        {/* Transactions Section */}
        <div className="flex flex-col gap-6 w-full">
          <Transactions />
        </div>

        <div className="pt-2 flex justify-center w-full">
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-full bg-indigo-600 text-white px-5 py-2 text-sm md:text-base font-medium shadow hover:bg-indigo-700 transition"
          >
            Go to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
