import { ChevronDown, Home, Menu, Users2, X } from "lucide-react";
import { Link, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import {
  Popover,
  PopoverContent,
  PopoverItem,
  PopoverTrigger,
} from "../ui/popover";
import { useEffect, useState, type JSX } from "react";
import { cn } from "@sglara/cn";

type Route = {
  href: string;
  title: string;
  Icon: JSX.Element;
};

const routes: Route[] = [
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
];

const baseButtonClass =
  "flex items-center justify-start gap-1 rounded-xl px-4 py-2 max-xl:p-2 max-xl:justify-center max-md:justify-start max-md:px-4 transition-[background] hover:bg-primary-light/10";

function Navbar() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Closes the navbar when switching routes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div>
      <Menu
        className="text-text-dark bg-bg-card border-border-light absolute top-8 left-8 z-50 size-8 cursor-pointer rounded border p-1 shadow-lg md:hidden"
        onClick={() => setIsOpen(true)}
      />

      <div
        className={cn(
          "bg-primary-dark h-full w-full flex-col items-center justify-between gap-8 max-md:h-dvh max-md:p-4 md:w-12 xl:w-64",
          "top-0 z-100 flex max-md:absolute max-md:-left-full",
          "transition-transform ease-in-out",
          isOpen && "max-md:translate-x-full",
        )}
      >
        <div className="flex w-full flex-col items-center gap-8">
          <div className="flex w-full items-center justify-between">
            <div className="w-6 md:hidden" />

            <h1 className="w-full text-center text-xl max-xl:hidden max-md:block">
              Dashboard
            </h1>

            <X
              className="size-6 cursor-pointer md:hidden"
              onClick={() => setIsOpen(false)}
            />
          </div>

          <div className="flex w-full flex-col gap-2">
            {routes.map((route) => (
              <NavbarLink key={route.href} pathname={pathname} route={route} />
            ))}
          </div>
        </div>

        <UserData />
      </div>
    </div>
  );
}

const NavbarLink = ({
  route,
  pathname,
}: {
  route: Route;
  pathname: string;
}) => {
  return (
    <Link
      className={`data-[active=true]:bg-primary-light/10 ${baseButtonClass}`}
      data-active={route.href === pathname}
      key={route.href}
      to={route.href}
    >
      {route.Icon}{" "}
      <span className="max-xl:hidden max-md:block">{route.title}</span>
    </Link>
  );
};

const UserData = () => {
  const {
    user: { data },
    logout,
  } = useAuth();

  if (!data) return;

  return (
    <Popover>
      <PopoverTrigger>
        <div
          className={`w-full cursor-pointer !justify-between ${baseButtonClass}`}
        >
          <div className="flex w-full items-center gap-1">
            <img
              className="size-6 rounded-full max-xl:size-full max-md:size-6"
              src={data.img}
            />
            <p className="max-xl:hidden max-md:block">{data.email}</p>
          </div>
          <ChevronDown className="size-6 transition-[rotate] group-data-[isopen=true]:rotate-180 max-xl:hidden max-md:block" />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverItem onClick={logout}>Logout</PopoverItem>
      </PopoverContent>
    </Popover>
  );
};

export default Navbar;
