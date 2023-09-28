<template>
  <div class="mt-8 max-w-[600px] mx-auto flex justify-end">
    <Select
      @changeSizeBag="handleChangeSizeBag"
      :sizeBagArr="sizeBagArr"
      :sizeBag="sizeBag"
    />
  </div>
  <div class="mt-[120px]">
    <Bag
      :side="side"
      :image="image"
      @changeSide="changeSide"
      :sizeBag="sizeBag"
    />
  </div>
  <input type="file" class="hidden" ref="inputFile" @change="fileUpload" />
  <div
    class="mt-[100px] max-w-[400px] lg:w-1/2 md:w-1/2 w-full mx-auto grid md:grid-cols-4 grid-cols-2 md:gap-3 gap-1"
  >
    <img
      src="/images/imgUpload.png"
      class="md:w-[92px] md:h-[92px] w-[150px] h-[150px] cursor-pointer object-cover mx-auto border-[3px] border-transparent"
      @click="uploadFile"
    />
    <img
      :src="item"
      class="rounded-[12px] md:w-[92px] md:h-[92px] w-[150px] h-[150px] cursor-pointer object-cover mx-auto border-[3px] border-transparent"
      :class="{
        active:
          side === 'front'
            ? image.frontImg?.src.includes(item)
            : image.sideImg?.src.includes(item),
      }"
      @click="changeImg"
      v-for="(item, index) in uploadedImg"
      :key="index"
    />
  </div>
</template>

<script setup lang="ts">
const side = ref<"front" | "side" | null>("front");
const sizeBagArr = [
  {
    title: "Large(17x15x7 inches)",
    value: "large",
  },
  {
    title: "Small(15x12x7 inches)",
    value: "small",
  },
  {
    title: "Tiny(11x9x7 inches)",
    value: "tiny",
  },
];
const sizeBag = ref<"large" | "small" | "tiny">("large");
const inputFile = ref<HTMLInputElement | null>(null);
const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.style.objectFit = "cover";
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
  });
};
const image = reactive<{
  frontImg: HTMLImageElement | null;
  sideImg: HTMLImageElement | null;
}>({
  frontImg: null,
  sideImg: null,
});
const uploadedImg = ref<string[]>([
  "/images/change_1.jpg",
  "/images/change_2.jpg",
  "/images/change_3.jpg",
  "/images/change_4.jpg",
]);
const changeSide = (sideProps: "front" | "side") => (side.value = sideProps);

const setDefaultImg = async () => {
  if (!image.frontImg)
    image.frontImg = await loadImage("/images/frontEditImg.png");
  if (!image.sideImg)
    image.sideImg = await loadImage("/images/sideEditImg.png");
};

const changeImg = async (event: MouseEvent) => {
  const target = event.target as HTMLImageElement;
  if (side.value === "front") image.frontImg = await loadImage(target.src);
  if (side.value === "side") image.sideImg = await loadImage(target.src);
};

const uploadFile = () => inputFile.value?.click();
const fileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files![0];
  const fileReader: FileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = async () => {
    const img = fileReader?.result as string;
    uploadedImg.value = [img, ...uploadedImg.value];
    if (side.value === "front") image.frontImg = await loadImage(img);
    if (side.value === "side") image.sideImg = await loadImage(img);
  };
};

const handleChangeSizeBag = (size: "large" | "small" | "tiny") =>
  (sizeBag.value = size);

onBeforeMount(() => {
  setDefaultImg();
});
</script>
<style lang="scss">
.active {
  border: 3px solid #13bac1;
}
</style>
