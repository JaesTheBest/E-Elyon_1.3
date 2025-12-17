import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const LOGO_URL = "https://wbvmnybkjtzvtotxqzza.supabase.co/storage/v1/object/public/assets/logos/logo_1765823120776.png";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { setUserRole } = useUser();

  const fetchAndRedirect = async (authUserId) => {
    const { data: userData, error: fetchError } = await supabase
      .from('users')
      .select('role')
      .eq('auth_user_id', authUserId)
      .single();

    if (fetchError || !userData) {
      throw new Error("Could not determine user role.");
    }

    const role = userData.role?.trim().toLowerCase();
    setUserRole(role);

    // Redirect immediately based on role
    if (role === 'admin' || role === 'bishop') {
      navigate('/admin/dashboard', { replace: true });
    } else if (role === 'staff') {
      navigate('/staff/dashboard', { replace: true });
    } else if (role === 'finance') {
      navigate('/finance/dashboard', { replace: true });
    } else {
      navigate('/unauthorized', { replace: true });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      // Perform the role check and redirect right now
      await fetchAndRedirect(data.user.id); 
    } catch (error) {
      setError(error.message);
      await supabase.auth.signOut(); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      <div className="hidden lg:flex w-[55%] relative bg-[#1b5e20] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=2070')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative z-10 flex flex-col items-center">
            <div className="w-48 h-48 rounded-full border-4 border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-sm shadow-2xl mb-6 overflow-hidden p-4">
                <img src={LOGO_URL} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-white text-5xl font-bold tracking-wide">Shepered</h1>
            <p className="text-green-100 mt-2 text-lg">Admin Control Panel</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-[#1b5e20] mb-2">LOGIN PAGE</h2>
            {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>}
            <form onSubmit={handleLogin} className="space-y-6">
                <input 
                    type="email" placeholder="Enter Email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200" required
                />
                <div className="relative">
                    <input 
                        type={showPassword ? "text" : "password"} placeholder="Enter password" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200" required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-gray-400">
                        {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                    </button>
                </div>
                <button 
                    type="submit" disabled={loading}
                    className="w-full py-3 bg-[#1b5e20] text-white rounded-xl font-bold flex items-center justify-center gap-2"
                >
                    {loading ? <Loader2 className="animate-spin" /> : 'Sign in'}
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Login;