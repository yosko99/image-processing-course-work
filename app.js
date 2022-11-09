import { hideLoadingImage, showLoadingImage } from './client/loadingSpinner.js';
import { extractPixelDataToHashMap } from './client/extractPixelData.js'
import { updateHistogram } from './client/updateHistogram.js';
import { fetchPGMData } from './client/fetchPGMData.js';
import { savePGM } from './client/savePGM.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const threshholdCheckbox = document.getElementById('activateThreshhold');
const thresholdSlider = document.getElementById('threshhold');
const exportButton = document.getElementById('export');

threshholdCheckbox.checked = false
thresholdSlider.disabled = true;

let width, height, pixels;

let currentFile = '';
let isThreshhold = false;

const draw = async (refetch) => {
    if (refetch) {
        showLoadingImage(ctx);
        const pgmData = await fetchPGMData(currentFile);

        width = pgmData.width;
        height = pgmData.height;
        pixels = pgmData.pixels;

        hideLoadingImage();

        ctx.canvas.width = width;
        ctx.canvas.height = height;
    }

    const copyOfPixels = [...pixels];

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let color = Number(copyOfPixels.shift());

            if (isThreshhold) {
                color = thresholdSlider.value > color ? 0 : 255;
            }

            ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
            ctx.fillRect(x, y, 1, 1);
        }
    }

    updateHistogram(extractPixelDataToHashMap(width, height, [...pixels]))
}

const main = () => {
    const buttons = document.querySelectorAll('.files');

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const fileName = button.getAttribute('id');

            currentFile = fileName;
            draw(true);
        })
    })

    thresholdSlider.addEventListener('input', () => {
        draw(false);
    })

    threshholdCheckbox.addEventListener('change', () => {
        if (currentFile !== '') {
            isThreshhold = threshholdCheckbox.checked;
            thresholdSlider.disabled = !threshholdCheckbox.checked;
        } else {
            threshholdCheckbox.checked = false;
        }

        draw(false);
    })

    exportButton.addEventListener('click', () => {
        savePGM(width, height, pixels, isThreshhold, currentFile);
    })
}

main();