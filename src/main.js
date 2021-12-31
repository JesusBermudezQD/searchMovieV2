import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./main.scss";

import { route } from "./router/index.routes";

const form = document.querySelector("#form");

const search = (url, query) => {
  localStorage.setItem("query", query);
  window.location.href = `${url}${query}`;
};
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (window.location.hash === "#/" || window.location.hash==="#/search/all&q="+ e.target[0].value.trim()) {
    if (e.target[0].value.trim().length > 3) {
      console.log("desde home");
      console.log(e.target[0].value.trim());
      search("#/search/all&q=", e.target[0].value.trim());
    }
  }
  if (window.location.hash === "#/peliculas" || window.location.hash==="#/search/movie&q="+ e.target[0].value.trim()) {
    console.log("desde peliculas");
    console.log(e.target[0].value.trim());
    search("#/search/movie&q=", e.target[0].value.trim());
  }
  if (window.location.hash === "#/television" || window.location.hash==="#/search/tv&q="+ e.target[0].value.trim()) {
    console.log("desde television");
    console.log(e.target[0].value.trim());
    search("#/search/tv&q=", e.target[0].value.trim());
  }
});

window.location = "#/";
route(window.location.hash);
window.addEventListener("hashchange", () => {
  route(window.location.hash);
});
