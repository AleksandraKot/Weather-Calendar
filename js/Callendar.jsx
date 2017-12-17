import React from 'react';
import DisplayToday from './DisplayToday.jsx';
import CallendarBody from './CallendarBody.jsx';
import WeatherHelper from './WeatherHelper.js';
import moment from 'moment';
const weatherApiUrl = 'http://api.weatherbit.io/v2.0/current';
const weatherApi16DaysUrl = 'http://api.weatherbit.io/v2.0/forecast/daily';
const unsplashApiUrl = 'https://api.unsplash.com/photos/random';
const unsplashUrl = 'https://www.unsplash.com';

class Callendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherName: null,
      temp: "",
      weatherDescription: "",
      weatherIcoSymbol: "",
      author: "",
      weather16day: null
    }
  }

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
  // getWeatherNameAndIcoByCode(weatherCode) {
  //   let weatherInfo;
  //   switch (weatherCode) {
  //     case '200':
  //     case '201':
  //     case '202':
  //     case '230':
  //     case '231':
  //     case '232':
  //     case '233':
  //       {
  //         weatherInfo = {
  //           weatherWordToSearch: 'thunderstorm',
  //           weatherIcoSymbol: "0"
  //         }
  //         break;
  //       }
  //     case '300':
  //     case '301':
  //     case '302':
  //     case '500':
  //     case '501':
  //     case '502':
  //     case '511':
  //     case '520':
  //     case '521':
  //     case '522':
  //     case '900':
  //       {
  //         weatherInfo = {
  //           weatherWordToSearch: 'rain',
  //           weatherIcoSymbol: "R"
  //         }
  //         break;
  //       }
  //     case '600':
  //     case '601':
  //     case '602':
  //     case '610':
  //     case '611':
  //     case '612':
  //     case '621':
  //     case '622':
  //     case '623':
  //       {
  //         weatherInfo = {
  //           weatherWordToSearch: 'snow',
  //           weatherIcoSymbol: "W"
  //         }
  //         break;
  //       }
  //     case '700':
  //     case '711':
  //     case '721':
  //     case '731':
  //     case '741':
  //     case '751':
  //       {
  //         weatherInfo = {
  //           weatherWordToSearch: 'fog',
  //           weatherIcoSymbol: "L"
  //         }
  //         break;
  //       }
  //     case '800':
  //       {
  //         weatherInfo = {
  //           weatherWordToSearch: ' nature sun',
  //           weatherIcoSymbol: "B"
  //         }
  //         break;
  //       }
  //     case '801':
  //     case '802':
  //     case '803':
  //     case '804':
  //       {
  //         weatherInfo = {
  //           weatherWordToSearch: 'cloudy',
  //           weatherIcoSymbol: "Y"
  //         }
  //         break;
  //       }
  //
  //   }
  //   console.log(weatherInfo);
  //   this.setState({weatherIcoSymbol: weatherInfo.weatherIcoSymbol})
  //   return weatherInfo;
  // }

  getWeatherName(data) {
    let weatherCode = data.data[0].weather.code;
    console.log(weatherCode);
    let weatherInfo = WeatherHelper.getWeatherNameAndIcoByCode(weatherCode);
    this.setState({
      weatherIcoSymbol: weatherInfo.weatherIcoSymbol,
      weatherName: weatherInfo.weatherWordToSearch
    });
    this.setBackgroundPhoto();
  }

  set16dayWeatherData() {
    fetch(weatherApi16DaysUrl + '?key=5e410e7003cc479d9e2d2e827677ee3b&ip=auto&lang=pl', {method: 'GET'}).then(resp => {
      if (resp.ok)
        return resp.json();
      else
        throw new Error('Błąd sieci!');
      }
    ).then(data => {
      this.setState({weather16day: data.data});

    }).catch(err => {
      console.log(err);
    });
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
      this.setAuthorOfPhoto(data.user.name);
    }).catch(err => {
      console.log(err);
    });
  }
  setAuthorOfPhoto(name) {
    this.setState({author: name});
  }

  setBg(imgUrl) {
    let container = document.querySelector('.callendar-bg');
    container.style.background = 'url("' + imgUrl + '") center/cover no-repeat';
  }

  handleChangeBgImg = () => {
    this.setBackgroundPhoto();
  }

  componentDidMount() {
    console.log('loading weather');
    this.getWeather();
    this.set16dayWeatherData();
  }

  render() {
    return (
      <div className="callendar-bg">
        <div id="callendar-wrapper">
          <DisplayToday temp={this.state.temp} weatherDescription={this.state.weatherDescription} weatherIcoSymbol={this.state.weatherIcoSymbol}/>
          <CallendarBody weather16day={this.state.weather16day}/>
        </div>
        <button className="button-change-bg" onClick={this.handleChangeBgImg}>Nie podoba Ci się tło?</button>
        <div className="credentials">
          Zdjęcie {this.state.author} z <a href={unsplashUrl} target="_blank">Unsplash</a>
        </div>
      </div>
    )
  }
}
module.exports = Callendar;
