<template>
  <main>
    <div class="p-4 rounded-[12px] bg-white w-[350px]">
      <form class="space-y-3" @submit.prevent="handleSubmitLogin">
        <h1 class="text-[32px]">Đăng nhập</h1>
        <div class="h-[1px] bg-slate-200"></div>
        <div class="space-y-2">
          <h2 class="text-[14px]">Email</h2>
          <input
            type="text"
            class="p-2 border border-slate-400 rounded-[6px] w-full outline-none"
            v-model.trim="loginForm.email"
          />
        </div>
        <div class="space-y-2">
          <h2 class="text-[14px]">Mật khẩu</h2>
          <input
            type="password"
            class="p-2 border border-slate-400 rounded-[6px] w-full outline-none"
            v-model.trim="loginForm.password"
          />
        </div>

        <div class="flex justify-end">
          <button
            class="rounded-[6px] bg-slate-600 text-white p-2 hover:bg-slate-800"
          >
            Đăng nhập
          </button>
        </div>
      </form>
    </div>
  </main>
</template>
<script setup lang="ts">
const { login } = useAuth();
interface ILoginForm {
  email: string;
  password: string;
}
const loginForm = ref<ILoginForm>({
  email: "",
  password: "",
});

const handleSubmitLogin = async () => {
  try {
    await login(loginForm.value);
    await navigateTo("/dashboard");
  } catch (error) {}
};
definePageMeta({
  middleware: "user",
});
</script>
