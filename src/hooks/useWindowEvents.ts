import { useEffect, useState } from "react";

export default function useWindowEvents() {
  const [limits, setLimits] = useState({ width: 0, height: 0 });

  useEffect(() => {
    window &&
      setLimits({
        width: window.innerWidth,
        height: window.innerHeight,
      });
  }, []);

  return {
    limits,
  };
}
