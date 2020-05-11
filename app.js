// https://coronavirus-19-api.herokuapp.com/countries
countryName = document.getElementById("c-id");
active = document.getElementById("active");
perDeath = document.getElementById("perDeath");
todayDeaths = document.querySelector("#todayDeaths");
recovered = document.querySelector('.recovered');

document.title = "Covid-19 Tracker || Live Data";

function pushData() {
  let country = document.getElementById("countries").value;
  fetch(`https://coronavirus-19-api.herokuapp.com/countries/${country}`)
    .then((response) => {
      return response.json();
    })
    .catch((err) => alert(err))
    .then((countries) => {
      console.log(countries);
      ifRecovered = countries.recovered === null ? 0 : countries.recovered;
      console.log(ifRecovered)
      todayDeaths.innerHTML = `Today's deaths in ${countries.country} <h1 >${countries.todayDeaths}</h1>`;
      deaths.innerHTML = `Today's cases in  ${countries.country} <h1 >${countries.todayCases}</h1>`;
      active.innerHTML = ` <p>${countries.active}</p>`
      recovered.innerHTML = ` <p>${ifRecovered}</p>`
      totalDeaths.innerHTML = `<p>${countries.deaths}</p>`

      document.title = `${countries.country} Covid-19 Tracker || Live Data`
      

    });
}

