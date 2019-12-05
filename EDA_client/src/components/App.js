import React, { Component } from 'react';
import Word from './Word';

import '../css/App.css';

class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {currentKey: '', disaster:"", show: false, arr:[[],[]], arr1:[[],[]]}
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateData = this.updateData.bind(this);
    this.updateData1 = this.updateData1.bind(this);
  }

  handleKeyPress(e) {
    if(e.keyCode === 13){
      e.preventDefault();
      this.handleStart();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    var csvFilePath = require("./datasets/location.csv");
    var Papa = require("papaparse/papaparse.min.js");
    Papa.parse(csvFilePath, {
      header: false,
      download: true,
      skipEmptyLines: true,
      complete: this.updateData
    });

    var csvFilePath1 = require("./datasets/disaster.csv");
    var Papa1 = require("papaparse/papaparse.min.js");
    Papa1.parse(csvFilePath1, {
      header: false,
      download: true,
      skipEmptyLines: true,
      complete: this.updateData1
    });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  updateData(result) 
  {
    const data = result.data;
    this.setState({arr: data});
  }

  updateData1(result) 
  {
    const data = result.data;
    this.setState({arr1: data});
  }

  handleChange(event) {
    this.setState({disaster: event.target.value});
  }

  handleStart = () => {
    this.setState({ show: true });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleMove = e => {
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;

    e.target.style.setProperty('--x', `${x}px`);
    e.target.style.setProperty('--y', `${y}px`);
  };

  render() {
    return (
      <main className="home">
        {this.state.show ? (
          <Word text={this.state.disaster} arr={this.state.arr} arr1={this.state.arr1} onClose={this.handleClose} />
        ) : (
          <div>
            <div className = "comps">
              <h1 className = "title1">Emergency Disaster Alert</h1>
              <h3 className = "title2">숭실대학교 형남과학상 공모전</h3>
              <h4 className = "title3">developed by 이상현, 김용현, 김영규, 이예은</h4>
              <textarea type="text" className = "inputBox" placeholder = "&#10;재난 문자 내용을 입력해주세요." 
                      value={this.state.disaster} onChange={this.handleChange} />
            </div>
            <button
              className="button"
              id="button1"
              onClick={this.handleStart}
              onMouseMove={this.handleMove}>
              <span>재난 문자 입력</span>
            </button>
          </div>
        )}
      </main>
    );
  }
}

export default App;