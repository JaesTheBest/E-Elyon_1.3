import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Camera, Upload, Save, Loader2, CheckCircle, LogOut } from 'lucide-react';

const CompleteProfile = ({ session }) => {
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // FIXED: Keys are lowercase to match database columns exactly
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    suffix: '',
    birthdate: '',
    baptismal_date: '',
    gender: 'Male',
    street: '',
    region: '',
    barangay: '',
    city: '',
    province: '',
    country: 'Philippines',
    contact_number: '',
    branch_id: '', 
    photo_path: null, 
    baptismal_png: null 
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      // 1. Get User's existing info
      const { data: userData } = await supabase
        .from('user_details')
        .select('*')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (userData) {
        setFormData(prev => ({
          ...prev,
          // Handle potential casing differences from DB response
          first_name: userData.First_Name || userData.first_name || '',
          last_name: userData.Last_Name || userData.last_name || ''
        }));
      }

      // 2. Fetch Branches
      const { data: branchData } = await supabase.from('branch').select('*');
      if (branchData) setBranches(branchData);
    };

    fetchInitialData();
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (event, bucketName, fieldName) => {
    try {
      setUploading(true);
      const file = event.target.files[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const cleanFileName = `${session.user.id}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(cleanFileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(cleanFileName);

      setFormData(prev => ({ ...prev, [fieldName]: publicUrl }));

    } catch (error) {
      alert('Error uploading file: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.branch_id) throw new Error("Please select a branch.");
      if (!formData.photo_path) throw new Error("Please upload a profile photo.");

      // Prepare Update Object - ensure branch_id is a number
      const updatePayload = {
        ...formData,
        branch_id: parseInt(formData.branch_id), 
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('user_details')
        .update(updatePayload)
        .eq('user_id', session.user.id); 

      if (error) throw error;

      setIsSubmitted(true);

    } catch (error) {
      console.error(error);
      alert("Save failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoToLogin = async () => {
      await supabase.auth.signOut();
      window.location.reload(); 
  };

  if (isSubmitted) {
      return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={50} className="text-green-600" />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Profile Completed!</h2>
                <p className="text-gray-500 mb-8">Your profile has been successfully updated.</p>
                <button onClick={handleGoToLogin} className="w-full py-4 bg-[#1b5e20] text-white rounded-xl font-bold text-lg hover:bg-green-900 transition-all shadow-lg flex items-center justify-center gap-2">
                    <LogOut size={20} /> Go to Login Page
                </button>
            </div>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div className="text-center border-b pb-6 border-gray-100">
          <h2 className="text-3xl font-extrabold text-green-900">Complete Your Profile</h2>
          <p className="mt-2 text-sm text-gray-500">Welcome to E-Elyon! Please fill in your details.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* IMAGES */}
          <div className="flex justify-center gap-10 mb-8">
             <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-green-50 mb-3 relative">
                    {formData.photo_path ? (
                        <img src={formData.photo_path} className="w-full h-full object-cover" alt="Profile" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400"><Camera size={40}/></div>
                    )}
                </div>
                <label className="cursor-pointer bg-green-50 text-green-700 px-4 py-2 rounded-lg text-xs font-bold hover:bg-green-100 transition">
                    Upload Photo
                    <input type="file" hidden accept="image/*" onChange={(e) => handleFileUpload(e, 'profile-photos', 'photo_path')} />
                </label>
             </div>

             <div className="flex flex-col items-center">
                <div className="w-48 h-32 rounded-lg overflow-hidden bg-gray-100 border-4 border-dashed border-gray-200 mb-3 relative flex items-center justify-center">
                    {formData.baptismal_png ? (
                        <img src={formData.baptismal_png} className="w-full h-full object-contain" alt="Certificate" />
                    ) : (
                        <div className="text-gray-400 text-center text-xs p-2">
                           <Upload size={30} className="mx-auto mb-1"/> No Certificate
                        </div>
                    )}
                </div>
                <label className="cursor-pointer bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-100 transition">
                    Upload Baptismal Cert
                    <input type="file" hidden accept="image/*" onChange={(e) => handleFileUpload(e, 'baptismal-certificates', 'baptismal_png')} />
                </label>
             </div>
          </div>

          {/* PERSONAL INFO - Uses Lowercase names */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input required placeholder="First Name" name="first_name" value={formData.first_name} onChange={handleChange} className="input-std" />
            <input placeholder="Middle Name" name="middle_name" value={formData.middle_name} onChange={handleChange} className="input-std" />
            <input required placeholder="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} className="input-std" />
            <input placeholder="Suffix" name="suffix" value={formData.suffix} onChange={handleChange} className="input-std" />
            
            <select name="gender" value={formData.gender} onChange={handleChange} className="input-std bg-white">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>

            <div>
                <label className="text-xs text-gray-500 block ml-1 mb-1">Birthdate</label>
                <input required type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} className="input-std" />
            </div>
            <div>
                <label className="text-xs text-gray-500 block ml-1 mb-1">Baptismal Date</label>
                <input required type="date" name="baptismal_date" value={formData.baptismal_date} onChange={handleChange} className="input-std" />
            </div>
             <input required placeholder="Contact Number" name="contact_number" value={formData.contact_number} onChange={handleChange} className="input-std" />
          </div>

          {/* BRANCH */}
          <div className="bg-green-50 p-4 rounded-xl border border-green-100">
             <label className="block text-sm font-bold text-green-800 mb-2">Select Your Branch</label>
             <select required name="branch_id" value={formData.branch_id} onChange={handleChange} className="w-full p-3 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-500 outline-none bg-white">
                 <option value="">-- Select Branch --</option>
                 {branches.map(branch => {
                     const bID = branch.Branch_ID || branch.branch_id;
                     const bName = branch.Branch_Name || branch.branch_name;
                     return (
                         <option key={bID} value={bID}>
                            {bName || `Branch #${bID}`}
                         </option>
                     );
                 })}
             </select>
          </div>

          {/* ADDRESS */}
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider border-b pb-1">Address Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required placeholder="Street" name="street" value={formData.street} onChange={handleChange} className="input-std" />
            <input required placeholder="Barangay" name="barangay" value={formData.barangay} onChange={handleChange} className="input-std" />
            <input required placeholder="City" name="city" value={formData.city} onChange={handleChange} className="input-std" />
            <input required placeholder="Province" name="province" value={formData.province} onChange={handleChange} className="input-std" />
            <input required placeholder="Region" name="region" value={formData.region} onChange={handleChange} className="input-std" />
            <input disabled placeholder="Country" name="country" value={formData.country} className="input-std bg-gray-100 text-gray-500" />
          </div>

          <button type="submit" disabled={loading || uploading} className="w-full py-4 bg-green-800 text-white rounded-xl font-bold text-lg hover:bg-green-900 transition shadow-lg flex items-center justify-center gap-2">
            {loading ? <Loader2 className="animate-spin"/> : <Save />}
            {loading ? "Saving Profile..." : "Complete Profile"}
          </button>
        </form>
      </div>
      
      <style>{`
        .input-std { width: 100%; padding: 0.75rem; border-radius: 0.5rem; border: 1px solid #e5e7eb; outline: none; transition: all 0.2s; }
        .input-std:focus { border-color: #166534; box-shadow: 0 0 0 2px #dcfce7; }
      `}</style>
    </div>
  );
};

export default CompleteProfile;