import React from 'react';
const weatherApiUrl = 'http://api.weatherbit.io/v2.0/current';
import GetPhotos from './GetPhotos.jsx';

class GetWeather extends React.Component {

  constructor (props){
    super(props);
    this.state = {
      weatherName: null
    }
  }

  componentDidMount(){
    console.log('loading weather');
    this.getWeather();
  }

  getWeatherNameByCode(weatherCode) {
    let weatherWordToSearch;
    switch (weatherCode) {
      case '200':
      case '201':
      case '202':
      case '230':
      case '231':
      case '232':
      case '233':
        {
          weatherWordToSearch = 'thunderstorm';
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
          weatherWordToSearch = 'rain';
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
          weatherWordToSearch = 'snow';
          break;
        }
      case '700':
      case '711':
      case '721':
      case '731':
      case '741':
      case '751':
        {
          weatherWordToSearch = 'fog';
          break;
        }
      case '800':
        {
          weatherWordToSearch = 'sun';
          break;
        }
      case '801':
      case '802':
      case '803':
        {
          weatherWordToSearch = 'cloudy';
          break;
        }
      case '804':
        {
          weatherWordToSearch = 'overcast clouds'
          break;
        }
    }
    console.log(weatherWordToSearch);
    return weatherWordToSearch;
  }

  getWeatherName(data) {
    let weatherCode = data.data[0].weather.code;
    console.log(weatherCode);
    let weatherName = this.getWeatherNameByCode(weatherCode);
    return weatherName;

  }

  getWeather() {

    fetch(weatherApiUrl + '?key=758cdf875de14d1aa6cd09b0da23303b&ip=auto', {
      method: 'GET'
      })
      .then(resp => {
      if (resp.ok)
        return resp.json();
      else
        throw new Error('Błąd sieci!');
      }
    ).then(data => {
      console.log(data);
      this.setState({weatherName: this.getWeatherName(data) });
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    if(this.state.weatherName == null) return null;

    return <GetPhotos weatherName={this.state.weatherName}>
              {this.props.children}
            </GetPhotos>

  }
}
module.exports = GetWeather;
