// https://coronavirus-19-api.herokuapp.com/countries
countryName = document.getElementById("c-id");
active = document.getElementById("active");
perDeath = document.getElementById("perDeath");
todayDeaths = document.querySelector("#todayDeaths");
recovered = document.querySelector('.recovered');
tested = document.querySelector('.testing');
critical = document.querySelector('.critical');

document.title = "Covid-19 Tracker || Live Data";

function pushData() {
  let country = document.getElementById("countries").value || "UK";
  fetch(`https://coronavirus-19-api.herokuapp.com/countries/${country}`)
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err))
    .then((countries) => {
      console.log(countries);
      function commaSeparateNumber(val){
        while (/(\d+)(\d{3})/.test(val.toString())){
          val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
          console.log(val)
        }
        return val;
      }
      commaTested = commaSeparateNumber(countries.totalTests);
      // commaActive = commaSeparateNumber(countries.active);
      commaCritical = commaSeparateNumber(countries.critical);
      commaTotalDeaths = commaSeparateNumber(countries.deaths);
      
      ifActive = countries.active === null ? "No Data" : countries.active;
      ifRecovered = countries.recovered === null ? "No Data" : countries.recovered;
      commaRecovered = commaSeparateNumber(ifRecovered)
      
      todayDeaths.innerHTML = `Today's deaths in ${countries.country} <h1 >${countries.todayDeaths}</h1>`;
      deaths.innerHTML = `Today's cases in  ${countries.country} <h1 >${countries.todayCases}</h1>`;
      active.innerHTML = ` <p>${ifActive}</p>`
      recovered.innerHTML = ` <p>${ifRecovered}</p>`
      critical.innerHTML= `<p> ${countries.critical}</p>`
      totalDeaths.innerHTML = `<p>${countries.deaths}</p>`
      tested.innerHTML = `<h3>${countries.totalTests}</h3>`;
      
      

      document.title = `${countries.country} Covid-19 Tracker || Live Data`
      

    });
}

