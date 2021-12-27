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

export default async (tipo) => {
  const div = document.createElement("div");
  const { id } = extraerParametros(window.location.hash);
  let res = null;

  div.innerHTML = view;

  if (tipo === "movie") {
    res = await getData(`${BaseUrl}movie/${id}?api_key=${KEY}&language=es`);
  } else {
    res = await getData(`${BaseUrl}tv/${id}?api_key=${KEY}&language=es`);
  }

  //console.log(extraerParametros(window.location.hash));
  console.log(res);

  return div;
};
