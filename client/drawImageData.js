export const drawImageData = (pixels, imageData, threshholdValue, isThreshhold, ctx) => {
    let index = 0;

    for (let i = 0; i < imageData.data.length; i += 4) {
        let currentColor = pixels[index++];

        if (isThreshhold) {
            currentColor = threshholdValue > currentColor ? 0 : 255;
        }

        imageData.data[i] = currentColor;
        imageData.data[i + 1] = currentColor;
        imageData.data[i + 2] = currentColor;
        imageData.data[i + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);
} 