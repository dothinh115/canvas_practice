export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user } = useAuth();
  if (user) return await navigateTo("/dashboard", { replace: true });
});