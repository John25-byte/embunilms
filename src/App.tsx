
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { RoleProvider } from "./contexts/RoleContext";
import Index from "./pages/Index";
import AuthPage from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RoleBasedRoute } from "./components/RoleBasedRoute";
import Books from "./pages/Books";
import BookDetails from "./components/BookDetails";
import EResources from "./pages/EResources";
import StudySpaces from "./pages/StudySpaces";
import Research from "./pages/Research";
import Services from "./pages/Services";
import Updates from "./pages/Updates";
import ManageUsers from "./pages/ManageUsers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RoleProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<AuthPage />} />
              
              {/* Protected routes for all authenticated users */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Index />} />
                <Route path="/books" element={<Books />} />
                <Route path="/books/:id" element={<BookDetails />} />
                <Route path="/e-resources" element={<EResources />} />
                <Route path="/study-spaces" element={<StudySpaces />} />
                <Route path="/research" element={<Research />} />
                <Route path="/services" element={<Services />} />
                <Route path="/updates" element={<Updates />} />
                
                {/* Staff-only routes (librarians and admins) */}
                <Route element={<RoleBasedRoute allowedRoles={["admin", "librarian"]} />}>
                  <Route path="/manage-users" element={<ManageUsers />} />
                  <Route path="/circulation" element={<div className="container mx-auto px-4 py-24"><h1 className="text-3xl font-bold">Circulation</h1></div>} />
                </Route>
                
                {/* Admin-only routes */}
                <Route element={<RoleBasedRoute allowedRoles={["admin"]} />}>
                  <Route path="/admin" element={<div className="container mx-auto px-4 py-24"><h1 className="text-3xl font-bold">Administration</h1></div>} />
                  <Route path="/settings" element={<div className="container mx-auto px-4 py-24"><h1 className="text-3xl font-bold">System Settings</h1></div>} />
                </Route>
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </RoleProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
