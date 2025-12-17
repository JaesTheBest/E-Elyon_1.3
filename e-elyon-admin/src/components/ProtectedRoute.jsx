import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { session, userRole, roleLoading } = useUser();

  // Wait until role is fully loaded
  if (roleLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return element;
};

export default ProtectedRoute;
