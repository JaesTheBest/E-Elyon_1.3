import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // <-- Import useNavigate
import { useUser } from '../context/UserContext'; // <-- Import UserContext

// 👇 YOUR SPECIFIC LOGO URL
const LOGO_URL = "https://wbvmnybkjtzvtotxqzza.supabase.co/storage/v1/object/public/assets/logos/logo_1765823120776.png";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // <-- Initialize useNavigate
  const { setUserRole } = useUser(); // <-- Get context helper

  // Helper function to get role after successful login
  const fetchAndRedirect = async (authUserId) => {
  const { data: userData, error: fetchError } = await supabase
    .from('users')
    .select('role')
    .eq('auth_user_id', authUserId)
    .single();

  if (fetchError || !userData) {
    throw new Error(
      `Could not determine user role. Please contact support. (${fetchError?.message || 'No role found'})`
    );
  }

  const userRole = userData.role?.trim().toLowerCase();
setUserRole(userRole);

let redirectPath;
switch (userRole) {
  case 'admin':
  case 'bishop':
    redirectPath = '/admin/dashboard';
    break;
  case 'staff':
    redirectPath = '/staff/dashboard';
    break;
  case 'finance':
    redirectPath = '/finance/dashboard';
    break;
  default:
    console.error('Unhandled role:', userRole);
    await supabase.auth.signOut();
    throw new Error(`Access Denied. Role '${userRole}' not permitted.`);
}

navigate(redirectPath, { replace: true });

};


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // Instead of calling onLoginSuccess, we fetch the role and redirect directly
      await fetchAndRedirect(data.user.id); 

    } catch (error) {
      setError(error.message);
      // Ensure session is cleared if redirection failed or role check failed
      await supabase.auth.signOut(); 
    } finally {
      setLoading(false);
    }
  };

  return (
    // ... (rest of the component structure remains the same)
    <div className="flex h-screen w-full bg-white overflow-hidden">
      
      {/* ==============================
          LEFT SIDE: Branding & Image 
         ============================== */}
      <div className="hidden lg:flex w-[55%] relative bg-[#1b5e20] items-center justify-center overflow-hidden">
        
        {/* Background Image Overlay */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=2070')] bg-cover bg-center mix-blend-overlay"></div>

        {/* The White Curve (SVG Shape) */}
        <div className="absolute top-0 right-0 bottom-0 w-24 overflow-hidden pointer-events-none">
           <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full fill-white scale-150 origin-right translate-x-10">
              <path d="M0 0 C 40 10 40 90 0 100 L 100 100 L 100 0 Z" />
           </svg>
        </div>

        {/* Content: Logo & Text */}
        <div className="relative z-10 flex flex-col items-center">
            
            {/* LOGO CIRCLE with Your Image */}
            <div className="w-48 h-48 rounded-full border-4 border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-sm shadow-2xl mb-6 overflow-hidden p-4">
                <img 
                  src={LOGO_URL} 
                  alt="Shepered Logo" 
                  className="w-full h-full object-contain drop-shadow-md"
                />
            </div>
            
            {/* Brand Name */}
            <h1 className="text-white text-5xl font-bold tracking-wide drop-shadow-lg">Shepered</h1>
            <p className="text-green-100 mt-2 text-lg font-medium tracking-wider">Admin Control Panel</p>
        </div>
      </div>

      {/* ==============================
          RIGHT SIDE: Login Form 
         ============================== */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white relative z-10">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-gray-100 shadow-xl lg:shadow-none lg:border-none">
            
            {/* Header */}
            <div className="mb-10 text-center lg:text-left">
                <h2 className="text-3xl font-bold text-[#1b5e20] mb-2">LOGIN PAGE</h2>
                <p className="text-gray-400 text-sm">Welcome back! Please enter your details.</p>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-center gap-2">
                    <span className="font-bold">Error:</span> {error}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
                
                {/* Email Input */}
                <div className="space-y-2">
                    <input 
                        type="email" 
                        placeholder="Enter Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#1b5e20] focus:ring-2 focus:ring-green-100 outline-none transition-all text-gray-700 placeholder-gray-400"
                        required
                    />
                </div>

                {/* Password Input */}
                <div className="space-y-2 relative">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Enter password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#1b5e20] focus:ring-2 focus:ring-green-100 outline-none transition-all text-gray-700 placeholder-gray-400"
                        required
                    />
                    <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                    </button>
                </div>

                {/* Forgot Password Link */}
                <div className="flex justify-end">
                    <button type="button" className="text-xs text-[#1b5e20] hover:underline font-medium">
                        Forgot password?
                    </button>
                </div>

                {/* Submit Button */}
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-3 bg-[#1b5e20] text-white rounded-xl font-bold text-lg hover:bg-green-900 transition-all shadow-lg shadow-green-900/20 flex items-center justify-center gap-2 transform active:scale-95"
                >
                    {loading ? <Loader2 className="animate-spin" /> : 'Sign in'}
                </button>
            </form>

            <div className="mt-8 text-center">
                 <p className="text-xs text-gray-400">© 2025 E-Elyon Systems. All rights reserved.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;