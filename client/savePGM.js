const thresholdSlider = document.getElementById('threshhold');

export const savePGM = (width, height, pixels, isThreshhold) => {
    if (pixels === undefined) {
        alert('Choose a image first');
    } else {
        let output = `P2\n${width} ${height}\n255`;

        for (let i = 0; i < pixels.length; i++) {
            let currentColor = pixels[i];

            if (isThreshhold) {
                currentColor = thresholdSlider.value >= currentColor ? 0 : 255;
            }

            if (i % 17 === 0) {
                output += '\n';
            }

            output += currentColor + ' ';
        }

        const tempElement = document.createElement('a');
        const file = new Blob([output]);

        tempElement.href = URL.createObjectURL(file);
        tempElement.download = 'image.pgm';
        tempElement.click();

        URL.revokeObjectURL(tempElement.href);
    }
}