// variable declarations
var city_array = [];
var APIKey = '22871c2d3afa9540f5aa13a5da2e8d7b'
var giphyApiKey='2P3yGmFao847Z9xOBoMSQ5vleT4LHGRB'


// function declarations

function renderCities(){
    var storedCities = JSON.parse(localStorage.getItem('cities'))

    if(storedCities!==null){
        city_array=storedCities
    }

    $('#city-buttons').empty()
    for(var i=0;i<city_array.length;i++){
        city_button=$('<a>');
        city_button.addClass('list-group-item list-group-item-action')
        city_button.text(city_array[i])
        city_button.attr('data-city',city_array[i])

        $('#city-buttons').prepend(city_button)
    }
}

function setupStorage(){
    localStorage.setItem("cities", JSON.stringify(city_array));
}

function displayWeatherOnSubmit(){
    var city = $('#city-input').val()
     var url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=" + APIKey + "&units=imperial";

     $.ajax({url:url,method:'GET'})
      .then(function(response){
        console.log(response)
        var milliseconds = response.dt * 1000
        var dateObject = new Date(milliseconds)
        var humanDateFormat = dateObject.toLocaleString()
         $('#city-title').text(response.name)
         $('#weather-icon').attr('src',"http://openweathermap.org/img/wn/"+response.weather[0].icon+"@2x.png")
         $('#date').text(humanDateFormat)
         $('#temprature').text("Temp: "+response.main.temp+"°F")
         $('#humidity').text("Humidity: "+response.main.humidity+'%')
         $('#wind-speed').text("Wind-Speed: "+response.wind.speed+'MPH')

         var giphyUrl = "http://api.giphy.com/v1/gifs/search?q="+response.weather[0].description+"&api_key="+giphyApiKey+"&limit=1"

         $.ajax({url:giphyUrl,method:'GET'})
         .then(function(giphyResponse){
             console.log(giphyResponse.data[0].embed_url)
             $('#weather-giphy').attr('src',giphyResponse.data[0].embed_url)
         })
     })
}

function displayWeatherOnClick(){
    var city = $(this).attr('data-city')
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=" + APIKey + "&units=imperial";

    $.ajax({url:url,method:'GET'})
      .then(function(response){
        var milliseconds = response.dt * 1000
        var dateObject = new Date(milliseconds)
        var humanDateFormat = dateObject.toLocaleString()
         $('#city-title').text(response.name)
         $('#weather-icon').attr('src',"http://openweathermap.org/img/wn/"+response.weather[0].icon+"@2x.png")
         $('#date').text(humanDateFormat)
         $('#temprature').text("Temp: "+response.main.temp+"°F")
         $('#humidity').text("Humidity: "+response.main.humidity+'%')
         $('#wind-speed').text("Wind-Speed: "+response.wind.speed+'MPH')

         var giphyUrl = "http://api.giphy.com/v1/gifs/search?q="+response.weather[0].description+"&api_key="+giphyApiKey+"&limit=1"

         $.ajax({url:giphyUrl,method:'GET'})
         .then(function(giphyResponse){
             console.log(giphyResponse.data[0].embed_url)
             $('#weather-giphy').attr('src',giphyResponse.data[0].embed_url)
         })
     })
}



//event handlers 
$('#city-submit-button').on('click',function(event){
    event.preventDefault();
    
    var city_name=$('#city-input').val().trim();
    city_array.push(city_name)
    setupStorage();
    displayWeatherOnSubmit();
    renderCities();

    $('#city-input').val('')
})

$(document).on("click",'.list-group-item', displayWeatherOnClick);

renderCities();


