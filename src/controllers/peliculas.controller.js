import view from "../views/peliculas/peliculas.html";
import "../views/peliculas/peliculas.scss";

const KEY = "472732f60fa6068083309688ed65b74f";

const URLPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}`;

const getPeliculas = async () => {
  const respuesta = await fetch(URLPopular);
  return await respuesta.json();
};

export default async () => {
  const div = document.createElement("div");
  div.innerHTML = view;

  const popular = div.querySelector("#popular");

  const { results } = await getPeliculas();

  console.log(results);
  results.forEach((popu) => {
    popular.innerHTML += `
    <a
    class="list-group-item list-group-item-action active"
    aria-current="true"
  >
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">${popu.title}</h5>
      <small>${popu.vote_average}</small>
    </div>
    <p class="mb-1">${popu.overview}</p>
    
  </a>
    `;
  });

  return div;
};
