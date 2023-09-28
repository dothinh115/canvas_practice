import { defineStore } from "pinia";
import { API_URL } from "~/utils/variables";

export const useAuthStore = defineStore("auth", () => {
  const user = ref();
  const cookie = useCookie("access_token");
  const getProfile = async () => {
    if (user.value) return;
    try {
      const { data }: any = await useFetch(`${API_URL}/api/users/profile`, {
        ...(cookie.value && {
          headers: {
            authorization: "Bearer " + cookie.value,
          },
        }),
      });
      user.value = data.value?.result;
    } catch (error) {
      console.log(error);
    }
  };
  const login = async (loginData: { email: string; password: string }) => {
    try {
      const { data }: any = await useFetch(`${API_URL}/api/signIn`, {
        method: "POST",
        body: loginData,
      });
      const { accessToken } = data.value.result;
      cookie.value = accessToken;
      await getProfile();
    } catch (error) {
      console.log(error);
    }
  };
  return { user, getProfile, login };
});
