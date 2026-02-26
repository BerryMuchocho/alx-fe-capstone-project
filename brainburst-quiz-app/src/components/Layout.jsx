import { Link, useLocation } from "react-router-dom";
import logo from "../assets/brainburst.png";

const navItems = [{ label: "Home", to: "/" }];

function Layout({ children }) {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col">
      <header className="sticky top-0 z-20 h-16 border-b border-slate-200 bg-white flex items-center">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="BrainBurst"
              className="h-28 w-auto"
            />
          </Link>

          <nav className="flex items-center gap-2 rounded-full bg-slate-100 p-1">
            {navItems.map((item) => {
              const isActive = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-600 text-white shadow"
                      : "text-slate-600 hover:bg-white hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12 flex items-center justify-center">
        <div className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-10">
          {children}
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-2 px-4 py-4 text-sm text-slate-500 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} BrainBurst</p>
          <p>Learn fast • Play smart • Track your progress</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;