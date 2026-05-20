import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { logout, setCredentials } from '../redux/slices/authSlice';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local state form ke liye
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // File bhejne ke liye FormData object banana zaroori hai
    const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);
    if (file) {
      formData.append('profilePicture', file);
    }

    try {
      const response = await axiosInstance.put('/users/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Redux state mein naya user data save karo (jismein photo ka URL bhi hoga)
      dispatch(setCredentials(response.data));
      setMessage('Profile updated successfully! 🎉');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  // Backend ka pura URL photo dikhane ke liye (agar local uploads folder use kar rahe hain)
  const profilePicUrl = user?.profilePicture 
    ? `http://localhost:5000${user.profilePicture}` 
    : 'https://via.placeholder.com/150';

  return (
    <div className="min-h-screen flex flex-col items-center py-10 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        
        {/* Profile Header & Picture */}
        <div className="flex flex-col items-center mb-6">
          <img 
            src={profilePicUrl} 
            alt="Profile" 
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-500 mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800">Welcome, {user?.name}!</h2>
          <p className="text-gray-500">{user?.email}</p>
          <span className="text-sm bg-blue-100 text-blue-800 py-1 px-3 rounded-full mt-2 capitalize">
            {user?.role}
          </span>
        </div>

        {/* Update Form */}
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input 
              type="text" 
              className="w-full border rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea 
              className="w-full border rounded px-3 py-2"
              rows="3"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Profile Picture</label>
            <input 
              type="file" 
              accept="image/*"
              className="w-full text-sm"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          {message && (
            <p className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="w-full bg-red-50 text-red-600 py-2 rounded hover:bg-red-100 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;