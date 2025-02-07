import Clock from "@/components/clock";
import { ColourfulTextHeader } from "@/components/header";
import { Info } from "lucide-react";
import Link from "next/link";
import { LoginForm } from "@/components/login-form";

export default function Login() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="pt-40 mt-10">
        <ColourfulTextHeader />
        <div className="flex justify-center p-10">
          <Clock />
        </div>
      </header>
      <main className="flex w-full items-center justify-center">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </main>
      <footer className="row-start-3 flex gap-2 flex-wrap items-center justify-center text-white">
        <Info />
        <Link
          className="text-white hover:underline"
          href="https://www.englishroses.co.uk/docs/how-to-water-your-rose/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Click to read more on watering a rose.
        </Link>
      </footer>
    </div>
  );
}
