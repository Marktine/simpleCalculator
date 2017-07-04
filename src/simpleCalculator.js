import React, { Component } from 'react';
import Style from './Style';
import InputButton from './InputButton';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

const inputButtons = [
  [1, 2, 3, '/'],
  [4, 5, 6, '*'],
  [7, 8, 9, '-'],
  [0, '.', '=', '+'],
  ['C']
];

export default class simpleCalculator extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      inputValue: 0,
      previousInputValue: 0,
      selectedSymbol: null
    }

  }

  render() {
    return (
      <View style={Style.rootContainer}>
        <View style={Style.displayContainer}>
          <Text style={Style.displayText}> {this.state.inputValue}</Text>
        </View>
        <View style={Style.inputContainer}>
                  {this.renderInputButtons()}
        </View>
      </View>
    );
  }


  renderInputButtons() {
  let Views=[];
  for(var r = 0; r < inputButtons.length; r++)
  {
    let row = inputButtons[r];
    let inputRow = [];
    for(var i = 0; i < row.length; i++)
    {
      let input = row[i];
      inputRow.push(
          <InputButton value = {input} 
                        key={r + '-' + i} 
                        highlight = {this.state.selectedSymbol === input}
                        onPress={this.onInputButtonPressed.bind(this, input)}/>
        );
    }
    Views.push(<View style={Style.inputRow} key= {"row-" + r}>{inputRow}</View>)
  }
  return Views;
}
  
  onInputButtonPressed(input){
      switch(typeof input){
        case 'number':
          return this.handleNumberInput(input);
        case 'string':
          return this.handleStringInput(input);
      }
  }

  handleNumberInput(num){
    if(this.state.inputValue.toString().includes('.'))
    {
      this.setState({
        inputValue: this.state.inputValue + num
      });
    }
    else
    {
      let inputValue = (this.state.inputValue * 10) + num;
      this.setState({
        inputValue: inputValue
      })
    }
  }

  handleStringInput(str)
  {
    switch (str)
    {
      case '/':
      case '*':
      case '+':
      case '-':
        this.setState({
          selectedSymbol: str,
          previousInputValue: this.state.inputValue,
          inputValue: 0
        });
        break;
      case '=':
        let symbol = this.state.selectedSymbol,
            inputValue = this.state.inputValue,
            previousInputValue = this.state.previousInputValue;
        if(!symbol){
          return;
        }
        this.setState({
          previousInputValue: 0,
          inputValue: eval(previousInputValue + symbol + inputValue),
          selectedSymbol: null
        });
        break;
      case 'C':
        this.setState({
          selectedSymbol: null,
          previousInputValue: 0,
          inputValue: 0
        });
        break;
      case '.':
        this.setState({
          inputValue: this.state.inputValue + '.',
        });
        break;
    }
  }
  
}

AppRegistry.registerComponent('simpleCalculator', () => simpleCalculator);
