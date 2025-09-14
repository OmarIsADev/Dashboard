import {
  ChevronDown,
  Home,
  LucideGalleryThumbnails,
  Users2,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import {
  Popover,
  PopoverContent,
  PopoverItem,
  PopoverTrigger,
} from "../ui/popover";

const routes = [
  {
    href: "/dashboard",
    title: "Dashboard",
    Icon: <Home />,
  },
  {
    href: "/users",
    title: "Users",
    Icon: <Users2 />,
  },
  {
    href: "/posts",
    title: "Posts",
    Icon: <LucideGalleryThumbnails />,
  },
];

const baseButtonClass =
  "flex items-center justify-start gap-1 rounded-xl px-4 py-2 transition-[background] hover:bg-primary-light/10";

function Navbar() {
  const { pathname } = useLocation();
  const {
    user: { data },
    logout,
  } = useAuth();

  return (
    <div className="flex w-full max-w-64 flex-col items-center justify-between gap-8">
      <div className="flex w-full flex-col items-center gap-8">
        <h1 className="text-xl">Dashboard</h1>
        <div className="flex w-full flex-col gap-2">
          {routes.map((route) => (
            <Link
              className={`data-[active=true]:bg-primary-light/10 ${baseButtonClass}`}
              data-active={route.href === pathname}
              key={route.href}
              to={route.href}
            >
              {route.Icon} {route.title}
            </Link>
          ))}
        </div>
      </div>

      {/* user's data */}
      {data && (
        <Popover>
          <PopoverTrigger>
            <div
              className={`w-full cursor-pointer !justify-between ${baseButtonClass}`}
            >
              <div className="flex w-full items-center gap-1">
                <img className="size-6 rounded-full" src={data.img} />
                <p>{data.email}</p>
              </div>
              <ChevronDown className="size-6 transition-[rotate] group-data-[isopen=true]:rotate-180" />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverItem onClick={logout}>Logout</PopoverItem>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}

export default Navbar;
