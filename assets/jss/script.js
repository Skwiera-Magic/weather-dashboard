let log = console.log.bind(document)
let apiKey = '9ad056eba8f6a8e60e24aa47ad3f2ea9'

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
    let lat = response[0].lat
    let lon = response[0].lon
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (weatherResponse) {
      log(weatherResponse)
      $('#today').prepend(`
      <table class="table">
      <p><h3>${weatherResponse.name} ${moment().format('DD/MM/YYYY')}</h3></p>
      <p>Temperature: ${(weatherResponse.main.temp - 273.15).toFixed(2)}C Degrees</p>
      <p>Wind speed: ${weatherResponse.wind.speed}km/h</p>
      <p>Humidity: ${weatherResponse.main.humidity}%</p>
      </table>
      `)
    })
  });

})