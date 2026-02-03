
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthContext";
import { toast } from "@/components/ui/use-toast";

export type UserRole = "admin" | "librarian" | "student";

interface RoleContextType {
  roles: UserRole[];
  isAdmin: boolean;
  isLibrarian: boolean;
  isStudent: boolean;
  loading: boolean;
  assignRole: (userId: string, role: UserRole) => Promise<void>;
  removeRole: (userId: string, role: UserRole) => Promise<void>;
}

const RoleContext = createContext<RoleContextType>({} as RoleContextType);

export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUserRoles = async () => {
      if (!user) {
        setRoles([]);
        setLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id);
          
        if (error) throw error;
        
        const userRoles = data.map((item) => item.role as UserRole);
        setRoles(userRoles);
      } catch (error) {
        console.error("Error fetching user roles:", error);
        toast({
          variant: "destructive",
          title: "Error fetching roles",
          description: error instanceof Error ? error.message : "An error occurred",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserRoles();
  }, [user]);
  
  const assignRole = async (userId: string, role: UserRole) => {
    try {
      const { error } = await supabase
        .from("user_roles")
        .insert({ user_id: userId, role })
        .select();
      
      if (error) throw error;
      
      if (userId === user?.id) {
        setRoles((prev) => [...prev, role]);
      }
      
      toast({
        title: "Role assigned",
        description: `${role} role has been assigned successfully.`,
      });
    } catch (error) {
      console.error("Error assigning role:", error);
      toast({
        variant: "destructive",
        title: "Error assigning role",
        description: error instanceof Error ? error.message : "An error occurred",
      });
      throw error;
    }
  };
  
  const removeRole = async (userId: string, role: UserRole) => {
    try {
      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", userId)
        .eq("role", role);
      
      if (error) throw error;
      
      if (userId === user?.id) {
        setRoles((prev) => prev.filter((r) => r !== role));
      }
      
      toast({
        title: "Role removed",
        description: `${role} role has been removed successfully.`,
      });
    } catch (error) {
      console.error("Error removing role:", error);
      toast({
        variant: "destructive",
        title: "Error removing role",
        description: error instanceof Error ? error.message : "An error occurred",
      });
      throw error;
    }
  };

  return (
    <RoleContext.Provider
      value={{
        roles,
        isAdmin: roles.includes("admin"),
        isLibrarian: roles.includes("librarian"),
        isStudent: roles.includes("student"),
        loading,
        assignRole,
        removeRole,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  return useContext(RoleContext);
};
