import React from 'react';
import moment from 'moment';

class CallendarContent extends React.Component {

  // Check holiday days
  chceckIfIsHoliday(dayNumber) {
    let date = moment().set('date', dayNumber);
    let dayOfMonth = date.format("D");
    let monthNumber = date.format('M');
    let year = date.year();

    if (dayOfMonth == 1 && monthNumber == 1)
      return "Nowy Rok";
    if (dayOfMonth == 6 && monthNumber == 1)
      return "Trzech Króli";
    if (dayOfMonth == 1 && monthNumber == 5)
      return "Swięto Pracy";
    if (dayOfMonth == 3 && monthNumber == 5)
      return "Święto Konstytucji Trzeciego Maja";
    if (dayOfMonth == 15 && monthNumber == 8)
      return "Wniebowzięcie Najświętszej Marii Panny";
    if (dayOfMonth == 1 && monthNumber == 11)
      return "Dzień Wszystkich Świętych";
    if (dayOfMonth == 11 && monthNumber == 11)
      return "Dzień Niepodległości";
    if (dayOfMonth == 24 && monthNumber == 12)
      return "Wigilia";
    if (dayOfMonth == 25 && monthNumber == 12)
      return "Boże Narodzenie";
    if (dayOfMonth == 26 && monthNumber == 12)
      return "Boże Narodzenie";
    if (dayOfMonth == 31 && monthNumber == 12)
      return "Sylwester";

    let a = year % 19;
    let b = year % 4;
    let c = year % 7;
    let d = (a * 19 + 24) % 30;
    let e = (2 * b + 4 * c + 6 * d + 5) % 7;
    if (d == 29 && e == 6)
      d -= 7;
    if (d == 28 && e == 6 && a > 10)
      d -= 7;
    let easter = moment().set({'year': year, 'month': 2, 'date': 22}).add(d + e, 'days');
    if (date.add(-1, 'days') == easter)
      return "Wielkanoc";
    if (date.add(-60, 'days') == easter)
      return "Boże Ciało";
    return null;
  }

  render() {
    let firstWeekdayOfMonth = moment().startOf('month').day();
    let daysInCallendarArray = [];
    let numberOfMonthDays = moment().daysInMonth();
    let totalNumberOfDays = firstWeekdayOfMonth + numberOfMonthDays;

    for (let i = 1; i < firstWeekdayOfMonth; i++) {
      daysInCallendarArray.push(
        <div key={i} className="previous-month-day"></div>
      )
    }

    let dayNumber = 1;
    moment.locale('pl');
    let myDate = moment();
    let dayOfMonth = parseInt(myDate.format('D'));

    for (let i = firstWeekdayOfMonth; i < totalNumberOfDays; i++) {
      daysInCallendarArray.push(
        <div key={i} className={i === dayOfMonth + firstWeekdayOfMonth - 1
          ? "active"
          : "single-month-day"}>
          <span key={dayNumber} style={{
            color: this.chceckIfIsHoliday(dayNumber) && '#ff084a'
          }}>{dayNumber}</span>
          <span className="holiday-name" style={{
            color: '#000'
          }}>{this.chceckIfIsHoliday(dayNumber)}</span>
        </div>
      );
      dayNumber++;
    }
    return (
      <div className="callendar-content">{daysInCallendarArray}</div>
    );
  }

}
module.exports = CallendarContent;
