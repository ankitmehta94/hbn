import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import SearchList from './SearchList/SearchList';
import env from './env';

// const ip = "13.233.19.191";
const ip = "0.0.0.0";
const api_key = env.api_key;
class App extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.audioRef = React.createRef();
    this.state = {
      data: [],
    };
    this.tempAudioContext = new AudioContext();
    this.pausedAt = null;
    this.startedAt = null;
    this.paused = null;
    this.sourceNode = null;
    this.buffer = null;

  }
  componentDidMount(){
    // this.tempAudioContext = window.AudioContext || window.webkitAudioContext;
  }
  pauseAudio = () => {
    this.sourceNode.stop(0);
    this.pausedAt = Date.now() - this.startedAt;
    this.paused = true;
  }
  onBufferLoad = (b) => {
    this.buffer = b;
	this.playAudio();
};
  playAudio = () => {
    this.sourceNode = this.tempAudioContext.createBufferSource();
    this.sourceNode.connect(this.tempAudioContext.destination);
    this.sourceNode.buffer = this.buffer;
    this.paused = false;
  
      if (this.pausedAt) {
      this.startedAt = Date.now() - this.pausedAt;
      this.sourceNode.start(0, this.pausedAt / 1000);
      }
      else {
      this.startedAt = Date.now();
      this.sourceNode.start(0);
      }
  }
  getStream = (id) => {

    const url = "http://" + ip + ":8080/stream?ytUrl=" + id;
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
      request.onload = () => {
        console.log(this.tempAudioContext,'<--------------------------------scheduleBuffers');
      this.tempAudioContext.decodeAudioData(request.response, this.onBufferLoad, this.onBufferError);
      };
    request.send();
  }
  getYoutubeSearchData = () => {
    let value = this.inputRef.current.value;
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${value}&key=${api_key}`)
    .then((response) => {
        return response.json();
    })
    .then((myJson) => {
        console.log(myJson);
        this.setState({
          data: myJson.items
        })
    });
  }
  sendUrlAgain = () => {
    // Creates an AudioContext and AudioContextBuffer
    const audioContext = new AudioContext();
    const audioContextBuffer = audioContext.createBufferSource();

    // Sends a request to our web server for the audio stream
    const request = new XMLHttpRequest();
    request.open(
      "GET",
      "http://" + ip + ":8080/stream?ytUrl=" + this.inputRef.current.value,
      true
    );
    request.responseType = "arraybuffer";

    // The callback that handles the request data
    request.onload = function() {
      // Decode the stream into something we can digest
      audioContext.decodeAudioData(
        request.response,
        buffer => {
          // This function can be anything to handle the returned arraybuffer
          // this.processAudio(buffer)
          console.log(
            buffer,
            "<--------------------------------scheduleBuffers"
          );
          // These three lines of code will play the video's audio
          audioContextBuffer.buffer = buffer;
          audioContextBuffer.connect(audioContext.destination);
          audioContextBuffer.start();
        },
        error => {
          console.log("Unable to decode audio stream");
        }
      );
    };
    request.send();
  };

  render() {
    const {data =[]} = this.state;
    return (
      <div className="App">
        <div>
          <input type="text" ref={this.inputRef} />
          <button onClick={this.getYoutubeSearchData} children={"Send me the music"} />
        </div>
        <div>
          <button onClick={this.playAudio} children={"Play"} />
          <button onClick={this.pauseAudio} children={"Pause"} />
        </div>
        <SearchList data={data} startPlay={this.getStream} />
      </div>
    );
  }
}

export default App;
