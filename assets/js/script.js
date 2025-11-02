const uploadBox = document.querySelector(".upload__box"),
  previewImg = uploadBox.querySelector("img"),
  fileInput = uploadBox.querySelector("input"),
  widthInput = document.querySelector(".width input"),
  heightInput = document.querySelector(".height input"),
  ratioInput = document.querySelector(".ratio input"),
  qualityInput = document.querySelector(".quality input"),
  downloadBtn = document.querySelector(".download__btn");

let ogImageRatio;

const loadFile = (e) => {
  const file = e.target.files[0]; // getting f"ile first selected
  if (!file) return; //return if user no selected
  previewImg.src = URL.createObjectURL(file); // Preview img user selected
  previewImg.addEventListener("load", () => {
    widthInput.value = previewImg.naturalWidth;
    heightInput.value = previewImg.naturalHeight;
    ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
    document.querySelector(".wrapper").classList.add("active");
    document.querySelector("body").classList.add("active");
  });
  console.log(file);
};

widthInput.addEventListener("keyup", () => {
  // getting height according to the ratio checkbox status
  const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
  heightInput.value = Math.floor(height);
});

heightInput.addEventListener("keyup", () => {
  // getting height according to the ratio checkbox status
  const width = ratioInput.checked ? heightInput.value / ogImageRatio : widthInput.value;
  widthInput.value = Math.floor(width);
});

const resizeAndDownload = () => {
  const canvas = document.createElement("canvas");
  const a = document.createElement("a");
  const ctx = canvas.getContext("2d");

  const imgQuality = qualityInput.checked ? 0.1 : 1.0;

  // setting canvas
  canvas.width = widthInput.value;
  canvas.height = heightInput.value;

  ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);

  a.href = canvas.toDataURL("image/jpeg", imgQuality);
  a.download = new Date().getTime();
  a.click();
};

downloadBtn.addEventListener("click", resizeAndDownload);
fileInput.addEventListener("change", loadFile);
uploadBox.addEventListener("click", () => fileInput.click());
