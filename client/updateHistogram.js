const histogramCanvas = document.getElementById('histogram');
const ctx = histogramCanvas.getContext('2d');

export const updateHistogram = (pixelData) => {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.width);

    for (let i = 0; i < ctx.canvas.width; i++) {
        ctx.fillStyle = `rgb(${i}, ${i}, ${i})`;
        ctx.fillRect(i, 0, 2, pixelData[i] / 20);
    }
}