import "../scss/main.scss";
import "../index.html";
import getData from "./getData";

let dataUrl = "https://swapi.dev/api/planets/?page=";

const table = document.querySelector(".sw-table");
const pageButtons = document.querySelector(".button-pages-container");
const loader = document.querySelector(".loader");

pageButtons.addEventListener("click", () => buttonClick(event.target));

function loadTable(residents) {
  residents.forEach(({ planet, residentName, species }, index) => {
    const tableResident = getResident(index + 1, planet, residentName, species);

    table.appendChild(tableResident);
  });
}

function buttonClick(targetButton) {
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

function getResident(index, planet, resident, species) {
  const tableRow = document.createElement("tr");
  tableRow.classList.add("table-row");

  const rowNumber = document.createElement("td");
  rowNumber.classList.add("table-cell");
  rowNumber.innerText = index;
  tableRow.appendChild(rowNumber);

  const rowPlanet = document.createElement("td");
  rowPlanet.classList.add("table-cell");
  rowPlanet.innerText = planet;
  tableRow.appendChild(rowPlanet);

  const rowResident = document.createElement("td");
  rowResident.classList.add("table-cell");
  rowResident.innerText = resident;
  tableRow.appendChild(rowResident);

  const rowSpecies = document.createElement("td");
  rowSpecies.classList.add("table-cell");
  rowSpecies.innerText = species;
  tableRow.appendChild(rowSpecies);

  return tableRow;
}

function clearTable() {
  table.innerHTML = "";

  let tableHeader = getResident("№", "Planet", "Resident", "Species");

  table.appendChild(tableHeader);
}
