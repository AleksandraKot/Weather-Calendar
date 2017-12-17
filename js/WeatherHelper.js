module.exports = {
  getWeatherNameAndIcoByCode: function(weatherCode) {
    let weatherInfo;
    switch (weatherCode) {
      case '200':
      case '201':
      case '202':
      case '230':
      case '231':
      case '232':
      case '233':
        {
          weatherInfo = {
            weatherWordToSearch: 'thunderstorm',
            weatherIcoSymbol: "0"
          }
          break;
        }
      case '300':
      case '301':
      case '302':
      case '500':
      case '501':
      case '502':
      case '511':
      case '520':
      case '521':
      case '522':
      case '900':
        {
          weatherInfo = {
            weatherWordToSearch: 'rain',
            weatherIcoSymbol: "R"
          }
          break;
        }
      case '600':
      case '601':
      case '602':
      case '610':
      case '611':
      case '612':
      case '621':
      case '622':
      case '623':
        {
          weatherInfo = {
            weatherWordToSearch: 'snow',
            weatherIcoSymbol: "W"
          }
          break;
        }
      case '700':
      case '711':
      case '721':
      case '731':
      case '741':
      case '751':
        {
          weatherInfo = {
            weatherWordToSearch: 'fog',
            weatherIcoSymbol: "L"
          }
          break;
        }
      case '800':
        {
          weatherInfo = {
            weatherWordToSearch: ' nature sun',
            weatherIcoSymbol: "B"
          }
          break;
        }
      case '801':
      case '802':
      case '803':
      case '804':
        {
          weatherInfo = {
            weatherWordToSearch: 'cloudy',
            weatherIcoSymbol: "Y"
          }
          break;
        }

    }
    return weatherInfo;
  }
}
