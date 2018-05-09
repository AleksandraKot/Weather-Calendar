import React from 'react';
import DisplayToday from './DisplayToday.jsx';
import CalendarBody from './CalendarBody.jsx';
import WeatherHelper from './WeatherHelper.js';
import moment from 'moment';
const weatherApiUrl = 'http://api.weatherbit.io/v2.0/current';
const weatherApi16DaysUrl = 'http://api.weatherbit.io/v2.0/forecast/daily';
const unsplashApiUrl = 'https://api.unsplash.com/photos/random';
const unsplashUrl = 'https://www.unsplash.com';

class Calendar extends React.Component {
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
        this.setState({temp: data.data[0].temp, weatherDescription: data.data[0].weather.description});
        this.getWeatherName(data);
      }).catch(err => {
        console.log(err);
      });
  }

  getWeatherName(data) {
    let weatherCode = data.data[0].weather.code;
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
    this.getWeather();
    this.set16dayWeatherData();

    // this.interval = setInteraval(() => {
    //   this.getWeather();
    // }, 60000);
  }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  render() {
    return (
      <div className="calendar-bg">
        <div id="calendar-wrapper">
          <DisplayToday temp={this.state.temp} weatherDescription={this.state.weatherDescription} weatherIcoSymbol={this.state.weatherIcoSymbol}/>
          <CalendarBody weather16day={this.state.weather16day}/>
        </div>
        <button className="button-change-bg" onClick={this.handleChangeBgImg}>Zmień tło</button>
        <div className="credentials">
          Zdjęcie {this.state.author} z <a href={unsplashUrl} target="_blank">Unsplash</a>
        </div>
      </div>
    )
  }
}
module.exports = Calendar;
