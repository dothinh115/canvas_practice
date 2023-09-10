<template>
    <canvas ref="canvasEl" width="471" height="540" class="mx-auto md:w-[471px] md:h-[540px] w-full h-full"
        @click="customBag">
        Trình duyệt ko support
    </canvas>
</template>
<script setup lang="ts">
interface IProps {
    side: 'front' | 'side',
    image: {
        frontImg: HTMLImageElement | null,
        sideImg: HTMLImageElement | null,
    }
}
const props = defineProps<IProps>();
const emit = defineEmits(["changeSide"]);
const canvasEl = ref<HTMLCanvasElement | null>(null);

const getMousePos = (event: MouseEvent): {
    x: number,
    y: number
} => {
    const x = event.offsetX;
    const y = event.offsetY;
    return { x, y }
}

let ctx: CanvasRenderingContext2D | null | undefined;
const frontPath = "M129.902 135.548V532.767L448.931 487.986V104.429L129.902 135.548Z";
const sidePath = "M24.9748 493.161L108.9748 523.161V138.5L24.9748 108.5V493.161";
let customBag: (event: MouseEvent) => void;
const drawBag = async (ctx: CanvasRenderingContext2D) => {
    clearCanvas(ctx);
    ctx.lineWidth = 1;
    const a = new Path2D("M332.154 63.2695L458.506 99.3742L120.328 131.162L12.5566 93.488L332.154 63.2695Z");
    ctx.fillStyle = '#969696';
    ctx.fill(a);

    const b = new Path2D("M458.497 99.3866L120.328 131.165L12.5566 93.4904L458.497 99.3866Z");
    ctx.fillStyle = '#6F6F6F';
    ctx.fill(b);

    const c = new Path2D("M331.932 64.1616V110.47");
    ctx.strokeStyle = '#464646';
    ctx.stroke(c);

    const d = new Path2D("M332.161 63.2664L458.513 99.371L120.328 131.165L12.5566 93.4905L332.161 63.2664Z");
    ctx.strokeStyle = '#464646';
    ctx.lineJoin = "round";
    ctx.stroke(d)

    const e = new Path2D("M120.504 29.2486L138.108 27.528V121.243L120.504 122.881V29.2486Z");
    ctx.fillStyle = '#000';
    ctx.fill(e);

    const f = new Path2D("M120.504 29.2589L261.368 15.136L243.804 2.35464L137.995 11.6734L120.504 29.2589Z");
    ctx.fillStyle = '#000';
    ctx.fill(f);

    const g = new Path2D("M243.764 16.8192L261.368 15.1374V108.025L243.764 109.716L243.764 16.8192Z");
    ctx.fillStyle = '#000';
    ctx.fill(g);

    const h = new Path2D("M12.5566 93.4977L120.328 131.172V538.134L12.5566 500.46V93.4977Z");
    ctx.fillStyle = '#E6E6E6';
    ctx.strokeStyle = "#464646";
    ctx.lineJoin = "round";
    ctx.fill(h);
    ctx.stroke(h)

    const i = new Path2D(sidePath);
    ctx.fillStyle = '#D1D1D1';
    ctx.strokeStyle = "#68341C";
    ctx.lineJoin = "round";
    ctx.setLineDash([3, 3])
    ctx.fill(i);
    ctx.stroke(i);
    ctx.save();
    ctx.clip(new Path2D(sidePath));
    await drawImg(ctx);
    ctx.restore();


    const j = new Path2D("M120.328 131.172L458.506 98.9916V491.826L120.328 538.134V131.172Z");
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = "#464646";
    ctx.lineJoin = "round";
    ctx.setLineDash([]);
    ctx.fill(j);
    ctx.stroke(j);

    const k = new Path2D(frontPath);
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = "#68341C";
    ctx.lineJoin = "round";
    ctx.setLineDash([3, 3]);
    ctx.fill(k);
    ctx.stroke(k);
    ctx.save();
    ctx.clip(new Path2D(frontPath));
    drawImg(ctx);
    ctx.restore();

    const l = new Path2D("M218.985 44.161L236.589 42.4404V120.457L218.985 122.096V44.161Z");
    ctx.fillStyle = '#000';
    ctx.fill(l);

    const m = new Path2D("M218.985 44.1713L359.848 30.0484L342.284 17.2671L236.475 26.5858L218.985 44.1713Z");
    ctx.fillStyle = '#000';
    ctx.fill(m);

    const n = new Path2D("M342.245 31.7316L359.849 30.0498V109.595L342.245 111.286L342.245 31.7316Z");
    ctx.fillStyle = '#000';
    ctx.fill(n);

    const o = new Path2D("M120.399 131.161L115.719 129.525V531.498L17.2659 496.998V95.1105L12.6521 93.4977H12.6279V500.424L120.324 538.07V538.132L125.138 537.473V130.74L120.399 131.19V131.161ZM458.502 491.827V99.4786H453.804V491.893L458.02 491.893L458.502 491.827Z");
    ctx.fillStyle = '#464646';
    ctx.fill(o);

    //side chosen
    let stroke: Path2D = new Path2D(props.side === 'front' ? "M126.902 135.548V536.767L452.931 490.986V100.429L126.902 131.548Z" : "M20.9748 497.161L112.9748 529.161V136.5L20.9748 103.5V497.161");
    ctx.strokeStyle = "#13bac1";
    ctx.lineWidth = 3;
    ctx.setLineDash([]);
    ctx.stroke(stroke);
}
const clearCanvas = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvasEl.value?.width!, canvasEl.value?.height!)
}

const getPositionOfImg = (img: HTMLImageElement, side: 'front' | 'side'): {
    x: number,
    y: number,
    width: number,
    height: number
} => {
    let sizeWidth: number;
    let sizeHeight: number;
    let width: number = 0;
    let height: number = 0;
    if (side === "front") {
        sizeWidth = 448.931 - 129.902;
        sizeHeight = 532.767 - 135.548
    }
    else {
        sizeWidth = 108.9748 - 24.9748;
        sizeHeight = 523.161 - 138.5
    }
    img.width > sizeWidth ? width = sizeWidth : width = img.width;
    const ratio = img.width / img.height;
    height = width * 1 / ratio;
    if (side === "front") img.height > sizeHeight ? height = sizeHeight : height = img.height;
    return {
        x: (sizeWidth - width) / 2 + (side === "front" ? 129.902 : 24.9748),
        y: (sizeHeight - height) / 2 + (side === "front" ? 135.548 : 138.5),
        width,
        height
    }
}

const drawImg = async (ctx: CanvasRenderingContext2D) => {
    if (!props.image.frontImg || !props.image.sideImg) return;
    const frontImgPos = getPositionOfImg(props.image.frontImg, 'front');
    ctx.transform(1, -0.09, 0, 1, 0, 9);
    ctx.drawImage(props.image.frontImg, frontImgPos.x, frontImgPos.y, frontImgPos.width, frontImgPos.height)

    const sideImgPos = getPositionOfImg(props.image.sideImg, 'side');
    ctx.transform(1, 0.44, 0, 1, 0, -48);
    ctx.drawImage(props.image.sideImg, sideImgPos.x, sideImgPos.y, sideImgPos.width, sideImgPos.height);
}

watchEffect(() => {
    ctx = canvasEl.value?.getContext("2d");
    if (ctx) drawBag(ctx);
})


watch(() => props.side, () => {
    ctx = canvasEl.value?.getContext("2d");
    if (ctx) drawBag(ctx);
});

onMounted(() => {
    ctx = canvasEl.value?.getContext("2d");
    const chosenFrontPath = new Path2D(frontPath);
    const chosenSidePath = new Path2D(sidePath);
    customBag = (event: MouseEvent) => {
        if (!ctx) return;
        const mouse = getMousePos(event);
        const isInFrontPath = ctx.isPointInPath(chosenFrontPath, mouse.x, mouse.y);
        const isInSidePath = ctx.isPointInPath(chosenSidePath, mouse.x, mouse.y);
        if (isInFrontPath) { emit("changeSide", "front"); }
        if (isInSidePath) emit("changeSide", "side");
    }
    if (ctx) drawBag(ctx);

});
</script>