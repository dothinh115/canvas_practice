<template>
  <div>
    <h1 class="text-[40px] text-white">ĐÂY LÀ DASHBOARD ĐƯỢC PROTECT</h1>
    <button
      class="rounded-[6px] bg-slate-700 p-2 text-white"
      @click="handleSignOut"
    >
      Đăng xuất
    </button>
  </div>
</template>
<script setup lang="ts">
const { user } = useAuth();
const handleSignOut = () => {
  const cookie = useCookie("access_token");
  user.value = null;
  cookie.value = "";
  window.location.reload();
};
definePageMeta({
  middleware: "auth",
});
</script>
