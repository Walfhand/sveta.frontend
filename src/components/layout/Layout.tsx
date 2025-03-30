import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import { Toaster } from "sonner";

export default function Layout() {
  return (
    <div>
      <header className="bg-white shadow-sm">
        <Nav />
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-4 py-10">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}
