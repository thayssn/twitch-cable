import { useCallback, useEffect, useRef, useState } from "react";

export default function useSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const storedKey = useRef<string>("");
  const timeoutRef = useRef<Timeout | null>(null);

  const openSidebar = () => setIsOpen(true);

  const toggleSidebar = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    console.log("currently stored", storedKey.current);
  }, []);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    if (storedKey.current === event.code) storedKey.current = "";
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!["Enter", "ControlLeft"].includes(event.code)) return;

      if (storedKey.current === "ControlLeft" && event.code === "Enter") {
        toggleSidebar();
      }

      if (event.code === "ControlLeft") storedKey.current = event.code;
    },
    [toggleSidebar]
  );
  useEffect(() => {
    if (window) {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    }
  }, [handleKeyPress, handleKeyDown, handleKeyUp]);

  return {
    isOpen,
    openSidebar,
    toggleSidebar,
  };
}
