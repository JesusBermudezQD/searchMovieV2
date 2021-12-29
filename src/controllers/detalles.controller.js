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

const pintarData = async (div, url, tipo) => {
  let cars = div.querySelector("#similares_cards");

  cars.innerHTML = "";

  const { results } = await getData(url);

  console.log(results);

  results.forEach((data) => {
    let point = "";
    if (data.vote_average >= 7.0) point = "bg-success";
    if (data.vote_average >= 4.0 && data.vote_average < 7.0)
      point = "bg-warning";
    if (data.vote_average >= 0.0 && data.vote_average < 4.0)
      point = "bg-danger";

    cars.innerHTML += `

    <a onclick="localStorage.setItem('idCard',${data.id})" href='#/detalles/${
      tipo == "movie" ? "movie" : "tv"
    }&id=${data.id}'>
    <div class="tarjetaSimilar position-relative" >
    <div class="card_img">
      <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="" />
    </div>

    <div class="card_desc">
      <h2>${data.title ? data.title : data.name}</h2>
      <p>${data.release_date ? data.release_date : data.first_air_date}</p>
      <span class="position-absolute top-0 p-1 start-90 badge rounded-pill ${point}">${data.vote_average.toFixed(
      1
    )}</span>
  
    </div>

  </div>
    </a>
    

    `;
  });
};

export default async (tipo) => {
  const div = document.createElement("div");
  const { id } = extraerParametros(window.location.hash);
  let data = null;
  let trailer=null;
  
  div.innerHTML = view;

  if (tipo === "movie") {
    data = await getData(`${BaseUrl}movie/${id}?api_key=${KEY}&language=es`);
    trailer=await getData(`${BaseUrl}movie/${id}/videos?api_key=${KEY}&language=es`);
    pintarData(div, `${BaseUrl}/movie/${data.id}/similar?api_key=${KEY}`, tipo);
  } else {
    data = await getData(`${BaseUrl}tv/${id}?api_key=${KEY}&language=es`);
    trailer=await getData(`${BaseUrl}tv/${id}/videos?api_key=${KEY}&language=es`);
    pintarData(div, `${BaseUrl}/tv/${id}/recommendations?api_key=${KEY}`, tipo);
  }

  console.log(trailer);
  console.log(data);

  const contenedorImg = div.querySelector(".contenedorImg");
  const contenedorData = div.querySelector(".contenedorData");

  console.log(data.vote_average);

  contenedorImg.innerHTML = `
  <img src='https://image.tmdb.org/t/p/w500${data.poster_path}'>
  `;

  contenedorData.innerHTML = `
  <div class="header">
    <div>
      <h3>${data.name ? data.name : data.title}</h3>
      <p>${data.tagline}</p>  
    </div>
    <span class=" p-1 badge rounded-pill ${pointColor(data.vote_average)}"> 
      ${data.vote_average}
    </span>
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


    <button type="button" class="trailerBtn" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Trailer <i class="fa-solid fa-play"></i>
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">

          ${trailer.results.length > 0 && trailer.results[0].site == 'YouTube'? 
          
          `
          <iframe
            width="100%"
            height="500px"
            src="https://www.youtube.com/embed/${trailer.results[0].key}"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          `          
          :
          `<h3>Sin Trailer</h3>`
        
        
        }
            
          </div>
          
        </div>
      </div>
    </div>
    
    `;

  return div;
};
