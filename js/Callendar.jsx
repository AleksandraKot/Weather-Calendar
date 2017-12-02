import React from 'react';
import GetWeather from './GetWeather.jsx';
import GetPhotos from './GetPhotos.jsx';
import CallendarHeader from './CallendarHeader.jsx';

class Callendar extends React.Component {
  render() {
    return (
      <div>

        <GetWeather>
          <CallendarHeader />
        </GetWeather>
      </div>
    )
  }
}
module.exports = Callendar;
