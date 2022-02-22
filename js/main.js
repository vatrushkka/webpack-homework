/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/getData.js":
/*!***********************!*\
  !*** ./js/getData.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": () => (/* binding */ getData)
/* harmony export */ });
var planetsData = [];

function fetchUrl(url) {
  return fetch(url).then(function (resp) {
    return resp.json();
  })["catch"](function (err) {
    return console.log(err);
  });
}

function fetchUrls(urls) {
  return Promise.all(urls.map(function (url) {
    return fetchUrl(url);
  }));
}

function getPlanets(dataUrl) {
  return fetchUrl(dataUrl);
}

function getResidents(planets) {
  var promises = [];
  planets.forEach(function (planet) {
    // console.log("loading residents for", planet.name);
    var obj = {
      planet: planet.name
    };
    var promise = fetchUrls(planet.residents).then(function (residents) {
      if (residents) {
        obj.residents = residents.map(function (resident) {
          return {
            residentName: resident.name
          };
        });
        return getSpecies(residents, obj);
      }
    });
    planetsData.push(obj);
    promises.push(promise);
  });
  return Promise.all(promises);
}

function getSpecies(residents, residentInfo) {
  var promises = [];
  residents.forEach(function (resident, index) {
    // console.log("loading species for", resident.name);
    if (resident.species.length) {
      var promise = fetchUrl(resident.species[0]).then(function (data) {
        residentInfo.residents[index].species = data.name;
      });
      promises.push(promise);
    } else {
      residentInfo.residents[index].species = "Human";
    }
  });
  return Promise.all(promises);
}

function getData(dataUrl) {
  getPlanets(dataUrl).then(function (planets) {
    return getResidents(planets.results);
  }).then(function () {
    var resultData = [];
    planetsData.forEach(function (planet) {
      if (planet.residents.length > 1) {
        planet.residents.forEach(function (resident) {
          resultData.push({
            planet: planet.planet,
            resident: resident.residentName,
            species: resident.species
          });
        });
      } else {
        resultData.push({
          planet: planet.planet,
          resident: "-----",
          species: "-----"
        });
      }
    });
    console.log(resultData);
  });
}

/***/ }),

/***/ "./index.html":
/*!********************!*\
  !*** ./index.html ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\"\n        content=\"width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0\">\n  <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n\n<!-- fonts -->\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n  <link href=\"https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap\" rel=\"stylesheet\">\n\n  <title>Document</title>\n</head>\n<body>\n  <div class=\"main-container\">\n    <h1 class=\"mg-bottom header\">Star Wars</h1>\n\n    <hr class=\"mg-bottom line\">\n\n    <table class=\"mg-bottom sw-table\">\n      <tr class=\"table-row\">\n        <td class=\"table-cell\">№</td>\n        <td class=\"table-cell\">Planet</td>\n        <td class=\"table-cell\">Resident</td>\n        <td class=\"table-cell\">Species</td>\n      </tr>\n    </table>\n\n    <div class=\"pages-container\">\n      <p>Pages:</p>\n\n      <button class=\"page-button\">1</button>\n      <button class=\"page-button\">2</button>\n      <button class=\"page-button\">3</button>\n      <button class=\"page-button\">4</button>\n      <button class=\"page-button\">5</button>\n      <button class=\"page-button\">6</button>\n    </div>\n  </div>\n</body>\n</html>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./scss/main.scss":
/*!************************!*\
  !*** ./scss/main.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/main.scss */ "./scss/main.scss");
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index.html */ "./index.html");
/* harmony import */ var _getData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getData */ "./js/getData.js");



var data = "https://swapi.dev/api/planets/";
(0,_getData__WEBPACK_IMPORTED_MODULE_2__.getData)(data);
})();

/******/ })()
;
//# sourceMappingURL=main.js.map