export const showLoadingImage = (ctx) => {
  ctx.canvas.width = 0;
  ctx.canvas.height = 0;

  const loadingImage = document.querySelector("#loading");

  loadingImage.style.display = "block";
};

export const hideLoadingImage = () => {
  const loadingImage = document.querySelector("#loading");

  loadingImage.style.display = "none";
};
