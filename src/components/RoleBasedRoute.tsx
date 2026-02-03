
import { Navigate, Outlet } from "react-router-dom";
import { useRole } from "@/contexts/RoleContext";
import { UserRole } from "@/contexts/RoleContext";

interface RoleBasedRouteProps {
  allowedRoles: UserRole[];
}

export const RoleBasedRoute = ({ allowedRoles }: RoleBasedRouteProps) => {
  const { roles, loading } = useRole();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  const hasAllowedRole = roles.some(role => allowedRoles.includes(role));
  
  if (!hasAllowedRole) {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />;
};
