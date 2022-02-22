let planetsData = [];

function fetchUrl(url) {
  return fetch(url)
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
}

function fetchUrls(urls) {
  return Promise.all(urls.map((url) => fetchUrl(url)));
}

function getPlanets(dataUrl) {
  return fetchUrl(dataUrl);
}

function getResidents(planets) {
  let promises = [];

  planets.forEach((planet) => {
    // console.log("loading residents for", planet.name);
    let obj = { planet: planet.name };

    let promise = fetchUrls(planet.residents).then((residents) => {
      if (residents) {
        obj.residents = residents.map((resident) => ({
          residentName: resident.name,
        }));

        return getSpecies(residents, obj);
      }
    });

    planetsData.push(obj);
    promises.push(promise);
  });

  return Promise.all(promises);
}

function getSpecies(residents, residentInfo) {
  let promises = [];

  residents.forEach((resident, index) => {
    // console.log("loading species for", resident.name);
    if (resident.species.length) {
      let promise = fetchUrl(resident.species[0]).then((data) => {
        residentInfo.residents[index].species = data.name;
      });

      promises.push(promise);
    } else {
      residentInfo.residents[index].species = "Human";
    }
  });

  return Promise.all(promises);
}

export function getData(dataUrl) {
  getPlanets(dataUrl)
    .then((planets) => {
      return getResidents(planets.results);
    })
    .then(() => {
      let resultData = [];

      planetsData.forEach((planet) => {
        if (planet.residents.length > 1) {
          planet.residents.forEach((resident) => {
            resultData.push({
              planet: planet.planet,
              resident: resident.residentName,
              species: resident.species,
            });
          });
        } else {
          resultData.push({
            planet: planet.planet,
            resident: "-----",
            species: "-----",
          });
        }
      });
      console.log(resultData);
    });
}
