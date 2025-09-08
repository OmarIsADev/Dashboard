import {
  CheckSquare,
  ChevronDown,
  Home,
  LucideGalleryThumbnails,
} from "lucide-react";
import { Link, useLocation } from "react-router";

const routes = [
  {
    href: "/dashboard",
    title: "Dashboard",
    Icon: <Home />,
  },
  {
    href: "/tasks",
    title: "Tasks",
    Icon: <CheckSquare />,
  },
  {
    href: "/posts",
    title: "Posts",
    Icon: <LucideGalleryThumbnails />,
  },
];

const baseButtonClass =
  "flex items-center justify-start gap-1 rounded-xl px-4 py-2 transition-[background] hover:bg-zinc-100/10";

function Navbar() {
  const { pathname } = useLocation();

  return (
    <div className="flex w-full max-w-56 flex-col items-center justify-between gap-8">
      <div className="flex w-full flex-col items-center gap-8">
        <h1 className="text-xl">Dashboard</h1>
        <div className="flex w-full flex-col gap-2">
          {routes.map((route) => (
            <Link
              data-active={route.href === pathname}
              className={`data-[active=true]:bg-zinc-100/10 ${baseButtonClass}`}
              key={route.href}
              to={route.href}
            >
              {route.Icon} {route.title}
            </Link>
          ))}
        </div>
      </div>

      {/* user's data */}
      <div
        className={`w-full cursor-pointer !justify-between ${baseButtonClass}`}
      >
        <div className="flex items-center gap-1">
          <img
            className="size-6 rounded-full"
            src={`https://placehold.co/48?text=${"o"}`}
          />
          <p>test@gmail.com</p>
        </div>
        <div>
          <ChevronDown />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
