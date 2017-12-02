import React from 'react';
import GetWeather from './GetWeather.jsx';
import GetPhotos from './GetPhotos.jsx';
import CallendarHeader from './CallendarHeader.jsx';

class Callendar extends React.Component {
  render() {
    return (
      <div>
        <CallendarHeader />
        <GetWeather />
        <GetPhotos />
      </div>
    )
  }
}
module.exports = Callendar;
