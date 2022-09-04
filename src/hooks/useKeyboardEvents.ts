import { useCallback, useEffect, useRef } from "react";

type KeyboardEventsProps = {
  toggleSidebar: () => void;
};

export default function useKeyboardEvents({
  toggleSidebar,
}: KeyboardEventsProps) {
  const storedKey = useRef<string>("");

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    if (storedKey.current === event.code) storedKey.current = "";
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!["ArrowLeft", "ControlLeft"].includes(event.code)) return;
    if (storedKey.current === "ControlLeft" && event.code === "ArrowLeft") {
      toggleSidebar();
    }
    if (event.code === "ControlLeft") storedKey.current = event.code;
  }, []);

  useEffect(() => {
    if (window) {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    }
  }, [handleKeyDown, handleKeyUp]);

  return;
}
