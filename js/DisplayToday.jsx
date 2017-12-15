import React from 'react';
import moment from 'moment';
const currentDate = moment();

class DisplayToday extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dayOfMonth: currentDate.format('D'),
      weekDayName: currentDate.format('dddd'),
      monthName: currentDate.format('MMMM').toUpperCase(),
      year: currentDate.format('YY')
    }
  }
// state prepared for future features
  render() {
    moment.locale('pl');

    return (
      <section className="display-today">
        <div className="today-content-wrapper">
          <span className="month-and-year">{this.state.monthName}
            '{this.state.year}</span>
          <div className="day-container">
            <span className="day-name">{this.state.weekDayName}</span>
            <span className="day-nb">{this.state.dayOfMonth}</span>
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
