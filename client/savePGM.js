const thresholdSlider = document.getElementById('threshhold');

export const savePGM = (width, height, pixels, isThreshhold, currentFile) => {
    if (pixels === undefined) {
        alert('Choose a image first');
    } else {
        const copyOfPixels = [...pixels];

        let output = `P2\n${width} ${height}\n255`;

        for (let i = 0; i < pixels.length; i++) {
            let color = Number(copyOfPixels.shift());

            if (isThreshhold) {
                color = thresholdSlider.value > color ? 0 : 255;
            }

            if (i % 17 === 0) {
                output += '\n';
            }

            output += color + ' ';
        }

        const tempElement = document.createElement('a');
        const file = new Blob([output]);

        tempElement.href = URL.createObjectURL(file);
        tempElement.download = currentFile;
        tempElement.click();

        URL.revokeObjectURL(tempElement.href);
    }
}