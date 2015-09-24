'use strict';

import React  from 'react';
import Parse  from 'parse';
import _      from 'lodash';

import NavBar from '../NavBar.js';

import Feature from '../../models/Feature.js';

export default class MapPage extends React.Component {

  componentDidMount() {

    mapboxgl.accessToken = "pk.eyJ1IjoiYmd1biIsImEiOiJlRTVXbENBIn0.tVaSmhr0MXPtu8hdktMl3g";
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'https://www.mapbox.com/mapbox-gl-styles/styles/emerald-v7.json',
      center: [40.74, -74],
      zoom: 12
    });

    var source = new mapboxgl.GeoJSONSource();

    map.on('style.load', function() {

    var query = new Parse.Query(Feature);
    query
      .equalTo("Test", 1)
      .find()
      .then(function(resp) {

        console.log(resp);

        source.setData({
          "type": "FeatureCollection",
          "features": resp.map(function(r) {
            var name = r.get('name');
            var LL = r.get('position');
            console.log(LL);
            return {
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [LL._longitude, LL._latitude]
              },
              "properties": {
                "title": name,
                "marker-symbol": "monument"
              }
            }
          })
        });

        map.addSource('markers', source);

        map.addLayer({
          "id": "markers",
          "type": "symbol",
          "source": "markers",
          "layout": {
            //"icon-image": "{marker-symbol}-15",
            "text-field": "{title}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.6],
            "text-anchor": "top"
          },
          "paint": {
            "text-size": 12
          }
        });

        console.log("source", source);

      });
    });

    map.on('click', function(ev) {
      console.log(ev);
      var f = new Feature();
      f.set('name', 'Marker');
      f.set('position', new Parse.GeoPoint(ev.latLng.lat, ev.latLng.lng))
      f.set('Test', 1);
      f.save()
        .then(function(ev) {
          console.log("new marker saved");
          var name = ev.get('name');
          var LL = ev.get('position');
          console.log(name, LL);
          source.setData({
            type: 'FeatureCollection',
            features: source._data.features.concat([{
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [LL._longitude, LL._latitude]
              },
              "properties": {
                "title": name,
                "marker-symbol": "monument"
              }
            }])
          });
        });
    });
  }

  render() {
    return (
      <div id="mapPage" className="page">
        <NavBar />
        <h1>This is a map</h1>
        <div id="map" style={{ width: '800px', height: '600px' }}></div>
        <a href="/">Back Home</a>
      </div>
    )
  }

}
