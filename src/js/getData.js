import "core-js/stable";
import "regenerator-runtime/runtime";

const fetchUrl = async (url) => {
  return await fetch(url)
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
};

const fetchUrls = async (urls) => {
  return await Promise.all(urls.map((url) => fetchUrl(url)));
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
  return await Promise.all(
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
  );
};

const getData = async (url) => {
  const planets = await getPlanets(url);
  const residents = await getResidents(planets);

  return await getSpecies(residents);
};

export default getData;
