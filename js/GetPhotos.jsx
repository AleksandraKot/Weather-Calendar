import React from 'react';
import GetWeather from './GetWeather.jsx';
const unsplashApiUrl = 'https://api.unsplash.com/photos/random';

class GetPhotos extends React.Component {

  render() {

    function setBg(imgUrl) {
      let container = document.querySelector('.callendar-bg');
      container.style.background = 'url("' + imgUrl + '") center/cover no-repeat';
    }

    function getPhotoByWeatherCode(code) {

      fetch(unsplashApiUrl + '?orientation=landscape&query=' + code, {
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
        setBg(data.urls.regular);
      }).catch(err => {
        console.log(err);
      });
    }

    return (
      <div className='callendar-bg'>
        {getPhotoByWeatherCode()}
      </div>
    )
  }
}

module.exports = GetPhotos;
