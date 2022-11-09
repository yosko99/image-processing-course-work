export const extractPixelDataToHashMap = (width, height, pixels) => {
    const data = {};

    for (let x = 0; x < height; x++) {
        for (let y = 0; y < width; y++) {
            const color = Number(pixels.shift());

            if (data[color] === undefined) {
                data[color] = 0;
            } else {
                data[color]++;
            }

        }
    }

    return data;
}
