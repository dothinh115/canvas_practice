export default defineNuxtPlugin({
  name: "get-profile",
  enforce: "pre",
  async setup() {
    const { getProfile } = useAuth();
    await getProfile();
  },
});
