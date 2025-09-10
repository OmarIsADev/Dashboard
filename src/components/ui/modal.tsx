import { X } from "lucide-react";
import { createContext, useContext, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalContextType {
  isOpen: boolean;
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
  children: ReactNode;
}

export const Modal = ({ children }: ModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // The context value includes the state and the functions to change it
  const value: ModalContextType = { isOpen, openModal, closeModal };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const ModalTrigger = ({ children }: ModalProps) => {
  const { openModal } = useModalContext();

  return <button onClick={openModal}>{children}</button>;
};

export const ModalContent = ({ children }: ModalProps) => {
  const { isOpen, closeModal } = useModalContext();

  if (!isOpen) {
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
        className="relative z-10 m-auto w-full max-w-lg scale-100 transform rounded-xl bg-white p-8 text-zinc-900 shadow-2xl transition-transform duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 cursor-pointer text-gray-400 transition-colors duration-200 hover:text-gray-600"
          aria-label="Close"
        >
          <X />
        </button>

        {children}
      </div>
    </div>,
    document.body, // The portal's target
  );
};
