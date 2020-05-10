// https://coronavirus-19-api.herokuapp.com/countries
countryName = document.getElementById("c-id");
active = document.getElementById("active");
perDeath = document.getElementById("perDeath");
todayDeaths = document.querySelector("#todayDeaths");

function pushData() {
  let country = document.getElementById("countries").value;

  fetch(`https://coronavirus-19-api.herokuapp.com/countries/${country}`)
    .then((response) => {
      return response.json();
    })
    .catch((err) => alert(err))
    .then((countries) => {
      console.log(countries);
      // countryName.innerHTML = countries.country;
      active.innerHTML = ` Active cases in ${countries.country} <h1 id="casesh1">+${countries.active}</h1>`;
      cases.innerHTML = `Total Cases <h1>${countries.cases}</h1>`;
      casesToday.innerHTML = `Today's cases in ${countries.country} <h1>${countries.todayCases}</h1>`;

      deaths.innerHTML = `Total deaths in ${countries.country} <h1 >${countries.deaths}</h1>`;
      todayDeaths.innerHTML = `Today's deaths in ${countries.country} <h1 >${countries.todayDeaths}</h1>`;
      // active.innerHTML = countries.active;
      // perDeath.innerHTML =
      // (countries.deaths * 100) / countries.cases.toFixed(2);
    });
}
