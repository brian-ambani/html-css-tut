const accessKey = "k_fbWkWqwpIhPy3G9Dki7qXwZzhqkdzHIjbCm-Hewz8";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const moreBtn = document.getElementById("show-more-btn");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?query=${inputData}&client_id=${accessKey}&page=${page}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  results.map((result) => {
    const img = document.createElement("img");
    img.src = result.urls.small;
    img.alt = result.alt_description;
    const imagelink = document.createElement("a");
    imagelink.href = result.links.html;
    imagelink.target = "_blank";
    imagelink.textContent = result.alt_description;

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("search-result");
    imgContainer.appendChild(img);
    searchResults.appendChild(imgContainer);
  });

  page++;
  if (page > 1) {
    moreBtn.style.display = "block";
  }
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

moreBtn.addEventListener("click", searchImages);
