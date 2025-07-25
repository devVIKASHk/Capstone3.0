import React from 'react';
import { useGlobalContext } from '../../component/globalContext/GlobalProvider';
import { MdEdit, MdVerified, MdEmail, MdPerson, MdCalendarToday, MdSettings, MdSecurity } from "react-icons/md";
import { FaUser, FaChartLine, FaTrophy, FaFire, FaSave, FaTimes } from "react-icons/fa";
import { GiMuscleUp, GiRunningNinja } from "react-icons/gi";

const Profile = () => {
  const { handleMessage } = useGlobalContext();
  
  // Mock user data - replace with actual API call
  const [userData, setUserData] = React.useState({
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    isEmailVerified: true,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T15:45:00Z"
  });

  const [isEditing, setIsEditing] = React.useState(false);
  const [editData, setEditData] = React.useState({
    name: userData.name,
    email: userData.email
  });

  // Mock stats data
  const [userStats] = React.useState({
    totalChallenges: 45,
    completedChallenges: 32,
    currentStreak: 7,
    totalWorkouts: 128,
    favoriteCategory: "Upper Arms",
    joinedDaysAgo: Math.floor((new Date() - new Date(userData.createdAt)) / (1000 * 60 * 60 * 24))
  });

  const handleEditToggle = () => {
    if (isEditing) {
      setEditData({
        name: userData.name,
        email: userData.email
      });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      // Here you would make an API call to update the user profile
      // const response = await fetch('/api/user/update', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(editData),
      //   credentials: 'include'
      // });
      
      // For now, just update local state
      setUserData(prev => ({
        ...prev,
        name: editData.name,
        email: editData.email,
        updatedAt: new Date().toISOString()
      }));
      
      setIsEditing(false);
      handleMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      handleMessage("Failed to update profile. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const statsCards = [
    {
      icon: <GiRunningNinja className="text-3xl" />,
      title: "Total Challenges",
      value: userStats.totalChallenges,
      color: "from-fuchsia-600 to-purple-600"
    },
    {
      icon: <FaTrophy className="text-3xl" />,
      title: "Completed",
      value: userStats.completedChallenges,
      color: "from-purple-600 to-pink-600"
    },
    {
      icon: <FaFire className="text-3xl" />,
      title: "Current Streak",
      value: `${userStats.currentStreak} days`,
      color: "from-pink-600 to-fuchsia-600"
    },
    {
      icon: <GiMuscleUp className="text-3xl" />,
      title: "Total Workouts",
      value: userStats.totalWorkouts,
      color: "from-fuchsia-600 to-purple-600"
    }
  ];

  return (
    <div className="min-h-screen text-white px-5 py-8" style={{ backgroundColor: '#0F172A' }}>
      <div className="max-w-6xl mx-auto">
        
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl border border-fuchsia-500/20 p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            
            {/* Avatar Section */}
            <div className="relative">
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-fuchsia-600 via-purple-500 to-pink-500 flex items-center justify-center text-6xl lg:text-7xl font-bold">
                {userData.name.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-full p-2">
                <FaUser className="text-white text-xl" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleInputChange}
                      className="text-3xl lg:text-4xl font-heading font-bold bg-transparent border-b-2 border-fuchsia-500 focus:outline-none focus:border-purple-500 text-white mb-2"
                    />
                  ) : (
                    <h1 className="text-3xl lg:text-4xl font-heading font-bold bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                      {userData.name}
                    </h1>
                  )}
                  
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleInputChange}
                        className="text-lg text-gray-300 bg-transparent border-b border-fuchsia-500 focus:outline-none focus:border-purple-500"
                      />
                    ) : (
                      <>
                        <MdEmail className="text-fuchsia-500" />
                        <span className="text-lg text-gray-300">{userData.email}</span>
                      </>
                    )}
                    {userData.isEmailVerified && (
                      <MdVerified className="text-green-500 text-xl" title="Verified Email" />
                    )}
                  </div>
                </div>

                {/* Edit Button */}
                <div className="flex gap-3 mt-4 lg:mt-0">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSaveProfile}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 rounded-lg hover:scale-105 transition-all duration-300"
                      >
                        <FaSave /> Save
                      </button>
                      <button
                        onClick={handleEditToggle}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 rounded-lg hover:scale-105 transition-all duration-300"
                      >
                        <FaTimes /> Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleEditToggle}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-fuchsia-600 via-purple-500 to-pink-500 rounded-lg hover:scale-105 transition-all duration-300"
                    >
                      <MdEdit /> Edit Profile
                    </button>
                  )}
                </div>
              </div>

              {/* Member Info */}
              <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <MdCalendarToday className="text-fuchsia-500" />
                  <span>Member since {formatDate(userData.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdPerson className="text-purple-500" />
                  <span>Active for {userStats.joinedDaysAgo} days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl border border-fuchsia-500/20 p-6 hover:border-fuchsia-500/40 transition-all duration-300 hover:scale-105"
            >
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${stat.color} mb-4`}>
                {stat.icon}
              </div>
              <h3 className="text-2xl lg:text-3xl font-number font-bold text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-400 text-sm font-para">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Profile Details & Settings */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Account Information */}
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl border border-fuchsia-500/20 p-6">
            <h2 className="text-2xl font-heading font-bold text-fuchsia-400 mb-6 flex items-center gap-2">
              <MdPerson /> Account Information
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-400">User ID</span>
                <span className="font-number text-purple-400">#{userData.id.toString().padStart(6, '0')}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-400">Email Status</span>
                <span className={`flex items-center gap-2 ${userData.isEmailVerified ? 'text-green-400' : 'text-red-400'}`}>
                  <MdVerified />
                  {userData.isEmailVerified ? 'Verified' : 'Unverified'}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-400">Last Updated</span>
                <span className="text-gray-300">{formatDate(userData.updatedAt)}</span>
              </div>
              
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-400">Favorite Category</span>
                <span className="text-fuchsia-400 font-semibold">{userStats.favoriteCategory}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl border border-fuchsia-500/20 p-6">
            <h2 className="text-2xl font-heading font-bold text-fuchsia-400 mb-6 flex items-center gap-2">
              <MdSettings /> Quick Actions
            </h2>
            
            <div className="space-y-4">
              <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-fuchsia-600/20 to-purple-600/20 border border-fuchsia-500/30 rounded-lg hover:border-fuchsia-500/50 transition-all duration-300">
                <FaChartLine className="text-fuchsia-500" />
                <span>View Progress Analytics</span>
              </button>
              
              <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg hover:border-purple-500/50 transition-all duration-300">
                <MdSecurity className="text-purple-500" />
                <span>Security Settings</span>
              </button>
              
              <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-pink-600/20 to-fuchsia-600/20 border border-pink-500/30 rounded-lg hover:border-pink-500/50 transition-all duration-300">
                <FaTrophy className="text-pink-500" />
                <span>View Achievements</span>
              </button>
            </div>
          </div>
        </div>

        {/* Achievement Preview */}
        <div className="mt-8 bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl border border-fuchsia-500/20 p-6">
          <h2 className="text-2xl font-heading font-bold text-fuchsia-400 mb-6 flex items-center gap-2">
            <FaTrophy /> Recent Achievements
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-lg">
              <FaTrophy className="text-yellow-500 text-2xl" />
              <div>
                <h3 className="font-semibold text-yellow-400">Week Warrior</h3>
                <p className="text-sm text-gray-400">7-day streak completed</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-lg">
              <GiMuscleUp className="text-green-500 text-2xl" />
              <div>
                <h3 className="font-semibold text-green-400">Strength Builder</h3>
                <p className="text-sm text-gray-400">50 strength exercises</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-lg">
              <GiRunningNinja className="text-blue-500 text-2xl" />
              <div>
                <h3 className="font-semibold text-blue-400">Challenge Master</h3>
                <p className="text-sm text-gray-400">25 challenges completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;








































