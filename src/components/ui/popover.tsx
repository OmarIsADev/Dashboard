import { cn } from "@sglara/cn";
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useRef,
  useEffect,
} from "react";

interface PopoverContextType {
  isOpen: boolean;
  openPopover: () => void;
  closePopover: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

// A custom hook to use the PopoverContext, with a check for proper usage
const usePopoverContext = () => {
  const context = useContext(PopoverContext);
  if (context === undefined) {
    throw new Error("usePopoverContext must be used within a <Popover>");
  }
  return context;
};

interface PopoverProps {
  children: ReactNode;
}

export const Popover = ({ children }: PopoverProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const openPopover = () => setIsOpen(!isOpen);
  const closePopover = () => setIsOpen(false);

  // The context value includes the state and the functions to change it
  const value: PopoverContextType = {
    isOpen,
    openPopover,
    closePopover,
    triggerRef,
  };

  return (
    <PopoverContext.Provider value={value}>
      <div className="relative inline-block">{children}</div>
    </PopoverContext.Provider>
  );
};

export const PopoverTrigger = ({ children }: PopoverProps) => {
  const { openPopover, triggerRef, isOpen } = usePopoverContext();

  return (
    <button
      ref={triggerRef}
      data-isopen={isOpen}
      className="group cursor-pointer"
      onClick={openPopover}
    >
      {children}
    </button>
  );
};

export const PopoverItem = ({
  onClick,
  children,
}: PopoverProps & { onClick?: () => void }) => {
  const { closePopover } = usePopoverContext();

  return (
    <button
      onClick={() => {
        onClick?.();
        closePopover();
      }}
      className="w-full cursor-pointer rounded-md px-2 py-1 text-start text-sm hover:bg-zinc-500/35"
    >
      {children}
    </button>
  );
};

export const PopoverContent = ({ children }: PopoverProps) => {
  const { isOpen, closePopover, triggerRef } = usePopoverContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const [positionClass, setPositionClass] = useState("");

  useEffect(() => {
    // Handler to close the popover if a click occurs outside of it or its trigger.
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        contentRef.current &&
        !contentRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        closePopover();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Recalculate position on open
    const calculatePosition = () => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;

        const requiredHeight = (contentRef.current?.offsetHeight || 0) + 32;

        if (spaceBelow < requiredHeight && rect.top > requiredHeight) {
          setPositionClass("bottom-full mb-2");
        } else {
          setPositionClass("top-full mt-2");
        }
      }
    };

    calculatePosition();
    window.addEventListener("resize", calculatePosition);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", calculatePosition);
    };
  }, [isOpen, closePopover, triggerRef]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={contentRef}
      className={cn(
        "absolute z-10 scale-100 transform rounded-lg border border-zinc-400/20 bg-zinc-700/30 p-1 shadow-xl transition-transform duration-300 ease-out",
        positionClass,
      )}
      style={{
        minWidth: `${triggerRef.current?.offsetWidth}px`,
      }}
    >
      {children}
    </div>
  );
};
