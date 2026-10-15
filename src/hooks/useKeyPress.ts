import { useEffect } from "react";

export function useKeyPress(key: string, callback: () => void): void {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === key) {
        callback();
      }}
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    
  }, [key, callback]);
}
