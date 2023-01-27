let log = console.log.bind(document)
let apiKey = '9ad056eba8f6a8e60e24aa47ad3f2ea9'

let tomorrow  = moment().add(1,'days').format('DD/MM/YYYY');
console.log(tomorrow)


// $('.form-inline').attr('id', 'form-inline')
// $('#form-inline').removeAttr('class')
// $('#form-inline').attr('class', 'form')
// setting up event listener on search button
$('.search-button').on('click', function (event) {
  // preventing text from the form to be pushed to end of the link
  event.preventDefault()
  // text from form 
  let city = $("#search-input").val().trim();
  let geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&units=metric&appid=${apiKey}`


  $.ajax({
    url: geoURL,
    method: "GET"
  }).then(function (response) {
    //log(response)
    let lat = response[0].lat
    let lon = response[0].lon
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&cnt=6`
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function renderForecast(weatherResponse) {
      log(weatherResponse)
      log(weatherResponse.list[0].main.feels_like)
      $('#today').empty()
      $('#today').append(`
      <div class="border p-2">
      <h3>${weatherResponse.city.name} ${moment().format('DD/MM/YYYY')}</h3>
      <p>Temperature: ${(weatherResponse.list[0].main.feels_like - 273.15).toFixed(2)}C Degrees</p>
      <p>Wind speed: ${weatherResponse.list[0].wind.speed}km/h</p>
      <p>Humidity: ${weatherResponse.list[0].main.humidity}%</p>
      </div>
      `)
      $('#history').prepend(`
      <button class="btn btn-secondary mb-2">${weatherResponse.city.name}</button>
      `)
      // pushing forecast to the site after removing previous results
      $('#forecast').empty()
      $('#forecast').append(`
      <div class="container">
      <div class="row">
      <h3>5-Day Forecast:</h3>
      <div class="col-sm forecast-1 border">
      <p>${moment().add(1,'days').format('DD/MM/YYYY')}</p>
      <img src="https://openweathermap.org/img/wn/${weatherResponse.list[1].weather[0].icon}.png"></img>
      <p>Temp: ${(weatherResponse.list[1].main.feels_like -273.15).toFixed(2)}</p>
      <p>Wind: ${weatherResponse.list[1].wind.speed}Km/h</p>
      <p>Humidity: ${weatherResponse.list[1].main.humidity}%</p>
      </div>
      <div class="col-sm forecast-2 border">
      <p>${moment().add(2,'days').format('DD/MM/YYYY')}</p>
      <img src="https://openweathermap.org/img/wn/${weatherResponse.list[2].weather[0].icon}.png"></img>
      <p>Temp: ${(weatherResponse.list[2].main.feels_like -273.15).toFixed(2)}C</p>
      <p>Wind: ${weatherResponse.list[2].wind.speed}Km/h</p>
      <p>Humidity: ${weatherResponse.list[2].main.humidity}%</p>      
      </div>
      <div class="col-sm forecast-3 border">
      <p>${moment().add(3,'days').format('DD/MM/YYYY')}</p>
      <img src="https://openweathermap.org/img/wn/${weatherResponse.list[3].weather[0].icon}.png"></img>
      <p>Temp: ${(weatherResponse.list[3].main.feels_like -273.15).toFixed(2)}</p>
      <p>Wind: ${weatherResponse.list[3].wind.speed}Km/h</p>
      <p>Humidity: ${weatherResponse.list[3].main.humidity}%</p>      
      </div>
      <div class="col-sm forecast-4 border">
      <p>${moment().add(4,'days').format('DD/MM/YYYY')}</p>
      <img src="https://openweathermap.org/img/wn/${weatherResponse.list[4].weather[0].icon}.png"></img>
      <p>Temp: ${(weatherResponse.list[4].main.feels_like -273.15).toFixed(2)}</p>
      <p>Wind: ${weatherResponse.list[4].wind.speed}Km/h</p>
      <p>Humidity: ${weatherResponse.list[4].main.humidity}%</p>
      </div>
      <div class="col-sm forecast-5 border">
      <p>${moment().add(5,'days').format('DD/MM/YYYY')}</p>
      <img src="https://openweathermap.org/img/wn/${weatherResponse.list[5].weather[0].icon}.png"></img>
      <p>Temp: ${(weatherResponse.list[5].main.feels_like -273.15).toFixed(2)}</p>
      <p>Wind: ${weatherResponse.list[5].wind.speed}Km/h</p>
      <p>Humidity: ${weatherResponse.list[5].main.humidity}%</p>      
      </div>
      </div>
      </div>
      `)
    })
  });

})