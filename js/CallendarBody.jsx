import React from 'react';
import WeekHeader from './WeekHeader.jsx';
import CallendarContent from './CallendarContent.jsx';
import moment from 'moment';

class CallendarBody extends React.Component {
  render() {
    return (
      <main className="callendar-body">
        <WeekHeader/>
        <CallendarContent/>
      </main>
    )
  }
}
module.exports = CallendarBody;
