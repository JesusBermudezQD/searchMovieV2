import view from "../views/peliculas/peliculas.html";
import "../views/peliculas/peliculas.scss";

const KEY = "472732f60fa6068083309688ed65b74f";

const BaseUrl = "https://api.themoviedb.org/3/";
const URLPopular = `${BaseUrl}movie/popular?api_key=${KEY}&language=es`;
const URLCartelera = `${BaseUrl}movie/now_playing?api_key=${KEY}&language=es`;
const URLProximamente = `${BaseUrl}movie/upcoming?api_key=${KEY}&language=es`;
let limitPages = 1;
let pages = 1;

const getData = async (url) => {
  const respuesta = await fetch(url);
  return await respuesta.json();
};

const addActiva = (ul, text) => {
  for (let i = 0; i < ul.children.length; i++) {
    ul.children[i].children[0].classList.remove("activa");
    if (ul.children[i].children[0].innerHTML === text) {
      ul.children[i].children[0].classList.add("activa");
    }
  }
};

const card = (data) => {
  const div = document.createElement("div");
  div.setAttribute("class", "tarjeta position-relative");

  let point = "";
  if (data.vote_average >= 7.0) point = "bg-success";
  if (data.vote_average >= 4.0 && data.vote_average < 7.0) point = "bg-warning";
  if (data.vote_average >= 0.0 && data.vote_average < 4.0) point = "bg-danger";

  div.innerHTML = `
  <div class="card_img">
    <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="" />
  </div>

  <div class="card_desc">
    <h2>${data.title ? data.title : data.name}</h2>
    <p>${data.release_date ? data.release_date : data.first_air_date}</p>
    <span class="position-absolute top-0 p-1 start-90 badge rounded-pill ${point}">${
    data.vote_average
  }</span>

  </div>`;

  return div;
};

const pintarData = async (div, url, caso) => {
  const cards = div.querySelector("#content");

  if (caso === 1) cards.innerHTML = "";

  const { results, total_pages } = await getData(url);
  limitPages = total_pages;
  console.log(total_pages);
  results.forEach((data) => {
    // console.log(card(data));
    cards.appendChild(card(data));
  });
};

const extraerParametros = (url) => {
  if (typeof url != "string") {
    throw TypeError("El argumento debe ser una cadena de caracteres.");
  }

  // Pendiente: validar si una cadena de caracteres corresponde con una URL.

  return (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, p) => (
      (a[p.slice(0, p.indexOf("="))] = p.slice(p.indexOf("=") + 1)), a
    ),
    {}
  );
};

export default async () => {
  const div = document.createElement("div");
  div.innerHTML = view;

  const ulOpciones = div.querySelector("#opciones_list");
  const buttonMas = div.querySelector("#buttonMas");

  // console.log(results);
  addActiva(ulOpciones,"Populares");
  pintarData(div, URLPopular, 1);

  ulOpciones.addEventListener("click", (e) => {
    const ulArray = ["Populares", "En cartelera", "Proximamente"];
    if (ulArray.indexOf(e.target.outerText) !== -1) {
      switch (e.target.outerText) {
        case "Populares":
          addActiva(ulOpciones,"Populares");
          pintarData(div, URLPopular, 1);
          break;
        case "En cartelera":
          addActiva(ulOpciones,"En cartelera");
          pintarData(div, URLCartelera, 1);
          break;

        case "Proximamente":
          addActiva(ulOpciones,"Proximamente");
          pintarData(div, URLProximamente, 1);
          break;
        default:
          break;
      }
    }
  });

  buttonMas.addEventListener("click", () => {
    if (pages <= limitPages) {
      pages = pages + 1;
      pintarData(div, URLPopular + `&page=${pages}`, 2);
    }
  });

  return div;
};
