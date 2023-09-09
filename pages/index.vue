<template>
    <div class="mx-8 mt-[100px]">
        <canvas ref="canvasEl" width="471" height="540" class="mx-auto" @click="customBag">
            Trình duyệt ko support
        </canvas>
    </div>
</template>
<script setup lang="ts">
const canvasEl = ref<HTMLCanvasElement | null>(null);
const side = ref<'front' | 'side'>('front');
const getMousePos = (event: MouseEvent): {
    x: number,
    y: number
} => {
    const x = event.offsetX;
    const y = event.offsetY;
    return { x, y }
}

let customBag: (arg: MouseEvent) => void;

onMounted(() => {
    const ctx = canvasEl.value?.getContext("2d");
    const chosenFrontPath = new Path2D("M129.902 135.548V532.767L448.931 487.986V104.429L129.902 135.548Z");
    const chosenSidePath = new Path2D("M24.9748 493.161L108.9748 523.161V138.5L24.9748 108.5V493.161");
    const clearCanvas = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvasEl.value?.width!, canvasEl.value?.height!)
    }
    const drawBag = () => {
        if (!ctx) return;
        clearCanvas();
        const a = new Path2D("M332.154 63.2695L458.506 99.3742L120.328 131.162L12.5566 93.488L332.154 63.2695Z");
        ctx.fillStyle = '#969696';
        ctx.fill(a);

        const b = new Path2D("M458.497 99.3866L120.328 131.165L12.5566 93.4904L458.497 99.3866Z");
        ctx.fillStyle = '#6F6F6F';
        ctx.fill(b);

        const c = new Path2D("M331.932 64.1616V110.47");
        ctx.strokeStyle = '#464646';
        ctx.lineWidth = 1;
        ctx.stroke(c);

        const d = new Path2D("M332.161 63.2664L458.513 99.371L120.328 131.165L12.5566 93.4905L332.161 63.2664Z");
        ctx.strokeStyle = '#464646';
        ctx.lineJoin = "round";
        ctx.lineWidth = 1;
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
        ctx.lineWidth = 1;
        ctx.lineJoin = "round";
        ctx.fill(h);
        ctx.stroke(h)

        const i = new Path2D("M24.9748 493.161L108.9748 523.161V138.5L24.9748 108.5V493.161"); //bên
        ctx.fillStyle = '#D1D1D1';
        ctx.strokeStyle = "#68341C";
        ctx.lineWidth = 1;
        ctx.lineJoin = "round";
        ctx.setLineDash([3, 3])
        ctx.fill(i);
        ctx.stroke(i);

        const j = new Path2D("M120.328 131.172L458.506 98.9916V491.826L120.328 538.134V131.172Z");
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = "#464646";
        ctx.lineWidth = 1;
        ctx.lineJoin = "round";
        ctx.setLineDash([]);
        ctx.fill(j);
        ctx.stroke(j);

        const k = new Path2D("M129.902 135.548V532.767L448.931 487.986V104.429L129.902 135.548Z"); //M :moveTo(x, y), L: lineTo(x, y), V: lineTo(y) -> x của thằng trước
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = "#68341C";
        ctx.lineWidth = 1;
        ctx.lineJoin = "round";
        ctx.setLineDash([3, 3]);
        ctx.fill(k);
        ctx.stroke(k);

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
        let stroke: Path2D = new Path2D(side.value === 'front' ? "M126.902 135.548V536.767L452.931 490.986V100.429L126.902 131.548Z" : "M20.9748 497.161L112.9748 529.161V134.5L20.9748 101.5V497.161");
        ctx.strokeStyle = "#13bac1";
        ctx.lineWidth = 3;
        ctx.setLineDash([]);
        ctx.stroke(stroke);
    }

    customBag = (event: MouseEvent) => {
        if (!ctx) return;
        const mouse = getMousePos(event);
        const isInFrontPath = ctx.isPointInPath(chosenFrontPath, mouse.x, mouse.y);
        // const isInSidePath = ctx.isPointInPath(chosenSidePath, mouse.x, mouse.y);
        if (isInFrontPath) side.value = 'front';
        else side.value = 'side'
        drawBag();
    }

    drawBag();
});
</script>