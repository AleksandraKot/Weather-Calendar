import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './Calendar.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <Calendar />
      </div>
  )
  }
}
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <App/>,
    document.getElementById('app'));
});
