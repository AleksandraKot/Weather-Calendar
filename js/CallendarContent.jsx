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
      return true; // Nowy Rok
    if (dayOfMonth == 6 && monthNumber == 1)
      return true; // Trzech Króli
    if (dayOfMonth == 1 && monthNumber ==5)
      return true; // 1 maja
    if (dayOfMonth == 3 && monthNumber == 5)
      return true; // 3 maja
    if (dayOfMonth == 15 && monthNumber == 8)
      return true; // Wniebowzięcie Najświętszej Marii Panny, Święto Wojska Polskiego
    if (dayOfMonth == 1 && monthNumber == 11)
      return true; // Dzień Wszystkich Świętych
    if (dayOfMonth == 11 && monthNumber == 11)
      return true; // Dzień Niepodległości
    if (dayOfMonth == 25 && monthNumber == 12)
      return true; // Boże Narodzenie
    if (dayOfMonth == 26 && monthNumber == 12)
      return true; // Boże Narodzenie

    let a = year % 19;
    let b = year % 4;
    let c = year % 7;
    let d = (a * 19 + 24) % 30;
    let e = (2 * b + 4 * c + 6 * d + 5) % 7;
    if (d == 29 && e == 6)
      d -= 7;
    if (d == 28 && e == 6 && a > 10)
      d -= 7;
    let easter = moment().set({'year': year, 'month': 2, 'date': 22}).add(d+e, 'days');
    if (date.add(-1, 'days') == easter)
      return true; // Wielkanoc (poniedziałek)
    if (date.add(-60, 'days') == easter)
      return true; // Boże Ciało
    return false;
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
        <div  key={i} className={i===dayOfMonth+firstWeekdayOfMonth-1?"active":"single-month-day"}>
        <span key={dayNumber} style={{color: this.chceckIfIsHoliday(dayNumber)&&'#bf3367'}}>{dayNumber++}</span>
        </div>
      );
    }
    return (
      <div className="callendar-content">{daysInCallendarArray}</div>
    );
  }

}
module.exports = CallendarContent;
