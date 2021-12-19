import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js"
import "./main.scss";

import { route } from "./router/index.routes";

window.location="#/";
route(window.location.hash);
window.addEventListener("hashchange", () => {
  route(window.location.hash);
});
