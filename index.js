// 1 - Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all)
let countries = [];
const search = document.getElementById("inputSearch");
const range = document.getElementById("inputRange");
const btnMinToMax = document.getElementById("minToMax");
const btnMaxToMin = document.getElementById("maxToMin");
const btnAlpha = document.getElementById("alpha");
const rangevalue = document.getElementById("rangeValue");
const countriesContainer = document.querySelector(".countries-container");

async function fetchCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  countries = await response.json();
  countriesDisplay(countries); // Appelle ici après avoir récupéré les pays
}

async function countriesDisplay(filteredCountries) {
  countriesContainer.innerHTML = filteredCountries
    .map(
      (country) =>
        `
       <div class="card">
         <img src="${country.flags.png}" alt="drapeau ${country.name.common}">
         <h3>${country.name.common}</h3>
         <h4>${country.capital ? country.capital[0] : "Pas de capitale"}</h4>
         <p>Population : ${country.population.toLocaleString()}</p>
       </div>
      `
    )
    .join("");
}

// Fonction pour filtrer et trier les pays, puis les afficher
function updateDisplay(countriesArray) {
  // Filtrer selon la recherche
  let filteredCountries = countriesArray.filter((country) =>
    country.name.common.toLowerCase().startsWith(search.value.toLowerCase())
  );

  // Limiter selon le range
  filteredCountries = filteredCountries.slice(0, range.value);

  // Afficher les pays triés et filtrés
  countriesDisplay(filteredCountries);
}

// Gestion de la recherche
search.addEventListener("input", () => {
  updateDisplay(countries);
});

// Gestion du range input
range.addEventListener("input", () => {
  rangevalue.textContent = range.value;
  updateDisplay(countries);
});

//  Gérer les 3 boutons pour trier (méthode sort())

// Tri par population croissante
btnMinToMax.addEventListener("click", () => {
  const sortedCountries = [...countries].sort(
    (a, b) => a.population - b.population
  );
  updateDisplay(sortedCountries);
});

// Tri par population décroissante
btnMaxToMin.addEventListener("click", () => {
  const sortedCountries = [...countries].sort(
    (a, b) => b.population - a.population
  );
  updateDisplay(sortedCountries);
});

// Tri par ordre alphabétique
btnAlpha.addEventListener("click", () => {
  const sortedCountries = [...countries].sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  );
  updateDisplay(sortedCountries);
});

// Appel initial pour récupérer les pays
fetchCountries();
