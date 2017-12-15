import React from 'react';
import moment from 'moment';

moment.locale('pl');

class WeekHeader extends React.Component {
  constructor(props) {
    super(props);
    this.weekArray = [
      "Pon.",
      "Wt.",
      "Śr.",
      "Czw.",
      "Pt.",
      "Sob.",
      "Niedz."
    ];
  }

  render() {

    let result = this.weekArray.map((el) => {
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
