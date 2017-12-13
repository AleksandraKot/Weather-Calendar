import React from 'react';
import moment from 'moment';

class CallendarContent extends React.Component {
  render() {
    let firstWeekdayOfMonth = moment().startOf('month').day();
    let daysInCallendarArray = [];
    let numberOfMonthDays = moment().daysInMonth();
    let totalNumberOfDays = firstWeekdayOfMonth + numberOfMonthDays;

    for (let i = 1; i < firstWeekdayOfMonth; i++) {
      daysInCallendarArray.push(
        <div key={i} className="previous-month-day">
          <div className="previous-month-day-content"></div>
        </div>
      )
    }

    let dayNumber = 1;
    moment.locale('pl');
    let myDate = moment();
    let dayOfMonth = parseInt(myDate.format('D'));

    for (let i = firstWeekdayOfMonth; i < totalNumberOfDays; i++) {
      daysInCallendarArray.push(

        <div  key={i} className={i===dayOfMonth+firstWeekdayOfMonth-1?"active":"single-month-day"}>
          <span key={dayNumber}>{dayNumber++}</span>
        </div>
      )
    }

    return (
      <div className="callendar-content">{daysInCallendarArray}</div>
    );
  }

}
module.exports = CallendarContent;
