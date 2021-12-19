import Home from "../controllers/home.controller";
import Peliculas from "../controllers/peliculas.controller";
import Series from "../controllers/series.controller";

const content = document.getElementById("root");

const route = async(route) => {
  content.innerHTML = "";

  switch (route) {
    case "#/": {
      return content.appendChild(await Home());
    }

    case "#/series":
      return content.appendChild(await Series());

    case "#/peliculas":
      return content.appendChild(await Peliculas());

    default:
      return console.log("404");
  }
};

export { route };
