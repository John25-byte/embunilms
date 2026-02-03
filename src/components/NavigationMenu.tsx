
import { Link } from "react-router-dom";
import { 
  Book, BookOpen, Library, BookmarkIcon, Users, Bell, Settings, UserCog, User, Database
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NavigationItem, useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { useRole } from "@/contexts/RoleContext";

export type NavigationItemWithAccess = NavigationItem & {
  adminOnly?: boolean;
  staffOnly?: boolean; // For both admin and librarian
};

export const getNavigationItems = (isAdmin: boolean, isLibrarian: boolean): NavigationItemWithAccess[] => {
  const baseItems: NavigationItemWithAccess[] = [
    { label: "Books", href: "/books", shortcut: "b" },
    { label: "E-Resources", href: "/e-resources", shortcut: "e" },
    { label: "Study Spaces", href: "/study-spaces", shortcut: "s" },
    { label: "Research", href: "/research", shortcut: "r" },
    { label: "Services", href: "/services", shortcut: "v" },
    { label: "Updates", href: "/updates", shortcut: "u" },
  ];

  const staffItems: NavigationItemWithAccess[] = [
    { label: "Manage Users", href: "/manage-users", shortcut: "m", staffOnly: true },
    { label: "Circulation", href: "/circulation", shortcut: "c", staffOnly: true },
  ];

  const adminItems: NavigationItemWithAccess[] = [
    { label: "Administration", href: "/admin", shortcut: "a", adminOnly: true },
    { label: "System Settings", href: "/settings", shortcut: "y", adminOnly: true },
  ];

  const allItems = [...baseItems];
  
  if (isLibrarian || isAdmin) {
    allItems.push(...staffItems);
  }
  
  if (isAdmin) {
    allItems.push(...adminItems);
  }

  return allItems;
};

export const getNavIcon = (label: string) => {
  switch (label) {
    case "Books": return Book;
    case "E-Resources": return BookOpen;
    case "Study Spaces": return Library;
    case "Research": return BookmarkIcon;
    case "Services": return Users;
    case "Updates": return Bell;
    case "Manage Users": return UserCog;
    case "Circulation": return Database;
    case "Administration": return Settings;
    case "System Settings": return Settings;
    default: return Book;
  }
};

export const MainNavigationMenu = () => {
  const { isAdmin, isLibrarian } = useRole();
  const navigationItems = getNavigationItems(isAdmin, isLibrarian);
  const { activeKey } = useKeyboardNavigation(navigationItems);

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {navigationItems.map((item) => {
          const Icon = getNavIcon(item.label);
          const isActive = activeKey === item.shortcut;
          
          return (
            <NavigationMenuItem key={item.label}>
              <Link to={item.href}>
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(),
                    isActive && "bg-accent text-accent-foreground",
                    "flex items-center gap-2"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  <kbd className="ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">Alt</span> + {item.shortcut.toUpperCase()}
                  </kbd>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
