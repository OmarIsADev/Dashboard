import Navbar from "./navbar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-4 p-4">
      <Navbar />
      <div className="h-[calc(100dvh-2rem)] w-full rounded-3xl bg-zinc-100 text-zinc-900 border-zinc-100 border-8 p-2 overflow-auto-y overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
