export default defineNuxtPlugin(async () => {
  const { getProfile } = useAuth();
  await getProfile();
});
