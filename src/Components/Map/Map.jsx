import React from 'react';
import './Map.css';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');


class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: 'mapbox://styles/mapbox/light-v10',
      map: null
    }
  }
  componentDidMount() {
    this.renderMap();
  }
  componentWillUnmount() {
    const { map } = this.state;
    map.remove()
  }
  renderMap = () => {
    const { style } = this.state;
    mapboxgl.accessToken = 'pk.eyJ1Ijoic3RqYTExMDIiLCJhIjoiY2thYTc1N2prMGllNzJwa2g0bG1jZHZmciJ9.SLSrYWxBpxTkUQtTJz_qrw';
    const map = new mapboxgl.Map({
      container: 'map',
      style,
      zoom: 2
    });
    this.setState({ map }, () => {
      const that = this;
      map.on('load', function () {
        that.renderData();
      })
    })
  }
  renderData = () => {
    const { data } = this.props;
    const { map } = this.state;
    const geojson = {
      type: 'FeatureCollection',
      features: []
    }
    data.map(event => {
      const feauture = {
        'type': 'Feature',
        'properties': event,
        'geometry': {
          'type': 'Point',
          'coordinates': [event.longitude, event.latitude]
        }
      }
      return geojson.features.push(feauture)
    })

    map.addSource('events', {
      'type': 'geojson',
      'data': geojson
    });
    console.log(geojson)
    // Add different layers for color filters
    const eventTypes = [
      { type: "Strategic developments", color: '#6E8A64' },
      { type: "Protests", color: "#345062" },
      { type: "Battles", color: "#FFD945" },
      { type: "Violence against civilians", color: "#5E91B2" },
      { type: "Explosions/Remote violence", color: "#D27575" },
      { type: "Multiple event types", color: "#7C7C7C" },
      { type: "Riots", color: "#CB7934" }
    ]

    eventTypes.map(type => {
      return map.addLayer({
        'id': type.type,
        'source': 'events',
        'type': 'circle',
        'paint': {
          'circle-radius': 5,
          'circle-color': type.color,
          'circle-opacity': 0.8
        },
        "filter": ["==", "event_type", type.type]
      });
    })
  }
  render() {
    return (
      <div id="map"></div>
    )
  }
}


export default Map;