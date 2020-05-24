if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
    .then(registration => {
      console.log('SW registered with scope:', registration.scope);
    })
    .catch(err => {
      console.error('Registration failed:', err);
    });
  });
}
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
  let country = document.getElementById("countries"); 
  countryA = country.value;
  fetch(`https://coronavirus-19-api.herokuapp.com/countries/${countryA || 'Spain'}`)
    .then((response) => {
      return response.json();
    })
    .catch((err) => alert("Please type in a country name"))
    .then((countries) => {
      console.log(countries.totalTests)
      
      function commaSeparateNumber(val){
        while (/(\d+)(\d{3})/.test(val.toString())){
          val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
        }
        return val;
      }
      
      country.value = "";
      commaTested = commaSeparateNumber(countries.totalTests);
      commaCritical = commaSeparateNumber(countries.critical);
      commaTotalDeaths = commaSeparateNumber(countries.deaths);
      
      ifActive = countries.active === null ? "No Data" : countries.active;
      ifRecovered = countries.recovered === null ? "No Data" : countries.recovered;
      commaRecovered = commaSeparateNumber(ifRecovered)
      commaActive = commaSeparateNumber(ifActive);
      console.log(commaActive);
      
      todayDeaths.innerHTML = `Today's deaths in ${countries.country} <h1 >${countries.todayDeaths}</h1>`;
      deaths.innerHTML = `Today's cases in  ${countries.country} <h1 >${countries.todayCases}</h1>`;
      active.innerHTML = ` <p>${commaActive}</p>`
      recovered.innerHTML = ` <p>${commaRecovered}</p>`
      critical.innerHTML= `<p> ${commaCritical}</p>`
      totalDeaths.innerHTML = `<p>${commaTotalDeaths}</p>`
      tested.innerHTML = `<h3>${commaTested}</h3>`;
      document.title = `${countries.country} Covid-19 Tracker || Live Data`
    });
  }
