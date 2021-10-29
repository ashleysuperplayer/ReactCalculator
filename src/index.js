import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function Button(props) {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.purpose}
    </button>
  )
}

class OutputScreen extends React.Component {
  render() {
    return(
      <div class="outputContainer">
        <div>
          {this.props.operand1}
        </div>
        <div>
          {this.props.currentNumber}{this.props.operator}
        </div>
      </div>
    )
  }
}

class ButtonBox extends React.Component {
  renderOperandButton(purpose, cssClass="operandButton") {
    return (
      <Button
        purpose={purpose}
        onClick={() => this.props.onClick(purpose)}
        className={cssClass}
      />
    )
  }

  renderOperatorButton(purpose) {
    return (
      <Button
        purpose={purpose}
        onClick={() => this.props.onClick(purpose)}
        className="operatorButton"/>
    );
  }

  render() {
    return (
      <div>
        <div>
          {this.renderOperandButton(7)}
          {this.renderOperandButton(8)}
          {this.renderOperandButton(9)}
          {this.renderOperatorButton("+")}
          {this.renderOperatorButton("-")}
        </div>
        <div>
          {this.renderOperandButton(4)}
          {this.renderOperandButton(5)}
          {this.renderOperandButton(6)}
          {this.renderOperatorButton("*")}
          {this.renderOperatorButton("c")}
        </div>
        <div>
          {this.renderOperandButton(1)}
          {this.renderOperandButton(2)}
          {this.renderOperandButton(3)}
          {this.renderOperatorButton("/")}
          {this.renderOperatorButton("=")}
        </div>
        <div>
          {this.renderOperandButton(0, "zeroButton")}
        </div>
      </div>
    )
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentNumber: 0,
      operand1: 0,
      operator: "",
    }
  }

  evaluate() {
    switch(this.state.operator) {
      case "+":
        this.setState({currentNumber: this.state.operand1 + this.state.currentNumber});
        break;
      case "-":
        this.setState({currentNumber: this.state.operand1 - this.state.currentNumber})
        break;
      case "*":
        this.setState({currentNumber: this.state.operand1 * this.state.currentNumber});
        break;
      case "/":
        this.setState({currentNumber: this.state.operand1 / this.state.currentNumber});
        break;
    }
  }

  operationHandler(purpose) {
    if(isNumeric(purpose)) {
      if(this.state.currentNumber > 999999999999999) {
        return true;
      }
      else {
        this.setState({currentNumber: this.state.currentNumber * 10 + purpose});
      }
    }
    else if(purpose === "=") {
      this.evaluate();
      this.setState(
        {operator: "",
        operand1: 0});
    }
    else if(purpose === "c") {
      this.setState(
        {operator: "",
        operand1: 0,
        currentNumber: "0"});
    }
    else {
      if(this.state.operator !== "") {
        return true;
      }
      else {
        this.setState(
          {operator: purpose,
          operand1: this.state.currentNumber,
          currentNumber: 0});
      }
    }
  }

  handleClick = (purpose) => {
    this.operationHandler(purpose)
  };

  render () {
    return (
      <div id="calculator">
        <div>
          <OutputScreen 
          currentNumber = {this.state.currentNumber}
          operand1 = {this.state.operand1}
          operator = {this.state.operator}/>
        </div>
        <div>
          <ButtonBox
          onClick = {this.handleClick}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Calculator />, document.getElementById('root'));
