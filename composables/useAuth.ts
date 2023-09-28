import { useAuthStore } from "~/store/auth";
export const useAuth = () => {
  const auth = useAuthStore();
  return { user: auth.user, getProfile: auth.getProfile, login: auth.login };
};
