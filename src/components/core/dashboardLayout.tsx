import { Outlet } from "react-router";
import Navbar from "./navbar";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { fetchUsers } from "../../store/slices/usersSlice";

function DashboardLayout({ children }: { children?: React.ReactNode }) {
  const data = useSelector((state: RootState) => state);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (data.users.data.length > 0) return;

    dispatch(fetchUsers());
  }, [data.users.data.length, dispatch]);

  return (
    <div className="relative flex gap-4 p-4 max-md:gap-0">
      <Navbar />
      <div className="bg-primary-light pt-12 scrollbar-gutter-stable text-text-dark border-primary-light overflow-auto-y h-[calc(100dvh-2rem)] w-full overflow-x-hidden rounded-3xl border-8 p-2 will-change-[right]">
        {children ?? <Outlet />}
      </div>
    </div>
  );
}

export default DashboardLayout;
