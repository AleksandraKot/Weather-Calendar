import React from 'react';
import moment from 'moment';

class DisplayToday extends React.Component {
  render() {
    moment.locale('pl');
    let myDate = moment();
    let dayOfMonth = myDate.format('D');

    let weekDayName =  myDate.format('dddd');
    let monthName = myDate.format('MMMM').toUpperCase();
    let year = myDate.format('YY');
    return (
       <section className="display-today">
         <div className="today-content-wrapper">
           <span className="month-and-year">{monthName} '{year}</span>
           <div className="day-container">
             <span className="day-name">{weekDayName}</span>
             <span className="day-nb">{dayOfMonth}</span>
           </div>
           <div className="day-undeline"></div>
           <span className="weather-description">{this.props.weatherDescription}</span>
           <div className="temperature-container">
             <span className="temp-label">Temp:<br></br>
               <span className="degrees">{this.props.temp}&deg;C</span>
             </span>
             <span className="weather-icon" data-icon={this.props.weatherIcoSymbol}></span>
           </div>
         </div>
       </section>
     )
  }
}
module.exports = DisplayToday;
