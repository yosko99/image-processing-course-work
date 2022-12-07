export const extractPixelDataToHashMap = (width, height, pixels) => {
  const data = {};
  let index = 0;

  for (let x = 0; x < height; x++) {
    for (let y = 0; y < width; y++) {
      const color = pixels[index++];

      if (data[color] === undefined) {
        data[color] = 0;
      } else {
        data[color]++;
      }
    }
  }

  return data;
};
