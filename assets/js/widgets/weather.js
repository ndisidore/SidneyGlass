var weather = {
  forecast5: {},
  current: {},
};

weather.getForecastFromAPI = function() {
  var OWMurl = 'http://api.openweathermap.org/data/2.5/forecast?' + Utils.encodeObject(config.weather.params);
  ajax(OWMurl).then(function(xhr) {
    var forecastObj = {};
    try {
      forecastObj = JSON.parse(xhr.responseText);
      weather.forecastNextFive(forecastObj);
    } catch (err) {
      console.log('ERROR: JSON parse', xhr.responseText);
    }
  });
};

weather.getCurrentFromAPI = function() {
  var OWMurl = 'http://api.openweathermap.org/data/2.5/weather?' + Utils.encodeObject(config.weather.params);
  ajax(OWMurl).then(function(xhr) {
    try {
      weather.current = JSON.parse(xhr.responseText);
    } catch (err) {
      console.log('ERROR: JSON parse', xhr.responseText);
    }
  });
};

weather.forecastNextFive = function(allWeather) {
  var i = 0,
    item, dt, year, day;
  while (item = allWeather.list[i++]) {
    dt = new Date(item.dt * 1000);
    month = dt.getMonth();
    day = dt.getDate();
    weather.forecast5[month + '/' + day] || (weather.forecast5[month + '/' + day] = []);
    weather.forecast5[month + '/' + day].push(item);
  }
};

weather.displayWeatherSlot = function(slotWeather) {
  var weatherIcon = weather.iconMap(slotWeather.weather[0].icon);
  return '<td class="weather-icon ' + weatherIcon + '">' + slotWeather.main.temp + '</td>';
};

weather.iconMap = function(iconCode) {
  var icon = '';
  switch (iconCode.substring(0,2)) {
    case "01":
      icon = 'clear'
      break;
    case "02":
      icon = 'few-clouds'
      break;
    case "03":
      icon = 'scattered-clouds'
      break;
    case "04":
      icon = 'broken-clouds'
      break;
    case "09":
      icon = 'showers'
      break;
    case "10":
      icon = 'rain'
      break;
    case "11":
      icon = 'thunderstorm'
      break;
    case "13":
      icon = 'snow'
      break;
    case "50":
      icon = 'mist'
      break;
    default:
  }
  return icon;
}
