import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function incrementButton(props) {
  return (
    <button className="incrementButton">
      {props.text}
    </button> )
  }

class MainScreen extends React.Component {
  renderButton(props) {
    return (
      <basicButton
        text={props.text}/>
    )
  }

  render() {
    return (
      <div>
        <div>
          {this.renderButton({text: "button1"})}
        </div>
        <div>
          {this.renderButton({text: "button2"})}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<MainScreen />, document.getElementById('root'));
