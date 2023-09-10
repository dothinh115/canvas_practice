<template>
    <div class="mt-[100px]">
        <Bag :side="side" :image="image" @changeSide="changeSide" />
    </div>
    <input type="file" class="hidden" ref="inputFile" @change="fileUpload" />
    <div class="mt-[100px] w-1/4 mx-auto grid grid-cols-4 gap-3">
        <img src="/images/imgUpload.png" class="w-[92px] h-[92px] cursor-pointer object-cover" @click="uploadFile" />
        <img :src="item" class="rounded-[12px] w-[92px] h-[92px] cursor-pointer object-cover" @click="changeImg"
            v-for="(item, index) in uploadedImg" :key="index" />
    </div>
</template>

<script setup lang="ts">
const side = ref<'front' | 'side'>('front');
const inputFile = ref<HTMLInputElement | null>(null);
const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (error) => reject(error);
        img.style.objectFit = "cover";
        img.src = url;
    });
}
const image = reactive<{
    frontImg: HTMLImageElement | null,
    sideImg: HTMLImageElement | null
}>({
    frontImg: null,
    sideImg: null
});
const uploadedImg = ref<string[]>(["/images/change_1.jpg", "/images/change_2.jpg", "/images/change_3.jpg", "/images/change_4.jpg"]);
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

const uploadFile = () => inputFile.value?.click();
const fileUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files![0]
    const fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = async () => {
        const img = fileReader?.result as string;
        uploadedImg.value = [img, ...uploadedImg.value,];
        if (side.value === 'front')
            image.frontImg = await loadImage(img)
        if (side.value === 'side') image.sideImg = await loadImage(img)
    }
}

onMounted(() => {
    setDefaultImg();
})

</script>