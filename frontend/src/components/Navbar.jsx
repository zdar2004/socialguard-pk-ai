import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `text-sm font-mono uppercase tracking-widest transition-colors ${
      pathname === path
        ? "text-emerald-400"
        : "text-neutral-400 hover:text-emerald-400"
    }`;

  return (
    <header className="border-b border-emerald-900/30 bg-[#0A0F0D]/90 backdrop-blur sticky top-0 z-50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-neutral-100"
        >
          <span className="text-emerald-400">›</span>
          SocialGuard PK AI
        </Link>

        <div className="flex items-center gap-8">
          <Link to="/" className={linkClass("/")}>
            Home
          </Link>
          <Link to="/about" className={linkClass("/about")}>
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;