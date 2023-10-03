export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user, getProfile } = useAuth();
  const token = useCookie("access_token");
  if (token.value && !user.value) {
    await getProfile();
    if (!user.value) token.value = null;
  }
  if (to.name === "dashboard" && !user.value)
    return await navigateTo("/login", { replace: true });
  if (to.name === "login" && user.value)
    return await navigateTo("/dashboard", { replace: true });
});
