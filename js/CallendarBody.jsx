import React from 'react';
import WeekHeader from './WeekHeader.jsx';
import CallendarContent from './CallendarContent.jsx';

class CallendarBody extends React.Component {

  render() {
    return (
      <main className="callendar-body">
        <WeekHeader/>
        <CallendarContent weather16day={this.props.weather16day}/>
      </main>
    );
  }
}
module.exports = CallendarBody;
