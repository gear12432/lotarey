import { useAuth } from '../context/AuthContext';

export function useUserProfile() {
  const { userProfile, loading, updateProfileData } = useAuth();
  return {
    profile: userProfile,
    loading,
    updateProfile: updateProfileData
  };
}
