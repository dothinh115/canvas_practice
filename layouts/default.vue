<template>
  <main>

    <div class="bg-slate-900 w-screen h-screen max-w-screen max-h-screen overflow-hidden">
      <div class="px-6 pt-4">
        <div class="p-2 rounded-[12px] bg-white">
          <ul class="h-[40px] space-x-4 flex">
            <li class="w-[100px] flex items-center justify-center h-full bg-slate-200 rounded-[12px]">
              <NuxtLink :to="'/'" class="block w-full h-full flex items-center justify-center">Index</NuxtLink>
            </li>
            <li class="w-[100px] flex items-center justify-center h-full bg-slate-200 rounded-[12px]" v-if="!user">
              <NuxtLink :to="'/login'" class="block w-full h-full flex items-center justify-center">Login</NuxtLink>
            </li>
            <li class="w-[100px] flex items-center justify-center h-full bg-slate-200 rounded-[12px]" v-else>
              <NuxtLink :to="'/dashboard'" class="block w-full h-full flex items-center justify-center">Dash Board
              </NuxtLink>
            </li>
            <li class="w-[100px] flex items-center justify-center h-full bg-slate-200 rounded-[12px]" v-if="user">
              <button class="block w-full h-full flex items-center justify-center" @click="logout">Đăng xuất
              </button>
            </li>
          </ul>
        </div>
      </div>


      <NuxtPage />
    </div>
  </main>
</template>
<script setup lang="ts">
const { user, logout } = useAuth();
</script>