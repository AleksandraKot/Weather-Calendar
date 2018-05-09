import React from 'react';
import WeekHeader from './WeekHeader.jsx';
import CalendarContent from './CalendarContent.jsx';

class CalendarBody extends React.Component {

  render() {
    return (
      <main className="calendar-body">
        <WeekHeader/>
        <CalendarContent weather16day={this.props.weather16day}/>
      </main>
    );
  }
}
module.exports = CalendarBody;
