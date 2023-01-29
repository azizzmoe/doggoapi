let timer;
let deleteFirstPhotoDelay;

async function init() {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const data = await response.json();
  breedList(data.message);
}

init();

function breedList(breedlist) {
  const breed = document.getElementById("breed");
  breed.innerHTML = `
  <select onchange="loadBreed(this.value)">
        <option>Choose a dog breed</option>
        ${Object.keys(breedlist).map((list) => {
          return `<option>${list}</option>`;
        })}
    </select>`;
}

async function loadBreed(val) {
  if (val !== "Choose a dog breed") {
    const response = await fetch(`https://dog.ceo/api/breed/${val}/images`);
    const data = await response.json();
    createSlideShow(data.message);
  }
}

function createSlideShow(images) {
  let currentPosition = 0;
  clearInterval(timer);
  clearTimeout(deleteFirstPhotoDelay);

  if (images.length > 1) {
    document.getElementById("slideshow").innerHTML = `
  <div class="slide" style="background-image: url('${images[0]}')"></div>
  <div class="slide" style="background-image: url('${images[1]}')"></div>
  `;
    currentPosition += 2;
    if (images.length == 2) currentPosition = 0;
    timer = setInterval(nextSlide, 3000);
  } else {
    document.getElementById("slideshow").innerHTML = `
  <div class="slide" style="background-image: url('${images[0]}')"></div>
  <div class="slide"></div>
  `;
  }

  function nextSlide() {
    document
      .getElementById("slideshow")
      .insertAdjacentHTML(
        "beforeend",
        `<div class="slide" style="background-image: url('${images[currentPosition]}')"></div>`
      );
    deleteFirstPhotoDelay = setTimeout(function () {
      document.querySelector(".slide").remove();
    }, 50);
    if (currentPosition + 1 >= images.length) {
      currentPosition = 0;
    } else {
      currentPosition++;
    }
  }
}