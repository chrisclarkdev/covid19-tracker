// https://coronavirus-19-api.herokuapp.com/countries
countryName = document.getElementById("c-id");
active = document.getElementById("active");
perDeath = document.getElementById("perDeath");

function pushData() {
  let country = document.getElementById("countries").value;

  fetch(`https://coronavirus-19-api.herokuapp.com/countries/${country}`)
    .then((response) => {
      return response.json();
    })
    .catch((err) => alert(err))
    .then((countries) => {
      // console.log(countrieeaths);
      // countryName.innerHTML = countries.country;
      active.innerHTML = `${countries.country} active cases: ${countries.active}`;
      cases.innerHTML = countries.cases;
      casesToday.innerHTML = countries.todayCases;
      deaths.innerHTML = countries.deaths;
      // active.innerHTML = countries.active;
      // perDeath.innerHTML =
      // (countries.deaths * 100) / countries.cases.toFixed(2);
    });
}
