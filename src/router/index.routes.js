import Home from "../controllers/home.controller";
import PeliculasYtv from "../controllers/peliculasYtv.controller";
import Detalles from "../controllers/detalles.controller";

const content = document.getElementById("root");

const route = async (route) => {
  content.innerHTML = "";

  switch (route) {
    case "#/": {
      return content.appendChild(await Home());
    }

    case "#/television":
      return content.appendChild(await PeliculasYtv());

    case "#/peliculas":
      return content.appendChild(await PeliculasYtv());

    case `#/detalles/movie&id=${localStorage.getItem("idCard")}`:
      return content.appendChild(await Detalles("movie"));

    case `#/detalles/tv&id=${localStorage.getItem("idCard")}`:
      return content.appendChild(await Detalles("tv"));

    default:
      return console.log("404");
  }
};

export { route };
