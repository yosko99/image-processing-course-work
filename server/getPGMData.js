const util = require('util');
const fs = require('fs');

const getPGMData = async (filename) => {
    const readFile = util.promisify(fs.readFile);
    let pgmData = {
        width: 0,
        height: 0,
        pixels: []
    }

    try {
        const data = await readFile(filename, 'utf8')

        const fileData = data.split(/\r\n|\r|\n/);
        
        const [width, height] = fileData[2].split(' ');
        const pixels = [];

        for (let i = 4; i < fileData.length; i++) {
            const colors = fileData[i].split(' ');

            for (let j = 0; j < colors.length; j++) {
                if (colors[j] !== '') {
                    pixels.push(colors[j]);
                }
            }
        }

        pgmData = {
            width, height, pixels
        };
    } catch (error) {
        return {
            error: 'Could not find file.'
        }
    }

    return pgmData;
}

module.exports = getPGMData;