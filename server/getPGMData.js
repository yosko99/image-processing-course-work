const util = require("util");
const fs = require("fs");

const getPGMData = async (filename) => {
  const readFile = util.promisify(fs.readFile);
  let pgmData = {
    width: 0,
    height: 0,
    pixels: [],
  };

  try {
    const data = await readFile(filename, "utf8");

    const fileData = data.split(/\r\n|\r|\n/);

    let width, height, grayScale, startIndex;
    const pixels = [];

    if (/[#]/.test(fileData[1])) {
      [width, height] = fileData[2].split(" ");
      grayScale = Number(fileData[3]);
      startIndex = 4;
    } else {
      [width, height] = fileData[1].split(" ");
      grayScale = Number(fileData[2]);
      startIndex = 3;
    }

    for (let i = startIndex; i < fileData.length; i++) {
      const colors = fileData[i].split(" ");

      for (let j = 0; j < colors.length; j++) {
        if (colors[j] !== "") {
          pixels.push(Number(colors[j]) + (255 - grayScale));
        }
      }
    }

    pgmData = {
      width,
      height,
      pixels,
    };
  } catch (error) {
    return {
      error: "Could not find file.",
    };
  }

  return pgmData;
};

module.exports = getPGMData;
