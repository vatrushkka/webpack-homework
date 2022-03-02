import "core-js/stable";
import "regenerator-runtime/runtime";

function getOnlyFulFilled(allResults) {
  const fulfilledResult = [];
  allResults.forEach((result) => {
    if (result.status === "fulfilled") {
      fulfilledResult.push(result.value);
    }
  });
  return fulfilledResult;
}

const fetchUrl = async (url) => {
  return await fetch(url)
    .then((resp) => resp.json())
    .catch((err) => new Error(err));
};

const fetchUrls = async (urls) => {
  return await Promise.allSettled(urls.map((url) => fetchUrl(url))).then(
    (results) => getOnlyFulFilled(results)
  );
};

const getPlanets = async (url) => {
  return await fetchUrl(url);
};

const getResidents = async (planets) => {
  return await Promise.all(
    planets.results.map(async (planet) => {
      let residents = await fetchUrls(planet.residents);

      if (residents.length) {
        return residents.map((resident) => ({
          planet: planet.name,
          residentName: resident.name,
          species: resident.species,
        }));
      } else {
        return {
          planet: planet.name,
          residentName: "-----",
          species: "-----",
        };
      }
    })
  );
};

const getSpecies = async (residents) => {
  return await Promise.allSettled(
    [].concat(...residents).map(async (resident) => {
      if (resident.species.length === 0) {
        return {
          planet: resident.planet,
          residentName: resident.residentName,
          species: "Human",
        };
      } else if (resident.species === "-----") {
        return resident;
      } else {
        let species = await fetchUrl(resident.species);
        return {
          planet: resident.planet,
          residentName: resident.residentName,
          species: species.name,
        };
      }
    })
  ).then((results) => getOnlyFulFilled(results));
};

export const getData = async (url) => {
  const planets = await getPlanets(url);
  const residents = await getResidents(planets);

  return await getSpecies(residents);
};

export function getResident(index, planet, resident, species) {
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
