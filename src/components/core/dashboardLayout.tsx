import Navbar from "./navbar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-4 p-4">
      <Navbar />
      <div className="bg-primary-light text-text-dark border-primary-light overflow-auto-y h-[calc(100dvh-2rem)] w-full overflow-x-hidden rounded-3xl border-8 p-2">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
