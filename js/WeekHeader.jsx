import React from 'react';
import moment from 'moment';

class WeekHeader extends React.Component {
  render() {
    moment.locale('pl');

    let weekArray = [
        "Pon.", "Wt.", "Śr.", "Czw.", "Pt.", "Sob.", "Niedz."
    ];



    let result = weekArray.map((el) => {
      return (
        <li key={el} className="day-of-week">{el}</li>
      )
    });

    return (
      <div className="week-header">
        <ul>
        {result}
        </ul>
        <div className='week-underline'></div>
      </div>
    )
  }
}
module.exports = WeekHeader;
