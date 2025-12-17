// File: E-Elyon_1.3-main/e-elyon-admin/src/pages/Admin/UserManagement.jsx

import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Shield, X, Save, Calendar, Loader2, Mail, CheckCircle, AlertTriangle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { supabase, supabaseUrl, supabaseKey } from '../../supabaseClient'; // <-- Adjusted import path

const UserManagement = () => {
  // ... (rest of the component logic remains the same)
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  
  const [invitedEmail, setInvitedEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    // Ensure 'Admin' role here matches the case in the database/login logic
    role: 'Staff', 
    accessStart: '',
    accessEnd: ''
  });

  useEffect(() => {
    fetchUsers();
    // Realtime Listener: Table updates automatically when they click the email link!
    const subscription = supabase.channel('public:users')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'users' }, fetchUsers)
      .subscribe();

    return () => { supabase.removeChannel(subscription); }
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('users') 
        .select(`
          user_id, email, role, access_start, access_end, is_active,
          user_details ( first_name, last_name ) 
        `);

      if (error) throw error;

      const formattedData = data.map(user => ({
        id: user.user_id,
        email: user.email,
        role: user.role,
        accessStart: user.access_start ? user.access_start.split('T')[0] : '',
        accessEnd: user.access_end ? user.access_end.split('T')[0] : '',
        status: user.is_active ? 'Active' : 'Inactive',
        firstName: user.user_details?.[0]?.first_name || 'N/A',
        lastName: user.user_details?.[0]?.last_name || ''
      }));

      setUsers(formattedData);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleInviteUser = async (e) => {
    e.preventDefault();
    setSaving(true);

    // Dummy password (user will change it later or use the link to login)
    const tempPassword = `Elyon-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      const tempSupabase = createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false }
      });

      // This sends the "Confirm Registration" email automatically
      const { error: inviteError } = await tempSupabase.auth.signUp({
        email: formData.email,
        password: tempPassword,
        options: {
          data: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            role: formData.role,
            accessStart: formData.accessStart,
            accessEnd: formData.accessEnd,
          }
        }
      });

      if (inviteError) throw inviteError;

      // SUCCESS: Email Sent
      setIsModalOpen(false);
      setInvitedEmail(formData.email);
      setShowSuccessModal(true); 
      setFormData({ firstName: '', lastName: '', email: '', role: 'Staff', accessStart: '', accessEnd: '' });

    } catch (error) {
      setErrorMessage(error.message);
      setShowErrorModal(true);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="p-8 relative h-full">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">User & Role Management</h2>
          <p className="text-gray-500 text-sm">Users will appear here after they accept the email invite.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1b5e20] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-900 transition-colors shadow-sm"
        >
          <Plus size={18} />
          <span>Invite New User</span>
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-10 flex justify-center text-green-800 gap-2">
             <Loader2 className="animate-spin" /> Loading...
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-[#e8f5e9] text-green-900 font-semibold text-sm">
              <tr>
                <th className="p-4">User Name</th>
                <th className="p-4">Role</th>
                <th className="p-4">Role Duration</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.length === 0 ? (
                 <tr>
                    <td colSpan="5" className="p-10 text-center text-gray-400 flex flex-col items-center gap-2">
                        <Mail size={40} className="text-gray-300"/>
                        <p>No active users yet.</p>
                        <p className="text-sm">Invite someone to get started!</p>
                    </td>
                 </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-gray-800 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs uppercase">
                            {user.firstName.charAt(0)}
                        </div>
                        <div>
                            <div className="font-bold">{user.firstName} {user.lastName}</div>
                            <div className="text-xs text-gray-400">{user.email}</div>
                        </div>
                    </td>
                    <td className="p-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100 flex items-center gap-1 w-fit">
                            <Shield size={12}/> {user.role}
                        </span>
                    </td>
                    <td className="p-4 text-gray-600 text-sm">
                        <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-gray-400"/>
                            <span>{user.accessStart || 'N/A'}</span>
                            <span className="text-gray-400">to</span>
                            <span>{user.accessEnd || 'N/A'}</span>
                        </div>
                    </td>
                    <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {user.status}
                        </span>
                    </td>
                    <td className="p-4 flex justify-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all"><Edit2 size={16}/></button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16}/></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* SUCCESS MODAL (Email Sent) */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center transform scale-100 transition-all">
               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                   <Mail size={40} />
               </div>
               <h3 className="text-2xl font-bold text-gray-800 mb-2">Invite Sent!</h3>
               <p className="text-gray-500 text-sm mb-6">
                  An email has been sent to <strong>{invitedEmail}</strong>.<br/><br/>
                  The user will appear in this list automatically after they click the link in their email.
               </p>
               
               <button onClick={() => setShowSuccessModal(false)} className="w-full py-3 bg-[#1b5e20] text-white rounded-xl font-bold hover:bg-green-900 shadow-lg shadow-green-900/20">
                  Okay, Good
               </button>
           </div>
        </div>
      )}

      {/* ERROR MODAL */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
               <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                   <AlertTriangle size={40} />
               </div>
               <h3 className="text-2xl font-bold text-gray-800 mb-2">Error!</h3>
               <p className="text-gray-600 mb-6 text-sm">{errorMessage}</p>
               <button onClick={() => setShowErrorModal(false)} className="w-full py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 shadow-lg shadow-red-600/20">
                  Try Again
               </button>
           </div>
        </div>
      )}

      {/* FORM MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h3 className="text-xl font-bold text-gray-800">Invite New User</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500"><X size={24}/></button>
            </div>
            
            <form onSubmit={handleInviteUser} className="space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-800 mb-4 border border-blue-100">
                 ℹ️ System will send an email invite. User must confirm to join.
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input required name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input required name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"/>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"/>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select name="role" value={formData.role} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white">
                  <option value="Staff">Staff</option>
                  <option value="Finance">Finance</option>
                  <option value="Bishop">Bishop</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Access Start</label>
                    <input name="accessStart" value={formData.accessStart} onChange={handleInputChange} type="date" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Access End</label>
                    <input name="accessEnd" value={formData.accessEnd} onChange={handleInputChange} type="date" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"/>
                </div>
              </div>
              
              <div className="flex gap-3 mt-8 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 py-2 bg-[#1b5e20] text-white rounded-lg hover:bg-green-900 flex justify-center items-center gap-2">
                  {saving ? <Loader2 className="animate-spin" size={18}/> : <Mail size={18} />}
                  {saving ? "Sending..." : "Send Invite"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;