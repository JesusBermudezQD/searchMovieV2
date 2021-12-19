import view from "../views/series/series.html";
import "../views/series/series.scss";
export default () => {
  const div = document.createElement("div");
  div.innerHTML = view;

  const btn = div.querySelector("#button");


  return div;
};
