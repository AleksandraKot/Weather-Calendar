import React from 'react';
import monthNames from './Data_month_names.jsx';

class CallendarHeader extends React.Component {

  render() {
    let presentTime = new Date();
    return (
      <div className='callendar-header'>
        <header className='year-header'>{presentTime.getFullYear()}</header>
        <section className='month-name'>{monthNames[presentTime.getMonth()]}</section>
        <div className='full-today-date'>{presentTime.toDateString()}</div>
      </div>
    )
  }
}

module.exports = CallendarHeader;
