import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./main.scss";

import { route } from "./router/index.routes";

const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (window.location.hash === "#/") {
    if (e.target[0].value.trim().length > 3) {
      console.log("desde home");
      console.log(e.target[0].value.trim());
    }
  }
  if (window.location.hash === "#/peliculas") console.log("desde peliculas");
});

window.location = "#/";
route(window.location.hash);
window.addEventListener("hashchange", () => {
  route(window.location.hash);
});
