let log = console.log.bind(document)
let apiKey = '9ad056eba8f6a8e60e24aa47ad3f2ea9'
let cities = [];

// setting up event listener on search button
$('.search-button').on('click', function (event) {
  // preventing text from the form to be pushed to end of the link
  event.preventDefault()
  // text from form is sent to api changing it to cooridinates
  let city = $("#search-input").val().trim();
  let geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&units=metric&appid=${apiKey}`
  fetch(geoURL)
    .then(response => response.json())
    .then(function (response) {
      let lat = response[0].lat
      let lon = response[0].lon
      // after coordinates are received back they are immidiately sent to weather api
      let queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&cnt=6`
      return fetch(queryURL)
    })
    .then(response => response.json())
    .then(function renderForecast(weatherResponse) {
      let city = weatherResponse.city.name
      // results are appended to site after clearing out previous results
      $('#today').empty()
      $('#today').append(`
      <div class="border p-2">
      <h3>${city}, ${weatherResponse.city.country} - ${moment().format('DD/MM/YYYY')}</h3>
      <img src="https://openweathermap.org/img/wn/${weatherResponse.list[0].weather[0].icon}.png"></img>
      <p>Temperature: ${(weatherResponse.list[0].main.temp - 273.15).toFixed(2)}°C</p>
      <p>Feels Like: ${(weatherResponse.list[0].main.feels_like - 273.15).toFixed(2)}°C</p>
      <p>Wind speed: ${weatherResponse.list[0].wind.speed}km/h</p>
      <p>Humidity: ${weatherResponse.list[0].main.humidity}%</p>
      </div>
      `)
      // adding history search button after pressing search button 
      if (!(cities.includes(city))) {
        cities.push(city)
        localStorage.setItem('cities', JSON.stringify(cities))
        $('#history').append(`
      <button class='btn btn-secondary m-1'>${city}</button>
      `)
      }
      // pushing forecast to the site after removing previous results
      $('#forecast').empty()
      $('#forecast').append(`
      <div class='container'>
      <div class='row'>
      <h3>5-Day Forecast:</h3>
      <div class="col-sm forecast-1 m-1 bg-info text-light border">
      <p>${moment().add(1, 'days').format('DD/MM/YYYY')}</p> 
      <img src="https://openweathermap.org/img/wn/${weatherResponse.list[1].weather[0].icon}.png"></img>
      <p>Temperature: ${(weatherResponse.list[1].main.temp - 273.15).toFixed(2)}°C</p>
      <p>Feels Like: ${(weatherResponse.list[1].main.feels_like - 273.15).toFixed(2)}°C</p>
      <p>Wind: ${weatherResponse.list[1].wind.speed}Km/h</p>
      <p>Humidity: ${weatherResponse.list[1].main.humidity}%</p>
      </div>
      <div class="col-sm forecast-2 m-1 bg-info text-light border">
      <p>${moment().add(2, 'days').format('DD/MM/YYYY')}</p>
      <img src="https://openweathermap.org/img/wn/${weatherResponse.list[2].weather[0].icon}.png"></img>
      <p>Temperature: ${(weatherResponse.list[2].main.temp - 273.15).toFixed(2)}°C</p>
      <p>Feels Like: ${(weatherResponse.list[2].main.feels_like - 273.15).toFixed(2)}°C</p>
      <p>Wind: ${weatherResponse.list[2].wind.speed}Km/h</p>
      <p>Humidity: ${weatherResponse.list[2].main.humidity}%</p>      
      </div>
      <div class="col-sm forecast-3 m-1 bg-info text-light border">
      <p>${moment().add(3, 'days').format('DD/MM/YYYY')}</p>
      <img src="https://openweathermap.org/img/wn/${weatherResponse.list[3].weather[0].icon}.png"></img>
      <p>Temperature: ${(weatherResponse.list[3].main.temp - 273.15).toFixed(2)}°C</p>
      <p>Feels Like: ${(weatherResponse.list[3].main.feels_like - 273.15).toFixed(2)}°C</p>
      <p>Wind: ${weatherResponse.list[3].wind.speed}Km/h</p>
      <p>Humidity: ${weatherResponse.list[3].main.humidity}%</p>      
      </div>
      <div class="col-sm forecast-4 m-1 bg-info text-light border">
      <p>${moment().add(4, 'days').format('DD/MM/YYYY')}</p>
      <img src="https://openweathermap.org/img/wn/${weatherResponse.list[4].weather[0].icon}.png"></img>
      <p>Temperature: ${(weatherResponse.list[4].main.temp - 273.15).toFixed(2)}°C</p>
      <p>Feels Like: ${(weatherResponse.list[4].main.feels_like - 273.15).toFixed(2)}°C</p>
      <p>Wind: ${weatherResponse.list[4].wind.speed}Km/h</p>
      <p>Humidity: ${weatherResponse.list[4].main.humidity}%</p>
      </div>
      <div class="col-sm forecast-5 m-1 bg-info text-light border">
      <p>${moment().add(5, 'days').format('DD/MM/YYYY')}</p>
      <img src="https://openweathermap.org/img/wn/${weatherResponse.list[5].weather[0].icon}.png"></img>
      <p>Temperature: ${(weatherResponse.list[5].main.temp - 273.15).toFixed(2)}°C</p>
      <p>Feels Like: ${(weatherResponse.list[5].main.feels_like - 273.15).toFixed(2)}°C</p>
      <p>Wind: ${weatherResponse.list[5].wind.speed}Km/h</p>
      <p>Humidity: ${weatherResponse.list[5].main.humidity}%</p>      
      </div>
      </div>
      </div>
      `)
    })
});

//todo: preferably put both search and and history rendering in one function
// basically repeating lines 6-95 with minor changes like not appending history buttons
$('#history').on('click', function (event) {
  if (event.target.matches('button')) {
    let historyButton = event.target
    let city = historyButton.innerText;
    // text from button is sent to api changing it to cooridinates
    let geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&units=metric&appid=${apiKey}`
    fetch(geoURL)
      .then(response => response.json())
      .then(function (response) {
        let lat = response[0].lat
        let lon = response[0].lon
        let queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&cnt=6`
        return fetch(queryURL)
      })
      .then(response => response.json())
      .then(function renderForecast(weatherResponse) {
        let city = weatherResponse.city.name
        $('#today').empty()
        $('#today').append(`
        <div class="border p-2">
        <h3>${city}, ${weatherResponse.city.country} - ${moment().format('DD/MM/YYYY')}</h3>
        <img src="https://openweathermap.org/img/wn/${weatherResponse.list[0].weather[0].icon}.png"></img>
        <p>Temperature: ${(weatherResponse.list[0].main.temp - 273.15).toFixed(2)}°C</p>
        <p>Feels Like: ${(weatherResponse.list[0].main.feels_like - 273.15).toFixed(2)}°C</p>
        <p>Wind speed: ${weatherResponse.list[0].wind.speed}km/h</p>
        <p>Humidity: ${weatherResponse.list[0].main.humidity}%</p>
        </div>
        `)
        // pushing forecast to the site after removing previous results
        $('#forecast').empty()
        $('#forecast').append(`
        <div class='container'>
        <div class='row'>
        <h3>5-Day Forecast:</h3>
        <div class="col-sm forecast-1 m-1 bg-info text-light border">
        <p>${moment().add(1, 'days').format('DD/MM/YYYY')}</p>
        <img src="https://openweathermap.org/img/wn/${weatherResponse.list[1].weather[0].icon}.png"></img>
        <p>Temperature: ${(weatherResponse.list[1].main.temp - 273.15).toFixed(2)}°C</p>
        <p>Feels Like: ${(weatherResponse.list[1].main.feels_like - 273.15).toFixed(2)}°C</p>
        <p>Wind: ${weatherResponse.list[1].wind.speed}Km/h</p>
        <p>Humidity: ${weatherResponse.list[1].main.humidity}%</p>
        </div>
        <div class="col-sm forecast-2 m-1 bg-info text-light border">
        <p>${moment().add(2, 'days').format('DD/MM/YYYY')}</p>
        <img src="https://openweathermap.org/img/wn/${weatherResponse.list[2].weather[0].icon}.png"></img>
        <p>Temperature: ${(weatherResponse.list[2].main.temp - 273.15).toFixed(2)}°C</p>
        <p>Feels Like: ${(weatherResponse.list[2].main.feels_like - 273.15).toFixed(2)}°C</p>
        <p>Wind: ${weatherResponse.list[2].wind.speed}Km/h</p>
        <p>Humidity: ${weatherResponse.list[2].main.humidity}%</p>      
        </div>
        <div class="col-sm forecast-3 m-1 bg-info text-light border">
        <p>${moment().add(3, 'days').format('DD/MM/YYYY')}</p>
        <img src="https://openweathermap.org/img/wn/${weatherResponse.list[3].weather[0].icon}.png"></img>
        <p>Temperature: ${(weatherResponse.list[3].main.temp - 273.15).toFixed(2)}°C</p>
        <p>Feels Like: ${(weatherResponse.list[3].main.feels_like - 273.15).toFixed(2)}°C</p>
        <p>Wind: ${weatherResponse.list[3].wind.speed}Km/h</p>
        <p>Humidity: ${weatherResponse.list[3].main.humidity}%</p>      
        </div>
        <div class="col-sm forecast-4 m-1 bg-info text-light border">
        <p>${moment().add(4, 'days').format('DD/MM/YYYY')}</p>
        <img src="https://openweathermap.org/img/wn/${weatherResponse.list[4].weather[0].icon}.png"></img>
        <p>Temperature: ${(weatherResponse.list[4].main.temp - 273.15).toFixed(2)}°C</p>
        <p>Feels Like: ${(weatherResponse.list[4].main.feels_like - 273.15).toFixed(2)}°C</p>
        <p>Wind: ${weatherResponse.list[4].wind.speed}Km/h</p>
        <p>Humidity: ${weatherResponse.list[4].main.humidity}%</p>
        </div>
        <div class="col-sm forecast-5 m-1 bg-info text-light border">
        <p>${moment().add(5, 'days').format('DD/MM/YYYY')}</p>
        <img src="https://openweathermap.org/img/wn/${weatherResponse.list[5].weather[0].icon}.png"></img>
        <p>Temperature: ${(weatherResponse.list[5].main.temp - 273.15).toFixed(2)}°C</p>
        <p>Feels Like: ${(weatherResponse.list[5].main.feels_like - 273.15).toFixed(2)}°C</p>
        <p>Wind: ${weatherResponse.list[5].wind.speed}Km/h</p>
        <p>Humidity: ${weatherResponse.list[5].main.humidity}%</p>      
        </div>
        </div>
        </div>
        `)
      })

  }
})


// prepending history buttons based on cities stored in local storage
if (localStorage.getItem('cities') !== null) {
  cities = JSON.parse(localStorage.cities)
  for (let i = 0; i < cities.length; i++) {
    $('#history').append(`
      <button class='btn btn-secondary m-1'>${cities[i]}</button>
      `)
  }
}

// adding style and prepending clear history button to #history
$('#history').addClass('border')
$('#history').prepend(`
      <div class='btn btn-warning m-1'>Clear History</div>
      `)

// removing cities from local storage when 'clear history' div is clicked
$('.btn-warning').on('click', function () {
  localStorage.removeItem('cities')
  $('#history').empty()
  $('#history').prepend(`
        <div class='btn btn-warning m-1'>Clear History</div>
        `)
})