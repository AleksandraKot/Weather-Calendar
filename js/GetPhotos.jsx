import React from 'react';
import GetWeather from './GetWeather.jsx';
const unsplashApiUrl = 'https://api.unsplash.com/photos/random';

class GetPhotos extends React.Component {

  componentDidMount(){
    this.getPhotoByWeatherCode(this.props.weatherName);
  }

  setBg(imgUrl) {
    let container = document.querySelector('.callendar-bg');
    console.log('container');
    container.style.background = 'url("' + imgUrl + '") center/cover no-repeat';
  }

  getPhotoByWeatherCode(weatherName) {

    fetch(unsplashApiUrl + '?orientation=landscape&query=' + weatherName, {
      method: 'GET',
      headers: {
        'Accept-Version': 'v1',
        'Authorization': 'Client-ID 29bf2944cb6750f4fbfbf7e7bbaba77278873320c9818797ec049fb991ebeffc'
      }
      })
      .then(resp => {
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

  render() {
    return (
      <div className='callendar-bg'>
        {this.props.children}
      </div>
    )
  }
}

module.exports = GetPhotos;
