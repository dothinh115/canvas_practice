<template>
    <div class="relative text-[13px] text-[#872825] font-medium">
        <div class="flex items-center justify-between rounded-[8px] py-2 px-4 border-2 border-[#68341C] cursor-pointer"
            v-click-out-side="clickOutSide" @click="isSelecting = !isSelecting">
            <input type="text" readonly class=" outline-none cursor-pointer" :value="selectedSize" />
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M4.79289 8.54277C5.18342 8.15225 5.81658 8.15225 6.20711 8.54277L12 14.3357L17.7929 8.54277C18.1834 8.15224 18.8166 8.15224 19.2071 8.54277C19.5976 8.93329 19.5976 9.56646 19.2071 9.95698L13.4142 15.7499C12.6332 16.5309 11.3668 16.5309 10.5858 15.7499L4.79289 9.95698C4.40237 9.56646 4.40237 8.9333 4.79289 8.54277Z"
                    fill="#872825" />
            </svg>

        </div>
        <ul class="absolute rounded-[8px] border-2 border-[#68341C] top-[calc(100%+8px)] left-0 w-full"
            v-show="isSelecting">
            <li class="cursor-pointer py-2 px-4 hover:bg-[#68341C] hover:text-white" @click="changeSizebag(item.value)"
                v-for="(item, index) in sizeBagArr" :key="index">{{ item.title }}</li>
        </ul>
    </div>
</template>
<script setup lang="ts">
interface ISizeBag {
    sizeBagArr: {
        title: string,
        value: string
    }[],
    sizeBag: string
}
const props = defineProps<ISizeBag>();
const isSelecting = ref(false);
const clickOutSide = () => isSelecting.value = false;
const emit = defineEmits(['changeSizeBag']);
const selectedSize = computed(() => props.sizeBagArr.filter((item) => item.value === props.sizeBag)[0].title);
const changeSizebag = (size: string) => {
    emit('changeSizeBag', size);
}
</script>