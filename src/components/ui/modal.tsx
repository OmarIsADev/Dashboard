import { X } from "lucide-react";
import React, {
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Button, { type ButtonProps } from "./button";

interface ModalContextType {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModalContext must be used within a <Modal>");
  }
  return context;
};

interface ModalProps {
  children: React.ReactNode;
}

export const Modal = ({
  children,
  isOpen,
  setIsOpen,
}: {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
} & ModalProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen?.(true);
    setOpen(true);
  };
  const closeModal = () => {
    setIsOpen?.(false);
    setOpen(false);
  };

  useEffect(() => {
    setOpen(isOpen ?? false);
  }, [isOpen]);

  // The context value includes the state and the functions to change it
  const value: ModalContextType = { open, openModal, closeModal };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const ModalClose = ({
  children,
  ...props
}: {
  children: React.ReactElement | string;
} & ButtonProps) => {
  const { closeModal } = useModalContext();

  if (isValidElement(children)) {
    return cloneElement(
      children as React.ReactElement<{ onClick: () => void }>,
      { onClick: closeModal },
    );
  } else {
    return (
      <Button
        variant="bordered"
        onClick={(e) => {
          props.onClick?.(e);
          closeModal();
        }}
        {...props}
      >
        {children}
      </Button>
    );
  }
};

export const ModalSubmit = ({
  children,
  ...props
}: { children: React.ReactElement | string } & ButtonProps) => {
  const { closeModal } = useModalContext();

  if (isValidElement(children)) {
    return cloneElement(
      children as React.ReactElement<{ onClick: () => void }>,
      { onClick: closeModal },
    );
  } else {
    return (
      <Button type="submit" variant="primary" onClick={closeModal} {...props}>
        {children}
      </Button>
    );
  }
};

export const ModalTrigger = ({ children, onClick, ...props }: ButtonProps) => {
  const { openModal } = useModalContext();

  return (
    <Button
      onClick={(e) => {
        openModal();
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export const ModalContent = ({
  children,
  title,
}: { title: string } & ModalProps) => {
  const { open, closeModal } = useModalContext();

  if (!open) {
    return null;
  }

  // Render the modal using a portal to the document body
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={closeModal} // Close modal when clicking the backdrop
    >
      {/* Semi-transparent backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Modal content container. Prevents closing when clicking inside. */}
      <div
        className="bg-primary-light text-text-dark relative z-10 m-auto max-h-[calc(100svh-32px)] w-full max-w-lg scale-100 transform overflow-y-auto rounded-xl px-8 py-4 shadow-2xl transition-transform duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header and Close button */}
        <div className="mb-4 flex justify-between sticky top-0">
          <h1 className="text-2xl font-medium">{title}</h1>
          <button
            aria-label="Close"
            className="text-text-dark/50 hover:text-text-dark cursor-pointer transition-colors duration-200"
            onClick={closeModal}
          >
            <X />
          </button>
        </div>

        {children}
      </div>
    </div>,
    document.body, // The portal's target
  );
};
