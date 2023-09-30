import { API_URL } from "~/utils/variables";

export const useAuth = () => {
  const user = useState("user", () => null);
  const cookie = useCookie("access_token");
  const getProfile = async () => {
    if (user.value) return;
    const { data }: any = await useFetch(`${API_URL}/api/users/profile`, {
      ...(cookie.value && {
        headers: {
          authorization: "Bearer " + cookie.value,
        },
      }),
    }).catch(() => {
      user.value = null;
    });
    user.value = data.value?.result;
  };
  const login = async (loginData: { email: string; password: string }) => {
    const { data }: any = await useFetch(`${API_URL}/api/signIn`, {
      method: "POST",
      body: loginData,
    }).catch((error) => console.log(error));
    const { accessToken } = data.value.result;
    cookie.value = accessToken;
    await getProfile();
    if (user.value) await navigateTo("/dashboard");
  };
  const logout = async () => {
    cookie.value = null;
    window.location.reload();
  };
  return { user, login, getProfile, logout };
};
