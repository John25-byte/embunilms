
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useRole } from "@/contexts/RoleContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

interface User {
  id: string;
  email: string;
  created_at: string;
  roles: string[];
}

const ManageUsers = () => {
  const { user } = useAuth();
  const { isAdmin, isLibrarian } = useRole();
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin && !isLibrarian) return;
    
    const fetchUsers = async () => {
      try {
        const { data: authUsers, error: authError } = await supabase
          .from("users")
          .select("id, email, created_at");
        
        if (authError) throw authError;
        
        // Fetch roles for each user
        const usersWithRoles = await Promise.all(
          authUsers.map(async (authUser) => {
            const { data: roles } = await supabase
              .from("user_roles")
              .select("role")
              .eq("user_id", authUser.id);
            
            return {
              ...authUser,
              roles: roles ? roles.map(r => r.role) : []
            };
          })
        );
        
        setUsers(usersWithRoles);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast({
          variant: "destructive",
          title: "Failed to load users",
          description: "There was an error loading the user list."
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, [isAdmin, isLibrarian]);

  const handleRoleToggle = async (userId: string, role: string) => {
    if (!isAdmin) {
      toast({
        variant: "destructive",
        title: "Permission denied",
        description: "Only administrators can change user roles."
      });
      return;
    }
    
    try {
      const userWithRole = users.find(u => u.id === userId);
      const hasRole = userWithRole?.roles.includes(role);
      
      if (hasRole) {
        // Remove role
        await supabase
          .from("user_roles")
          .delete()
          .eq("user_id", userId)
          .eq("role", role);
          
        setUsers(users.map(u => {
          if (u.id === userId) {
            return {
              ...u,
              roles: u.roles.filter(r => r !== role)
            };
          }
          return u;
        }));
        
        toast({
          title: "Role removed",
          description: `${role} role has been removed.`
        });
      } else {
        // Add role
        await supabase
          .from("user_roles")
          .insert({ user_id: userId, role });
          
        setUsers(users.map(u => {
          if (u.id === userId) {
            return {
              ...u,
              roles: [...u.roles, role]
            };
          }
          return u;
        }));
        
        toast({
          title: "Role assigned",
          description: `${role} role has been assigned.`
        });
      }
    } catch (error) {
      console.error("Error toggling role:", error);
      toast({
        variant: "destructive",
        title: "Error updating role",
        description: "There was a problem updating the user's role."
      });
    }
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAdmin && !isLibrarian) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-destructive">Access Denied</h1>
        <p className="mt-4">You don't have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-8">Manage Users</h1>
      
      <div className="flex justify-between items-center mb-6">
        <Input
          placeholder="Search users by email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading users...</p>
        </div>
      ) : (
        <Table>
          <TableCaption>List of all system users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Roles</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  {searchTerm ? "No users found matching your search" : "No users found"}
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.roles.length > 0 ? (
                        user.roles.map((role) => (
                          <Badge key={role} variant="outline" className="capitalize">
                            {role}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground text-sm">No roles</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {isAdmin && (
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant={user.roles.includes("student") ? "default" : "outline"}
                          onClick={() => handleRoleToggle(user.id, "student")}
                        >
                          Student
                        </Button>
                        <Button
                          size="sm"
                          variant={user.roles.includes("librarian") ? "default" : "outline"}
                          onClick={() => handleRoleToggle(user.id, "librarian")}
                        >
                          Librarian
                        </Button>
                        <Button
                          size="sm"
                          variant={user.roles.includes("admin") ? "default" : "outline"}
                          onClick={() => handleRoleToggle(user.id, "admin")}
                        >
                          Admin
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ManageUsers;
