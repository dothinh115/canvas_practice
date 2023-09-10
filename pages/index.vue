<template>
    <div class="mt-[100px]">
        <Bag :side="side" :image="image" @changeSide="changeSide" />
    </div>
    <div class="mt-[100px] w-1/4 mx-auto grid grid-cols-4 gap-3">
        <img src="/images/change_1.jpg" class="rounded-[12px] w-[122px] h-[92px] cursor-pointer" @click="changeImg" />
        <img src="/images/change_2.jpg" class="rounded-[12px] w-[122px] h-[92px] cursor-pointer" @click="changeImg" />
        <img src="/images/change_3.jpg" class="rounded-[12px] w-[122px] h-[92px] cursor-pointer" @click="changeImg" />
        <img src="/images/change_4.jpg" class="rounded-[12px] w-[122px] h-[92px] cursor-pointer" @click="changeImg" />
    </div>
</template>

<script setup lang="ts">
const side = ref<'front' | 'side'>('front');
const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (error) => reject(error);
        img.src = url;
    });
}
const image = reactive<{
    frontImg: HTMLImageElement | null,
    sideImg: HTMLImageElement | null
}>({
    frontImg: null,
    sideImg: null
})
const changeSide = (sideProps: 'front' | 'side') => side.value = sideProps;

const setDefaultImg = async () => {
    if (!image.frontImg) image.frontImg = await loadImage("/images/frontEditImg.png");
    if (!image.sideImg) image.sideImg = await loadImage("/images/sideEditImg.png");
}

const changeImg = async (event: MouseEvent) => {
    const target = event.target as HTMLImageElement;
    if (side.value === 'front')
        image.frontImg = await loadImage(target.src)

    if (side.value === 'side') image.sideImg = await loadImage(target.src)

}

onMounted(() => {
    setDefaultImg();
})
</script>