import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useUser } from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Login from './components/Login';

// Pages
import AdminDashboard from './pages/Admin/Dashboard';
import UserManagement from './pages/Admin/UserManagement';
import StaffDashboard from './pages/Staff/StaffDashboard';
import FinanceDashboard from './pages/Finance/FinanceDashboard';
import BishopDashboard from './pages/Bishop/BishopDashboard';

function App() {
  const { session, loading, userRole, roleLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  // App loading (session)
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin mr-2" />
        Loading E-Elyon...
      </div>
    );
  }

  // Not logged in
  if (!session) {
    return <Login />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex flex-col">
        <div className="px-8 pt-6">
          <Header user={session.user} />
        </div>

        <Routes>
          {/* ROOT REDIRECT — FIXED */}
          <Route
            path="/"
            element={
              roleLoading ? (
                <div className="p-10">Loading role...</div>
              ) : userRole === 'admin' ? (
                <Navigate to="/admin/dashboard" replace />
              ) : userRole === 'bishop' ? (
                <Navigate to="/bishop/dashboard" replace />
              ) : userRole === 'staff' ? (
                <Navigate to="/staff/dashboard" replace />
              ) : userRole === 'finance' ? (
                <Navigate to="/finance/dashboard" replace />
              ) : (
                <Navigate to="/unauthorized" replace />
              )
            }
          />
          {/* BISHOP */}
          <Route
            path="/bishop/dashboard"
            element={<ProtectedRoute element={<BishopDashboard />} allowedRoles={['bishop']} />}
          />

          {/* ADMIN */}
          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={['admin']} />}
          />
          <Route
            path="/admin/users"
            element={<ProtectedRoute element={<UserManagement />} allowedRoles={['admin']} />}
          />

          {/* STAFF */}
          <Route
            path="/staff/dashboard"
            element={<ProtectedRoute element={<StaffDashboard />} allowedRoles={['staff']} />}
          />

          {/* FINANCE */}
          <Route
            path="/finance/dashboard"
            element={<ProtectedRoute element={<FinanceDashboard />} allowedRoles={['finance']} />}
          />

          {/* SYSTEM */}
          <Route
            path="/unauthorized"
            element={
              <div className="p-10 text-center">
                <h1 className="text-3xl font-bold text-red-700">403 - Access Denied</h1>
              </div>
            }
          />

          <Route
            path="*"
            element={
              <div className="p-10 text-center">
                <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
