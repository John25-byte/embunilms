
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export type NavigationItem = {
  label: string;
  href: string;
  shortcut: string;
};

export function useKeyboardNavigation(navigationItems: NavigationItem[]) {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState<string | null>(null);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if Alt key is pressed along with another key
      if (e.altKey) {
        const key = e.key.toLowerCase();
        const navItem = navigationItems.find(item => 
          item.shortcut.toLowerCase() === key);
          
        if (navItem) {
          e.preventDefault();
          setActiveKey(navItem.shortcut);
          navigate(navItem.href);
          
          // Reset the active key after a short delay for visual feedback
          setTimeout(() => setActiveKey(null), 500);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigationItems, navigate]);

  return { activeKey };
}
