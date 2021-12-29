import view from "../views/detalles/detalles.html";
import "../views/detalles/detalles.scss";

const KEY = "472732f60fa6068083309688ed65b74f";

const BaseUrl = "https://api.themoviedb.org/3/";

const getData = async (url) => {
  const respuesta = await fetch(url);
  return await respuesta.json();
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

const pointColor = (vote_average) => {
  let point = "";
  if (vote_average >= 7.0) point = "bg-success";
  if (vote_average >= 4.0 && vote_average < 7.0) point = "bg-warning";
  if (vote_average >= 0.0 && vote_average < 4.0) point = "bg-danger";

  return point;
};

export default async (tipo) => {
  const div = document.createElement("div");
  const { id } = extraerParametros(window.location.hash);
  let data = null;

  div.innerHTML = view;

  if (tipo === "movie") {
    data = await getData(`${BaseUrl}movie/${id}?api_key=${KEY}&language=es`);
  } else {
    data = await getData(`${BaseUrl}tv/${id}?api_key=${KEY}&language=es`);
  }

  //console.log(extraerParametros(window.location.hash));
  console.log(data);

  const contenedorImg = div.querySelector(".contenedorImg");
  const contenedorData = div.querySelector(".contenedorData");

  contenedorImg.innerHTML = `
  <img src='https://image.tmdb.org/t/p/w500${data.poster_path}'>
  `;

  contenedorData.innerHTML = `
  <div class="header">
    <h3>${data.name ? data.name : data.title}</h3>  
    <span class=" p-1 badge rounded-pill ${pointColor(
      data.vote_average
    )}"> ${data.vote_average}</span>
  </div>
    

    <div>
      <span class="fecha">${
        data.first_air_date ? data.first_air_date : data.release_date
      }
      </span>
      <div>
    
      ${data.genres.map((genre) => {
        return `<span class="mx-1">${genre.name}</span>`;
      })}
    </div>
    </div>
    
    <hr>
    
    <p>${data.overview}</p>
  
  `;

  return div;
};
