"use client";

import Clock from "@/components/clock";
import { ColourfulTextHeader } from "@/components/header";
import LastAt from "@/components/last-at";
import Logout from "@/components/logout";
import NextAt from "@/components/next-at";
import StatusForm from "@/components/select-status";
import { Info } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleStatusSubmitted = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Trigger re-fetch in LastAt
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="pt-40 mt-20">
        <ColourfulTextHeader />
        <div className="flex justify-center p-10">
          <Clock />
        </div>
        <div className="flex justify-center text-white">
          <LastAt refreshKey={refreshKey} />
        </div>
        <div className="flex justify-center mt-4 text-white">
          Next check at <NextAt />
        </div>
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start mt-10">
        <div className="flex justify-center">
          <StatusForm onStatusSubmitted={handleStatusSubmitted} />
        </div>
      </main>
      <footer className="row-start-3 flex gap-4 flex-wrap items-center justify-center text-white">
        <Info />
        <Link
          className="text-white hover:underline"
          href="https://www.englishroses.co.uk/docs/how-to-water-your-rose/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Click to read more on watering a rose.
        </Link>
        <Logout />
      </footer>
    </div>
  );
}
