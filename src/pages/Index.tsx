
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Bell, LogOut, UserCog, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useRole } from "@/contexts/RoleContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MainNavigationMenu, getNavigationItems, getNavIcon } from "@/components/NavigationMenu";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user, signOut } = useAuth();
  const { roles, isAdmin, isLibrarian } = useRole();
  const navigate = useNavigate();

  const getUserInitials = () => {
    if (!user?.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-background animate-fadeIn">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm fixed w-full z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-semibold text-primary">UoEmbu Library</h1>
              <MainNavigationMenu />
            </div>
            
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuLabel className="text-sm font-normal text-muted-foreground">
                    {user?.email}
                  </DropdownMenuLabel>
                  {roles.length > 0 && (
                    <DropdownMenuLabel className="text-xs font-normal flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      {roles.join(", ")}
                    </DropdownMenuLabel>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="#profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="#borrowed">My Borrowed Items</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="#reservations">My Reservations</Link>
                  </DropdownMenuItem>
                  {(isAdmin || isLibrarian) && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/manage-users">
                          <UserCog className="mr-2 h-4 w-4" />
                          Manage Users
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Welcome to University of Embu Library
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover resources, research materials, and academic support services
            all in one place.
          </p>
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
            <Input
              type="text"
              placeholder="Search for books, articles, journals..."
              className="pl-12 pr-4 py-6 text-lg rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Button type="submit" className="hidden">Search</Button>
          </form>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-2xl font-semibold text-primary mb-8">Quick Access</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getNavigationItems(isAdmin, isLibrarian).map((item) => {
              const Icon = getNavIcon(item.label);
              return (
                <Link key={item.label} to={item.href}>
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-primary">{item.label}</h4>
                        <p className="text-sm text-muted-foreground">
                          Access {item.label.toLowerCase()} and related resources
                        </p>
                      </div>
                      <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                        <span className="text-xs">Alt</span> + {item.shortcut.toUpperCase()}
                      </kbd>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* News & Updates */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-2xl font-semibold text-primary mb-8">Latest Updates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6">
                <span className="text-sm text-accent">March {i + 10}, 2024</span>
                <h4 className="text-lg font-medium text-primary mt-2">
                  New Research Database Available
                </h4>
                <p className="text-muted-foreground mt-2">
                  Access the latest academic journals and research papers through our
                  new database subscription.
                </p>
                <Button variant="link" className="mt-4 p-0 h-auto text-accent">
                  Read more
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <p className="text-sm opacity-80">
                University of Embu Library<br />
                P.O. Box 6-60100<br />
                Embu, Kenya
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link to="/books" className="hover:opacity-100">Books</Link></li>
                <li><Link to="/e-resources" className="hover:opacity-100">E-Resources</Link></li>
                <li><Link to="/study-spaces" className="hover:opacity-100">Study Spaces</Link></li>
                <li><Link to="/services" className="hover:opacity-100">Library Services</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Library Hours</h4>
              <p className="text-sm opacity-80">
                Monday - Friday: 8:00 AM - 10:00 PM<br />
                Saturday: 9:00 AM - 5:00 PM<br />
                Sunday: 2:00 PM - 8:00 PM
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm opacity-80">
            <p>© 2024 University of Embu Library. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
