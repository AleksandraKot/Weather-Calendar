import React from 'react';

class CallendarHeader extends React.Component {
  render() {
    let presentTime = new Date();
    return (
      <div className='callendar-header'>
        <header className='year-header'>{presentTime.getFullYear()}</header>
        <section className='month-name'>Gudzień</section>
        <div className='full-today-date'>{presentTime.toDateString()}</div>
      </div>
    )
  }
}

module.exports = CallendarHeader;
