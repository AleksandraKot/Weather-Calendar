import React from 'react';
import DisplayToday from './DisplayToday.jsx';
import CallendarBody from './CallendarBody.jsx';
import moment from 'moment';
const weatherApiUrl = 'http://api.weatherbit.io/v2.0/current';
const unsplashApiUrl = 'https://api.unsplash.com/photos/random';

class Callendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherName: null,
      temp: "",
      weatherDescription: "",
      weatherIcoSymbol: ""
    }
  }
  // Get all necessary data (weatherAPI, photo API)

  // Weather API:

  getWeather() {
    fetch(weatherApiUrl + '?key=758cdf875de14d1aa6cd09b0da23303b&ip=auto&lang=pl', {method: 'GET'}).then(resp => {
      if (resp.ok)
        return resp.json();
      else
        throw new Error('Błąd sieci!');
      }
    ).then(data => {
      console.log(data);
      this.setState({temp: data.data[0].temp, weatherDescription: data.data[0].weather.description});

      this.getWeatherName(data);

    }).catch(err => {
      console.log(err);
    });
  }
  getWeatherNameAndIcoByCode(weatherCode) {
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
    console.log(weatherInfo);
    this.setState({weatherIcoSymbol: weatherInfo.weatherIcoSymbol})
    return weatherInfo;
  }

  getWeatherName(data) {
    let weatherCode = data.data[0].weather.code;
    console.log(weatherCode);
    let weatherInfo = this.getWeatherNameAndIcoByCode(weatherCode);
    this.setState({weatherName: weatherInfo.weatherWordToSearch})
    this.setBackgroundPhoto();
  }

  // Photo API:

  setBackgroundPhoto() {

    fetch(unsplashApiUrl + '?orientation=landscape&query=' + this.state.weatherName, {
      method: 'GET',
      headers: {
        'Accept-Version': 'v1',
        'Authorization': 'Client-ID 29bf2944cb6750f4fbfbf7e7bbaba77278873320c9818797ec049fb991ebeffc'
      }
    }).then(resp => {
      if (resp.ok)
        return resp.json();
      else
        throw new Error('Błąd sieci!');
      }
    ).then(data => {
      console.log(data);
      console.log(data.urls.regular);
      this.setBg(data.urls.regular);
    }).catch(err => {
      console.log(err);
    });
  }

  setBg(imgUrl) {
    let container = document.querySelector('.callendar-bg');
    container.style.background = 'url("' + imgUrl + '") center/cover no-repeat';
  }

  handleChangeBgImg = () => {
    this.setBackgroundPhoto();
  }
  // holidays
  chceckIfIsHoliday(dayNumber) {
    let date = moment().set('date', dayNumber);
    let dayOfMonth = date.format("D");
    let monthNumber = date.format('M');
    let year = date.year();

    if (dayOfMonth == 1 && monthNumber == 1)
      return true; // Nowy Rok
    if (dayOfMonth == 5 && monthNumber == 1)
      return true; // 1 maja
    if (dayOfMonth == 5 && monthNumber == 3)
      return true; // 3 maja
    if (dayOfMonth == 8 && monthNumber == 15)
      return true; // Wniebowzięcie Najświętszej Marii Panny, Święto Wojska Polskiego
    if (dayOfMonth == 11 && monthNumber == 1)
      return true; // Dzień Wszystkich Świętych
    if (dayOfMonth == 11 && monthNumber == 11)
      return true; // Dzień Niepodległości
    if (dayOfMonth == 12 && monthNumber == 25)
      return true; // Boże Narodzenie
    if (dayOfMonth == 12 && monthNumber == 26)
      return true; // Boże Narodzenie

    let a = year % 19;
    let b = year % 4;
    let c = year % 7;
    let d = (a * 19 + 24) % 30;
    let e = (2 * b + 4 * c + 6 * d + 5) % 7;
    if (d == 29 && e == 6)
      d -= 7;
    if (d == 28 && e == 6 && a > 10)
      d -= 7;
    let easter = moment(year, 3, 22).add(d + e, 'days');
    if (dayOfMonth.add(-1, 'days') == easter)
      return true; // Wielkanoc (poniedziałek)
    if (dayOfMonth.add(-60, 'days') == easter)
      return true; // Boże Ciało
    return false;
  }

  componentDidMount() {
    console.log('loading weather');
    this.getWeather();
  }

  render() {
    return (
      <div className="callendar-bg">
        <div id="callendar-wrapper">
          <DisplayToday temp={this.state.temp} weatherDescription={this.state.weatherDescription} weatherIcoSymbol={this.state.weatherIcoSymbol}/>
          <CallendarBody/>

        </div>
        <button className="change-bg" onClick={this.handleChangeBgImg}>Nie podoba Ci się tło?</button>
      </div>
    )
  }
}
module.exports = Callendar;
