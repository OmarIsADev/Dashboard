import { cn } from "@sglara/cn";
import React, {
  createContext,
  useContext,
  useState,
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
  children: React.ReactNode;
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
    <PopoverContext.Provider value={value}>{children}</PopoverContext.Provider>
  );
};

export const PopoverTrigger = ({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { openPopover, triggerRef, isOpen } = usePopoverContext();

  return (
    <button
      className={cn("group cursor-pointer", className)}
      data-isopen={isOpen}
      ref={triggerRef}
      onClick={openPopover}
      {...props}
    >
      {children}
    </button>
  );
};

export const PopoverItem = ({
  onClick,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) => {
  const { closePopover } = usePopoverContext();

  return (
    <button
      className={cn(
        "w-full cursor-pointer rounded-md px-2 py-1 text-start text-sm hover:bg-zinc-500/35",
        className,
      )}
      onClick={(e) => {
        onClick?.(e);
        closePopover();
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export const PopoverContent = ({ children }: PopoverProps) => {
  const { isOpen, closePopover, triggerRef } = usePopoverContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  });

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
        const content = contentRef.current?.getBoundingClientRect();

        const spaceBelow = window.innerHeight - rect.bottom;

        const requiredHeight = (contentRef.current?.offsetHeight || 0) + 8;

        if (spaceBelow < requiredHeight && rect.top > requiredHeight) {
          setPosition({
            top: rect.top - requiredHeight,
            left:
              rect.left + (content?.width || 0) > document.body.clientWidth
                ? document.body.clientWidth - (content?.width || 0)
                : rect.left,
          });
        } else {
          setPosition({
            top: rect.bottom,
            left:
              rect.left + (content?.width || 0) > document.body.clientWidth
                ? document.body.clientWidth - (content?.width || 0)
                : rect.left,
          });
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
        "border-border-dark bg-bg-dark-panel text-text-light fixed z-50 rounded-lg border p-1 shadow-xl",
      )}
      style={{
        minWidth: `${triggerRef.current?.offsetWidth}px`,
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      {children}
    </div>
  );
};
