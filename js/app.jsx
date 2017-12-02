import React from 'react';
import ReactDOM from 'react-dom';
import Callendar from './Callendar.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <Callendar />
      </div>
  )
  }
}
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <App/>,
    document.getElementById('app'));
});
