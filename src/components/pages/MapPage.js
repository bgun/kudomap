'use strict';

import React from 'react';

import NavBar from '../NavBar.js';

export default class KudoPage extends React.Component {

  componentDidMount() {

    mapboxgl.accessToken = global.app.settings.mapbox_token;
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'https://www.mapbox.com/mapbox-gl-styles/styles/emerald-v7.json',
      center: [40.74, -74],
      zoom: 12
    });

    [0.023,0.064,0.081,0.035,0.12,0.91].forEach(function(val, ix, array) {
      var lat = 40.7+val;
      var lon = -74.0+((ix+1)/90);
      console.log(ix, lat, lon);
      var tooltip = new mapboxgl.Popup({closeOnClick: false})
        .setLatLng([lat, lon])
        .setHTML('<h1>Hello '+ix+'</h1>')
        .addTo(map);
    });
  }

  render() {
    return (
      <div id="kudo-page">
        <NavBar />
        <h1>{ this.props.kudo }</h1>
        <div id="map" style={{ width: '800px', height: '600px' }}></div>
        <a href="/">Back Home</a>
      </div>
    )
  }

}
