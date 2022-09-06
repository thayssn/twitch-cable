import { useCallback, useEffect, useRef } from "react";

type KeyboardEventsProps = {
  toggleSidebar: () => void;
  toggleChatSidebar: () => void;
};

export default function useKeyboardEvents({
  toggleSidebar,
  toggleChatSidebar,
}: KeyboardEventsProps) {
  const storedKey = useRef<string>("");

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    if (storedKey.current === event.code) storedKey.current = "";
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!["ArrowLeft", "ArrowRight", "ControlLeft"].includes(event.code))
      return;
    if (storedKey.current === "ControlLeft" && event.code === "ArrowLeft") {
      toggleSidebar();
    }
    if (storedKey.current === "ControlLeft" && event.code === "ArrowRight") {
      toggleChatSidebar();
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
  }, []);

  return;
}
