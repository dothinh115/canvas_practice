export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user } = useAuth();
  if (to.name === "dashboard" && !user.value)
    return await navigateTo("/login", { replace: true });
  if (to.name === "login" && user.value)
    return await navigateTo("/dashboard", { replace: true });
});
