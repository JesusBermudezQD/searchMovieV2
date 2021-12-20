import view from "../views/home/home.html";
import "../views/home/home.scss";

const KEY = "472732f60fa6068083309688ed65b74f";
const BaseUrl = "https://api.themoviedb.org/3/";
const URLPopularMovie = `${BaseUrl}movie/popular?api_key=${KEY}&language=es`;
const URLPopularTv = `${BaseUrl}tv/popular?api_key=${KEY}&language=es`;
const URLTrendingMovie = `${BaseUrl}trending/movie/day?api_key=${KEY}&language=es`;
const URLTrendingTv = `${BaseUrl}trending/tv/day?api_key=${KEY}&language=es`;
const URLSearchMovie = `${BaseUrl}search/movie?api_key=${KEY}`;

const getData = async (url) => {
  const respuesta = await fetch(url);
  return await respuesta.json();
};

const pintarData = async (div, url, caso) => {
  let cars = document.createElement("div");

  if (caso === 1) cars = div.querySelector("#populares_cards");
  if (caso === 2) cars = div.querySelector("#tendencias_cards");

  cars.innerHTML = "";

  const { results } = await getData(url);
  // console.log(results);
  results.forEach((data) => {
    let point = "";
    if (data.vote_average >= 7.0) point = "bg-success";
    if (data.vote_average >= 4.0 && data.vote_average < 7.0)
      point = "bg-warning";
    if (data.vote_average >= 0.0 && data.vote_average < 4.0)
      point = "bg-danger";

    cars.innerHTML += `
    <div class="tarjeta position-relative">
    <div class="card_img">
      <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="" />
    </div>

    <div class="card_desc">
      <h2>${data.title ? data.title : data.name}</h2>
      <p>${data.release_date ? data.release_date : data.first_air_date}</p>
      <span class="position-absolute top-0 p-1 start-90 badge rounded-pill ${point}">${
      data.vote_average
    }</span>
  
    </div>

  </div>

    `;
  });
};

const addActiva = (ul, text) => {
  for (let i = 0; i < ul.children.length; i++) {
    ul.children[i].children[0].classList.remove("activa");
    if (ul.children[i].children[0].innerHTML === text) {
      ul.children[i].children[0].classList.add("activa");
    }
  }
};

export default async () => {
  const div = document.createElement("div");
  div.innerHTML = view;

  const ulOpciones = div.querySelector("#opciones_list");
  const ulTendencias = div.querySelector("#tendencias_list");
 

  addActiva(ulOpciones, "Television");
  addActiva(ulTendencias, "Television");

  pintarData(div, URLPopularTv, 1);
  pintarData(div, URLTrendingTv, 2);

  ulOpciones.addEventListener("click", (e) => {
    const ulArray = ["Television", "Cines"];
    if (ulArray.indexOf(e.target.outerText) !== -1) {
      if (e.target.outerText === "Television") {
        addActiva(ulOpciones, "Television");
        pintarData(div, URLPopularTv, 1);
      } else if (e.target.outerText === "Cines") {
        addActiva(ulOpciones, "Cines");
        pintarData(div, URLPopularMovie, 1);
      }
    }
  });

  ulTendencias.addEventListener("click", (e) => {
    const ulArray = ["Television", "Cines"];
    if (ulArray.indexOf(e.target.outerText) !== -1) {
      if (e.target.outerText === "Television") {
        addActiva(ulTendencias, "Television");
        pintarData(div, URLTrendingTv, 2);
      } else if (e.target.outerText === "Cines") {
        addActiva(ulTendencias, "Cines");
        pintarData(div, URLTrendingMovie, 2);
      }
    }
  });

  

  return div;
};
