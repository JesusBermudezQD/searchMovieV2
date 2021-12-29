import view from "../views/peliculasYtv/peliculasYtv.html";
import "../views/peliculasYtv/peliculasYtv.scss";

const KEY = "472732f60fa6068083309688ed65b74f";

const BaseUrl = "https://api.themoviedb.org/3/";
const URLPopular = `${BaseUrl}movie/popular?api_key=${KEY}&language=es`;
const URLCartelera = `${BaseUrl}movie/now_playing?api_key=${KEY}&language=es`;
const URLProximamente = `${BaseUrl}movie/upcoming?api_key=${KEY}&language=es`;

const URLPopularTv = `${BaseUrl}tv/popular?api_key=${KEY}&language=es`;
const URLEmisionTv = `${BaseUrl}tv/on_the_air?api_key=${KEY}&language=es`;
const URLEmisionHoyTv = `${BaseUrl}tv/airing_today?api_key=${KEY}&language=es`;

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

const card = (data,tipo) => {
  const div = document.createElement("div");
  div.setAttribute("class", "tarjeta position-relative");

  let point = "";
  if (data.vote_average >= 7.0) point = "bg-success";
  if (data.vote_average >= 4.0 && data.vote_average < 7.0) point = "bg-warning";
  if (data.vote_average >= 0.0 && data.vote_average < 4.0) point = "bg-danger";

  div.innerHTML = `

  <a onclick="localStorage.setItem('idCard',${data.id})" href='#/detalles/${
    tipo == "movie" ? "movie" : "tv"
  }&id=${data.id}'>
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
  </a>
  `;

  return div;
};

const pintarData = async (div, url, caso,tipo) => {
  const cards = div.querySelector("#content");

  if (caso === 1) cards.innerHTML = "";

  const { results, total_pages } = await getData(url);

  console.log(results);
  limitPages = total_pages;
  // console.log(total_pages);
  results.forEach((data) => {
    // console.log(card(data));
    cards.appendChild(card(data,tipo));
  });
};




export default async () => {
  const div = document.createElement("div");
  div.innerHTML = view;

  //const ulOpciones = div.querySelector("#opciones_list");
  const buttonMas = div.querySelector("#buttonMas");
  const opciones = div.querySelector(".opciones");

  const titulo = document.createElement("h3");
  const ulOpciones = document.createElement("ul");
  ulOpciones.setAttribute("id", "opciones_list");

  if (window.location.hash === "#/peliculas") {
    ulOpciones.innerHTML = `
      <li><a>Populares</a></li>
      <li><a>En cartelera</a></li>
      <li><a>Proximamente</a></li>
    `;

    titulo.innerHTML = "Peliculas";
    opciones.appendChild(titulo);
    opciones.appendChild(ulOpciones);

    addActiva(ulOpciones, "Populares");
    pintarData(div, URLPopular, 1,"movie");
  } else if (window.location.hash === "#/television") {
    ulOpciones.innerHTML = `
      <li><a>Populares</a></li>
      <li><a>Emision</a></li>
      <li><a>Emision hoy</a></li>
    `;
    titulo.innerHTML = "Television";
    opciones.appendChild(titulo);
    opciones.appendChild(ulOpciones);
    addActiva(ulOpciones, "Populares");
    pintarData(div, URLPopularTv, 1,"tv");
  }

  ulOpciones.addEventListener("click", (e) => {
    const ulArray = [
      "Populares",
      "En cartelera",
      "Proximamente",
      "Emision",
      "Emision hoy",
    ];
    if (ulArray.indexOf(e.target.outerText) !== -1) {
      if (window.location.hash === "#/peliculas") {
        switch (e.target.outerText) {
          case "Populares":
            addActiva(ulOpciones, "Populares");
            pintarData(div, URLPopular, 1,"movie");
            break;
          case "En cartelera":
            addActiva(ulOpciones, "En cartelera");
            pintarData(div, URLCartelera, 1,"movie");
            break;

          case "Proximamente":
            addActiva(ulOpciones, "Proximamente");
            pintarData(div, URLProximamente, 1,"movie");
            break;
          default:
            break;
        }
      } else if (window.location.hash === "#/television") {
        switch (e.target.outerText) {
          case "Populares":
            addActiva(ulOpciones, "Populares");
            pintarData(div, URLPopularTv, 1,"tv");
            break;
          case "Emision":
            addActiva(ulOpciones, "Emision");
            pintarData(div, URLEmisionTv, 1,"tv");
            break;

          case "Emision hoy":
            addActiva(ulOpciones, "Emision hoy");
            pintarData(div, URLEmisionHoyTv, 1,"tv");
            break;
          default:
            break;
        }
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
