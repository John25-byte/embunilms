
import { Auth } from "@/components/Auth";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const AuthPage = () => {
  const { user, loading } = useAuth();

  // Redirect to home if user is already logged in
  if (user && !loading) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary mb-10">University of Embu Library</h1>
        <p className="text-muted-foreground mb-10 max-w-md mx-auto">
          Please log in or sign up to access the library resources and services.
        </p>
        <Auth />
      </div>
    </div>
  );
};

export default AuthPage;
