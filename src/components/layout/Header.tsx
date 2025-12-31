import { useState } from "react";
import { Link } from "react-router-dom";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* LEFT: Hamburger (mobile only) */}
        <button
          className="lg:hidden text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Open menu"
        >
          ☰
        </button>

        {/* CENTER: Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-90"
          aria-label="Go to home"
        >
          <img src="/logo.png" alt="Bimakart" className="h-10 w-auto" />
        </Link>

        {/* RIGHT: Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <a href="#">PolicyHawaldar</a>
          <a href="#">About</a>
          <a href="#">Claim Support</a>
          <a href="#">Contact</a>
          <button className="border px-3 py-1.5 rounded-md">
            Select Language
          </button>
        </nav>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="lg:hidden bg-white border-t">
          <nav className="flex flex-col px-4 py-4 gap-3 text-sm">
            <a href="#">PolicyHawaldar</a>
            <a href="#">About</a>
            <a href="#">Claim Support</a>
            <a href="#">Contact</a>
            <button className="border px-3 py-2 rounded-md mt-2 w-fit">
              Select Language
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
