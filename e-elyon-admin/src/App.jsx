import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Login from './components/Login';

// Pages
import AdminDashboard from './pages/Admin/Dashboard';
import Backup from './pages/Admin/Backup';
import AuditTrail from './pages/Admin/AuditTrail';
import Settings from './pages/Admin/Settings';
import UserManagement from './pages/Admin/UserManagement';
import StaffDashboard from './pages/Staff/StaffDashboard';
import FinanceDashboard from './pages/Finance/FinanceDashboard';
import BishopDashboard from './pages/Bishop/BishopDashboard';
import FundManagement from './pages/Finance/FundManagement';
import Stipends from './pages/Finance/Stipends';
import FinanceTasks from './pages/Finance/FinanceTasks';
import FinanceReports from './pages/Finance/FinanceReports';
import BishopRoles from './pages/Bishop/Roles';
import BishopFinance from './pages/Bishop/BishopFinance';
import BishopTasks from './pages/Bishop/BishopTasks';
import BishopAnalytics from './pages/Bishop/BishopAnalytics';
import Membership from './pages/Bishop/Membership';
import Events from './pages/Bishop/Events';
import Counseling from './pages/Bishop/Counseling';

function App() {
  const { session, userRole } = useUser();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  // If there is no session, show Login page immediately
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
          {/* Default redirect based on role when visiting "/" */}
          <Route
            path="/"
            element={
              userRole === 'admin' ? (
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
          
          <Route path="/bishop/dashboard" element={<ProtectedRoute element={<BishopDashboard />} allowedRoles={['bishop']} />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={['admin']} />} />
          <Route path="/admin/users" element={<ProtectedRoute element={<UserManagement />} allowedRoles={['admin']} />} />
          <Route path="/staff/dashboard" element={<ProtectedRoute element={<StaffDashboard />} allowedRoles={['staff']} />} />
          <Route path="/finance/dashboard" element={<ProtectedRoute element={<FinanceDashboard />} allowedRoles={['finance']} />} />
          <Route path="/admin/backup" element={<ProtectedRoute element={<Backup />} allowedRoles={['admin']} />} />
          <Route path="/admin/audit" element={<ProtectedRoute element={<AuditTrail />} allowedRoles={['admin']} />} />
          <Route path="/admin/settings" element={<ProtectedRoute element={<Settings />} allowedRoles={['admin']} />} />
          <Route path="/finance/funds" element={<ProtectedRoute element={<FundManagement />} allowedRoles={['finance']} />} />
          <Route path="/finance/stipends" element={<ProtectedRoute element={<Stipends />} allowedRoles={['finance']} />} />
          <Route path="/finance/tasks" element={<ProtectedRoute element={<FinanceTasks />} allowedRoles={['finance']} />} />
          <Route path="/finance/reports" element={<ProtectedRoute element={<FinanceReports />} allowedRoles={['finance']} />} />
          <Route path="/bishop/roles" element={<ProtectedRoute element={<BishopRoles />} allowedRoles={['bishop']} />} />
          <Route path="/bishop/finance" element={<ProtectedRoute element={<BishopFinance />} allowedRoles={['bishop']} />} />
          <Route path="/bishop/tasks" element={<ProtectedRoute element={<BishopTasks />} allowedRoles={['bishop']} />} />
          <Route path="/bishop/analytics" element={<ProtectedRoute element={<BishopAnalytics />} allowedRoles={['bishop']} />} />
          <Route path="/bishop/membership" element={<ProtectedRoute element={<Membership />} allowedRoles={['bishop']} />} />
          <Route path="/bishop/events" element={<ProtectedRoute element={<Events />} allowedRoles={['bishop']} />} />
          <Route path="/bishop/counseling" element={<ProtectedRoute element={<Counseling />} allowedRoles={['bishop']} />} />

          <Route path="/unauthorized" element={<div className="p-10 text-center"><h1 className="text-3xl font-bold text-red-700">403 - Access Denied</h1></div>} />
          <Route path="*" element={<div className="p-10 text-center"><h1 className="text-3xl font-bold">404 - Page Not Found</h1></div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;