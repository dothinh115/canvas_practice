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
    },
    sizeBag: 'large' | 'small' | 'tiny'
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
const frontPath = ref("M129.902 135.548V532.767L448.931 487.986V104.429L129.902 135.548Z");
const sidePath = ref("M24.9748 493.161L108.9748 523.161V138.5L24.9748 108.5V493.161");

let customBag: (event: MouseEvent) => void;
const clearCanvas = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvasEl.value?.width!, canvasEl.value?.height!)
}
const getPositionOfImg = (img: HTMLImageElement, side: 'front' | 'side'): {
    x: number,
    y: number,
    width: number,
    height: number
} => {
    let sizeWidth: number = 0;
    let sizeHeight: number = 0
    let width: number = 0;
    let height: number = 0;
    let imgStartX: number = 0;
    let imgStartY: number = 0;
    if (side === "front") {
        switch (props.sizeBag) {
            case 'small': {
                sizeWidth = 405.334 - 170.375;
                sizeHeight = 505.5 - 135.5
                imgStartX = 170.375;
                imgStartY = 135.5;
                break;
            }
            case 'tiny': {
                sizeWidth = 377.214 - 198.382;
                sizeHeight = 456.673 - 198.186;
                imgStartX = 198.382;
                imgStartY = 198.186;
                break;
            }
            default: {
                sizeWidth = 448.931 - 129.902;
                sizeHeight = 532.767 - 135.548
                imgStartX = 129.902;
                imgStartY = 135.548;
                break;
            }
        }
    }
    else {
        switch (props.sizeBag) {
            case 'small': {
                sizeWidth = 150.9461 - 68.1252;
                sizeHeight = 497.658 - 157.658
                imgStartX = 68.1252;
                imgStartY = 140.658;
                break;
            }
            case 'tiny': {
                sizeWidth = 178.218 - 95.3972;
                sizeHeight = 442.505 - 195.505;
                imgStartX = 95.3972;
                imgStartY = 170.505;
                break;
            }
            default: {
                sizeWidth = 108.9748 - 24.9748;
                sizeHeight = 523.161 - 138.5
                imgStartX = 24.9748;
                imgStartY = 138.5;
                break;
            }
        }
    }
    img.width > sizeWidth ? width = sizeWidth : width = img.width;
    const ratio = img.width / img.height;
    height = width * 1 / ratio;
    if (side === 'front') {
        if (ratio > 1.5)
            height = width * 1 / ratio;
        else height = sizeHeight
    }
    else {
        if (props.sizeBag === 'tiny') {
            width = sizeWidth;
            height = sizeWidth;
        }
    }
    return {
        x: (sizeWidth - width) / 2 + imgStartX,
        y: (sizeHeight - height) / 2 + imgStartY,
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

const drawBag = async (ctx: CanvasRenderingContext2D) => {
    clearCanvas(ctx);
    switch (props.sizeBag) {
        case 'small': {
            ctx.lineWidth = 1;
            ctx.setLineDash([]);
            const a = new Path2D("M292.548 90.8876L413.848 126.992L160.544 150.539L57.0825 112.864L292.548 90.8876Z");
            ctx.fillStyle = "#969696";
            ctx.fill(a);

            const b = new Path2D("M292.548 121.498L413.848 126.992L160.544 150.539L57.0825 112.864L292.548 121.498Z");
            ctx.fillStyle = "#6F6F6F";
            ctx.fill(b);

            const c = new Path2D("M292.548 91.6725V137.981");
            ctx.strokeStyle = "#464646";
            ctx.stroke(c);

            const d = new Path2D("M127.261 53.2771L144.161 51.5565V144.486L127.261 146.125V53.2771Z");
            ctx.fillStyle = "#000";
            ctx.fill(d);

            const e = new Path2D("M127.261 53.2766L235.465 42.396L218.603 29.6146L144.052 35.6911L127.261 53.2766Z");
            ctx.fillStyle = "#000";
            ctx.fill(e);

            const f = new Path2D("M218.565 44.0792L235.465 42.3973V135.285L218.565 136.976L218.565 44.0792Z");
            ctx.fillStyle = "#000";
            ctx.fill(f);

            const g = new Path2D("M292.548 90.8876L413.848 126.992L160.544 150.539L57.0825 112.864L292.548 90.8876Z");
            ctx.strokeStyle = "#464646";
            ctx.lineJoin = "round";
            ctx.stroke(g);

            const h = new Path2D("M57.2964 112.842L160.758 150.516V510.385L57.2964 472.711V112.842Z");
            ctx.strokeStyle = "#464646";
            ctx.lineJoin = "round";
            ctx.fillStyle = "#E6E6E6";
            ctx.stroke(h);
            ctx.fill(h);


            const i = new Path2D(sidePath.value); //side
            ctx.strokeStyle = "#68341C";
            ctx.lineJoin = "round";
            ctx.fillStyle = "#D1D1D1";
            ctx.setLineDash([3, 3]);
            ctx.stroke(i);
            ctx.fill(i);
            ctx.save();
            ctx.clip(new Path2D(sidePath.value));
            await drawImg(ctx);
            ctx.restore();

            const j = new Path2D("M160.544 150.516L413.848 126.97V472.711L160.544 510.385V150.516Z");
            ctx.strokeStyle = "#464646";
            ctx.lineJoin = "round";
            ctx.fillStyle = "#fff";
            ctx.setLineDash([]);
            ctx.stroke(j);
            ctx.fill(j);

            const k = new Path2D(frontPath.value); //front
            ctx.strokeStyle = "#68341C";
            ctx.lineJoin = "round";
            ctx.fillStyle = "#fff";
            ctx.setLineDash([3, 3]);
            ctx.stroke(k);
            ctx.fill(k);
            ctx.save();
            ctx.clip(new Path2D(frontPath.value));
            await drawImg(ctx);
            ctx.restore();

            const l = new Path2D("M237.249 76.1487L254.149 74.4281V143.027L237.249 144.665V76.1487Z");
            ctx.fillStyle = "#000";
            ctx.fill(l);

            const m = new Path2D("M237.249 76.1482L345.453 65.2676L328.591 52.4862L254.04 58.5627L237.249 76.1482Z");
            ctx.fillStyle = "#000";
            ctx.fill(m);

            const n = new Path2D("M328.553 66.9507L345.453 65.2689V134.61L328.553 136.301L328.553 66.9507Z");
            ctx.fillStyle = "#000";
            ctx.fill(n);

            const o = new Path2D("M160.544 150.516L157.453 149.39V505.929L60.1982 470.955V113.976L57.4709 112.983H57.0825V472.711L160.544 510.385L160.544 510.174H161.962L163.684 509.918L163.684 150.224L160.544 150.516ZM413.848 126.97V471.459H410.708L410.708 127.261L413.848 126.97Z");
            ctx.fillStyle = "#464646";
            ctx.fill(o);

            //side chosen
            let stroke: Path2D = new Path2D(props.side === 'front' ? "M165.375 506.593L409.334 470.5V130.5L165.375 155Z" : "M64.1252 470.631L154.9461 503.658V153.658L64.1252 121.658Z");
            ctx.strokeStyle = "#13bac1";
            ctx.lineWidth = 3;
            ctx.setLineDash([]);
            ctx.stroke(stroke);
            break;
        }
        case 'tiny': {
            ctx.lineWidth = 1;
            ctx.setLineDash([]);
            const a = new Path2D("M265.609 135.371L386.909 171.476L188.372 189.988L84.9097 152.314L265.609 135.371Z");
            ctx.fillStyle = "#969696";
            ctx.fill(a);

            const b = new Path2D("M386.933 171.477L188.372 189.988L84.9097 152.313L386.933 171.477Z");
            ctx.fillStyle = "#6F6F6F";
            ctx.fill(b);

            const c = new Path2D("M265.076 135.367V181.675");
            ctx.strokeStyle = "#464646";
            ctx.stroke(c);

            const d = new Path2D("M265.599 135.367L386.899 171.472L188.194 190.345L84.7319 152.671L265.599 135.367Z");
            ctx.strokeStyle = "#464646";
            ctx.lineJoin = 'round';
            ctx.stroke(d);

            const e = new Path2D("M136.237 106.912L153.137 105.192V191.842L136.237 193.481V106.912Z");
            ctx.fillStyle = "#000";
            ctx.fill(e);

            const f = new Path2D("M136.237 106.911L226.915 97.5488L210.053 84.7675L153.028 89.3258L136.237 106.911Z");
            ctx.fillStyle = "#000";
            ctx.fill(f);

            const g = new Path2D("M210.013 99.2259L226.913 97.5441V182.583L210.013 184.274L210.013 99.2259Z");
            ctx.fillStyle = "#000";
            ctx.fill(g);


            const h = new Path2D("M84.5684 152.286L188.03 189.96V455.232L84.5684 417.558L84.5684 152.286Z");
            ctx.fillStyle = "#E6E6E6";
            ctx.strokeStyle = "#464646";
            ctx.lineJoin = 'round';
            ctx.fill(h);
            ctx.stroke(h);


            const i = new Path2D(sidePath.value); //side
            ctx.fillStyle = "#D1D1D1";
            ctx.strokeStyle = "#68341C";
            ctx.lineJoin = 'round';
            ctx.setLineDash([3, 3]);
            ctx.fill(i);
            ctx.stroke(i);
            ctx.save();
            ctx.clip(new Path2D(sidePath.value));
            await drawImg(ctx);
            ctx.restore();

            const j = new Path2D("M244.158 127.704L261.058 125.983V184.378L244.158 186.017V127.704Z");
            ctx.fillStyle = "#000";
            ctx.fill(j);

            const k = new Path2D("M244.158 127.703L334.836 118.341L317.974 105.559L260.949 110.118L244.158 127.703Z");
            ctx.fillStyle = "#000";
            ctx.fill(k);

            const l = new Path2D("M317.934 120.018L334.834 118.336V176.689L317.934 178.38L317.934 120.018Z");
            ctx.fillStyle = "#000";
            ctx.fill(l);

            const m = new Path2D("M188.03 189.949L386.565 171.477V426.109L188.03 455.233V189.949Z");
            ctx.fillStyle = "#fff";
            ctx.strokeStyle = "#464646";
            ctx.lineJoin = 'round';
            ctx.setLineDash([]);
            ctx.fill(m);
            ctx.stroke(m);

            const n = new Path2D(frontPath.value); //front
            ctx.fillStyle = "#fff";
            ctx.strokeStyle = "#68341C";
            ctx.lineJoin = 'round';
            ctx.setLineDash([3, 3]);
            ctx.fill(n);
            ctx.stroke(n);
            ctx.save();
            ctx.clip(new Path2D(frontPath.value));
            await drawImg(ctx);
            ctx.restore();

            const o = new Path2D("M87.7079 415.36V153.429L84.5684 152.286V417.558L188.03 455.232V189.96L184.891 188.817V450.748L87.7079 415.36ZM386.566 426.109L383.426 426.569L383.426 171.769L386.566 171.477V426.109ZM188.03 455.233L191.17 454.772L191.17 189.657L188.03 189.949V455.233Z");
            ctx.fillStyle = "#000";
            ctx.fill(o);

            //side chosen
            let stroke: Path2D = new Path2D(props.side === 'front' ? "M192.382 191.186V452.673L382.214 425V173.71Z" : "M88.3972 415.478L183.218 449.505V190.505L88.3972 155.505Z");
            ctx.strokeStyle = "#13bac1";
            ctx.lineWidth = 3;
            ctx.setLineDash([]);
            ctx.stroke(stroke);

            break;
        }
        default: {
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
            const i = new Path2D(sidePath.value);
            ctx.fillStyle = '#D1D1D1';
            ctx.strokeStyle = "#68341C";
            ctx.lineJoin = "round";
            ctx.setLineDash([3, 3])
            ctx.fill(i);
            ctx.stroke(i);
            ctx.save();
            ctx.clip(new Path2D(sidePath.value));
            await drawImg(ctx);
            ctx.restore();
            const j = new Path2D("M120.328 131.172L458.506 98.9916V491.826L120.328 538.134V131.172Z");
            ctx.fillStyle = '#fff';
            ctx.strokeStyle = "#464646";
            ctx.lineJoin = "round";
            ctx.setLineDash([]);
            ctx.fill(j);
            ctx.stroke(j);
            const k = new Path2D(frontPath.value);
            ctx.fillStyle = '#fff';
            ctx.strokeStyle = "#68341C";
            ctx.lineJoin = "round";
            ctx.setLineDash([3, 3]);
            ctx.fill(k);
            ctx.stroke(k);
            ctx.save();
            ctx.clip(new Path2D(frontPath.value));
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
            break;
        }
    }
}

watchEffect(() => {
    ctx = canvasEl.value?.getContext("2d");
    switch (props.sizeBag) {
        case 'small': {
            frontPath.value = "M170.375 501.593L405.334 465.5V135.5L170.375 160Z";
            sidePath.value = "M68.1252 466.631L150.9461 497.658V157.658L68.1252 127.658Z";
            break;
        }
        case 'tiny': {
            frontPath.value = "M198.382 198.186V446.673L377.214 419V179.71Z";
            sidePath.value = "M95.3972 411.478L178.218 442.505V195.505L95.3972 165.505Z";
            break;
        }
        default: {
            frontPath.value = "M129.902 135.548V532.767L448.931 487.986V104.429L129.902 135.548Z";
            sidePath.value = "M24.9748 493.161L108.9748 523.161V138.5L24.9748 108.5V493.161";
            break;
        }
    }
    if (ctx) drawBag(ctx)
})


watch(() => props.side, () => {
    ctx = canvasEl.value?.getContext("2d");
    if (ctx) drawBag(ctx);
});

onMounted(() => {
    ctx = canvasEl.value?.getContext("2d");
    customBag = (event: MouseEvent) => {
        const chosenFrontPath = new Path2D(frontPath.value);
        const chosenSidePath = new Path2D(sidePath.value);
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