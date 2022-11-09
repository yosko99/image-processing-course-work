import { hideLoadingImage, showLoadingImage } from './client/loadingSpinner.js';
import { extractPixelDataToHashMap } from './client/extractPixelData.js'
import { updateHistogram } from './client/updateHistogram.js';
import { fetchPGMData } from './client/fetchPGMData.js';
import { savePGM } from './client/savePGM.js';
import { drawImageData } from './client/drawImageData.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d', { alpha: false });

const threshholdCheckbox = document.getElementById('activateThreshhold');
const thresholdSlider = document.getElementById('threshhold');
const exportButton = document.getElementById('export');

threshholdCheckbox.checked = false
thresholdSlider.disabled = true;

let width, height, pixels;

let currentFile = '';
let isThreshhold = false;

let imageData;

const draw = async () => {
    showLoadingImage(ctx);

    const pgmData = await fetchPGMData(currentFile);

    width = pgmData.width;
    height = pgmData.height;
    pixels = pgmData.pixels;

    ctx.canvas.width = width;
    ctx.canvas.height = height;

    imageData = ctx.getImageData(0, 0, width, height);

    hideLoadingImage();

    updateHistogram(extractPixelDataToHashMap(width, height, [...pixels]))
    drawImageData(pixels, imageData, thresholdSlider.value, isThreshhold, ctx)
}

const main = () => {
    const buttons = document.querySelectorAll('.files');

    buttons.forEach((button) => {
        button.addEventListener('click', async () => {
            const fileName = button.getAttribute('id');

            currentFile = fileName;

            await draw();
        })
    })

    thresholdSlider.addEventListener('input', () => {
        drawImageData(pixels, imageData, thresholdSlider.value, isThreshhold, ctx)
    })

    threshholdCheckbox.addEventListener('change', () => {
        if (currentFile !== '') {
            isThreshhold = threshholdCheckbox.checked;
            thresholdSlider.disabled = !threshholdCheckbox.checked;
        } else {
            threshholdCheckbox.checked = false;
        }

        drawImageData(pixels, imageData, thresholdSlider.value, isThreshhold, ctx)
    })

    exportButton.addEventListener('click', () => {
        savePGM(width, height, pixels, isThreshhold, currentFile, ctx);
    })
}

main();