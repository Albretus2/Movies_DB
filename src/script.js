// Animasi tampilan -----------------------
// ketika search form di click
const search = document.querySelector("#search");

search.addEventListener("click", function () {
  search.classList.remove("shadow-hard");
  search.classList.add("search-click");

  setTimeout(() => {
    search.classList.add("shadow-hard");
    search.classList.remove("search-click");
  }, 200);
});

const arrowUp = document.querySelector("#arrowUp");

arrowUp.addEventListener("click", () => {
  arrowUp.classList.remove("shadow-hard");
  arrowUp.classList.add("search-click");

  setTimeout(() => {
    arrowUp.classList.add("shadow-hard");
    arrowUp.classList.remove("search-click");
  }, 200);
});

// ketika card movie di click

function moviecard() {
  const movieCard = Array.from(document.querySelectorAll("#movieCard"));

  movieCard.map((m) => {
    m.addEventListener("click", function () {
      m.classList.remove("shadow-card");
      m.classList.add("card-click");
      setTimeout(() => {
        m.classList.add("shadow-card");
        m.classList.remove("card-click");
      }, 200);
    });
  });
}

// --------------------------

// APIs
// menambil element inpurna search
const keyword = document.querySelector("#search-keyword");
// menambahkan even ketika tombol enter di click

keyword.addEventListener("keypress", async (e) => {
  try {
    if (e.key === "Enter") {
      // memanggil function getMovie
      const movies = await getMovie(keyword);
      showMovie(movies);
    }
  } catch (err) {
    document.querySelector(".infoAlert").innerHTML = errorAlert(err);
  }
});

// function yang mengambil APIs OMDb
function getMovie(keyword) {
  return fetch("http://www.omdbapi.com/?apikey=d2dd862e&s=" + keyword.value)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
        // console.log("eror mas");
      } else {
        return response.json();
      }
    })
    .then((response) => {
      if (response.Response === "False") {
        throw new Error("what you are looking for is not found");
      } else {
        return response.Search;
      }
      // console.log(response);
    });
}

// function untuk menampilkan data movie yang di ambil dari APIs ke elemt html
function showMovie(movies) {
  let card = "";
  movies.forEach((m) => {
    card += elementCard(m);
  });
  document.querySelector(".movies-container").innerHTML = card;
}

// elemetn cards movies
function elementCard(m) {
  return `
  <div id="movieCard"
  class="movieCard card w-full p-0 m-0  xl:w-[49%] bg-transparent mb-5 border-2 border-secondary-content shadow-card cursor-pointer transition-all">
  <figure><img src="${m.Poster}" alt="${m.Title}" class="h-80 w-full object-cover" /></figure>
  <div class="card-body p-4">
      <h2 class="card-title line-clamp-2 ">${m.Title}
      </h2>
      <div class=" flex flex-wrap gap-2 font-semibold items-center">
          /Type
          <span>:</span>
          <p class="text-neutral">${m.Type}</p>
      </div>
      <div class=" flex flex-wrap gap-2 font-semibold items-center mb-3">
          <box-icon name='calendar-event'></box-icon>
          <span>:</span>
          <p class="text-neutral">${m.Year}</p>
      </div>
      <button
          class="card-btn flex justify-between px-4 p-3 bg-secondary font-semibold rounded-md items-center text-primary-content"
          onclick="cardModalMovie.showModal()"  data-imdbid="${m.imdbID}">
          <span>more informations</span>
          <box-icon name='right-arrow-alt' color='#101211'></box-icon>
      </button>
  </div>
</div>
  `;
}

function errorAlert(e) {
  return `
  <div role="alert" class="alert my-5 border-2 border-primary-content">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      class="stroke-current shrink-0 w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
  <span>${e}</span>
</div>
  `;
}

//  ----------------------------------------------
document.addEventListener("click", async function (e) {
  e.preventDefault;
  if (e.target.classList.contains("card-btn")) {
    moviecard();
    const imdbid = e.target.dataset.imdbid;
    const infoMovie = await getInfoMovie(imdbid);
    showInfoMovie(infoMovie);
  }
});

function getInfoMovie(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=d2dd862e&i=" + imdbid)
    .then((response) => response.json())
    .then((response) => response);
}

function showInfoMovie(i) {
  document.querySelector("#cardModalMovie").innerHTML = elementInfoMovie(i);
}

function elementInfoMovie(i) {
  return `
  <div class="modal-box">
  <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
  </form>
  <h3 class="font-bold text-lg mb-5">${i.Title}</h3>
  <div class="flex ">
      <p class="font-semibold w-1/3">Released </p>
      <p class="font-medium">${i.Released}</p>
  </div>
  <div class="flex">
      <p class="font-semibold w-1/3">Genre </p>
      <p class="font-medium">${i.Genre}</p>
  </div>
  <div class="flex">
      <p class="font-semibold w-1/3">Rated </p>
      <p class="font-medium">${i.Rated}</p>
  </div>
  <div class="flex">
      <p class="font-semibold w-1/3">IMDb rating </p>
      <p class="font-medium">${i.imdbRating}/ 10</p>
  </div>
  <div class="flex flex-col mt-6">
      <p class="font-semibold">Plot:</p>
      <p class="font-medium">${i.Plot}</p>
  </div>
</div>
  
  `;
}
