//your code here
const imageContainer = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const para = document.getElementById("para");

let clickedImages = [];
let allImages = ["img1", "img2", "img3", "img4", "img5"];

// ------------ FUNCTION TO LOAD IMAGES --------------
function loadImages() {
  imageContainer.innerHTML = "";
  para.innerText = "";
  clickedImages = [];
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";

  // choose one image randomly to duplicate
  let duplicate = allImages[Math.floor(Math.random() * allImages.length)];

  // create full array of 6 images
  let finalImages = [...allImages, duplicate];

  // shuffle
  finalImages.sort(() => Math.random() - 0.5);

  // display
  finalImages.forEach((cls, index) => {
    let img = document.createElement("img");
    img.classList.add(cls);
    img.dataset.value = cls;
    img.dataset.index = index;

    img.addEventListener("click", () => handleClick(img));

    imageContainer.appendChild(img);
  });
}

// ------------ CLICK HANDLER ----------------
function handleClick(imgElement) {
  // If already selected, ignore
  if (imgElement.classList.contains("selected")) return;

  // If already selected 2 images, ignore more clicks
  if (clickedImages.length === 2) return;

  imgElement.classList.add("selected");
  clickedImages.push(imgElement.dataset.value);

  resetBtn.style.display = "inline-block";

  // show verify only when 2 images selected
  if (clickedImages.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

// ------------ RESET BUTTON ----------------
resetBtn.addEventListener("click", () => {
  loadImages();
});

// ------------ VERIFY BUTTON ----------------
verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";

  if (clickedImages.length === 2 && clickedImages[0] === clickedImages[1]) {
    para.innerText = "You are a human. Congratulations!";
  } else {
    para.innerText =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

// initial load
loadImages();
