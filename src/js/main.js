import "../scss/main.scss";
import "../index.html";
import { getData, getResident } from "./getData";

let dataUrl = "https://swapi.dev/api/planets/?page=";

const table = document.querySelector(".sw-table");
const pageButtons = document.querySelector(".button-pages-container");
const loader = document.querySelector(".loader");

pageButtons.addEventListener("click", () => loadPage(event.target));

function loadPage(targetButton) {
  clearTable();

  loader.classList.add("loader-active");

  let previousButton = pageButtons.querySelector(".page-button-active");
  if (previousButton) {
    previousButton.classList.remove("page-button-active");
  }

  if (previousButton !== targetButton) {
    let page = targetButton.innerText;
    getData(`${dataUrl}${page}`).then((data) => {
      loadTable(data);
      loader.classList.remove("loader-active");
    });
  }
  targetButton.classList.add("page-button-active");
}

function loadTable(residents) {
  residents.forEach(({ planet, residentName, species }, index) => {
    const tableResident = getResident(index + 1, planet, residentName, species);

    table.appendChild(tableResident);
  });
}

function clearTable() {
  table.innerHTML = "";

  let tableHeader = getResident("№", "Planet", "Resident", "Species");

  table.appendChild(tableHeader);
}
