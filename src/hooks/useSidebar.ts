import { useCallback, useState } from "react";

export default function useSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const openSidebar = () => setIsOpen(true);

  const toggleSidebar = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  return {
    isOpen,
    openSidebar,
    toggleSidebar,
  };
}
