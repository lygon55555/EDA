import React from 'react';
import '../css/Word.css';

class Word extends React.Component {
  constructor(props){
    super(props);
    this.state = {currentKey: '', script:""}
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  
  handleKeyPress(e) {
    if(e.keyCode === 27 || e.keyCode === 13 || e.keyCode === 32){
      e.preventDefault();
      this.props.onClose();
    }
  }
  
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);

    var i = 0;
    var location;
    var locationForScript;

    for(i = 0 ; i < this.props.arr.length ; i++){
      if((this.props.text).includes(this.props.arr[i][0]))
      {
        location = this.props.arr[i][1];
        locationForScript = this.props.arr[i][0];
        break;
      }
    }

    for(i = 0 ; i < this.props.arr1.length ; i++){
      if((this.props.text).includes(this.props.arr1[i][0]))
      {
        var temp = this.props.arr1[i][1] + locationForScript + this.props.arr1[i][2];
        this.setState({script:temp});
        break;
      }
    }

    let mapContainer = document.getElementById('map');
    let mapOption = { center: new window.kakao.maps.LatLng(37.494507, 126.959659),
                      level : 11
                    };
                    
    var map = new window.kakao.maps.Map(mapContainer, mapOption);

    var geocoder = new window.kakao.maps.services.Geocoder();
    var coords;

    var circle = new window.kakao.maps.Circle({
      center : new window.kakao.maps.LatLng(37.494507, 126.959659),
      radius: 25000,
      strokeWeight: 5,
      strokeColor: '#F72535',
      strokeOpacity: 0.5,
      fillColor: '#F72000',
      fillOpacity: 0.5
    });

    circle.setMap(map);

    geocoder.addressSearch(location, function(result, status) {
       if (status === window.kakao.maps.services.Status.OK) {
          coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          map.setCenter(coords);
      }
    });

    geocoder.addressSearch(location, function(result, status) {
       if (status === window.kakao.maps.services.Status.OK) {  
          coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          circle.setPosition(coords);
      }
    });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  returnAudio(inputText)
  {
    var text = inputText;
    var url = "http://0.0.0.0:51000/generate?text=" + text + "&speaker_id=0";
    return <audio src = {url} hidden autoPlay/>
  }

  render() {
    console.log("(render)this.props.text : " + this.props.text);

    return (
      <div className = "showComp">
        <a className="button close" onClick={this.props.onClose}>
          <svg
            fill="#fff"
            height="40"
            width="40"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </a>
        {this.returnAudio(this.state.script)}
        <h3 id ="disasterText">{this.state.script}</h3>
        <div id="map"></div>
      </div>
    );
  }
}

Word.defaultProps = {
  text: '',
  arr: [[],[]],
  arr1: [[],[]]
};

export default Word;