'use strict';

import React from 'react';
import Parse from 'parse';
import ParseReact from 'parse-react';

import NavBar from '../NavBar.js';

import { Feature } from '../../models/Feature.js';

var ParseComponent = ParseReact.Component(React);


export default class FeedPage extends React.Component {

  makeThing() {
    var thing = new Feature();
    thing.set('name', 'Marker 4');
    thing.set('position', new Parse.GeoPoint(40.74,-74));
    thing.save()
      .then(function(resp) {
        console.log("SUCCESS", resp.attributes);
      });
  }

  render() {
    return (
      <div id="feed-page" className="page">
        <NavBar />
        <h1>Feed</h1>
        <button onClick={ this.makeThing.bind(this) }>Make a Thing!</button>
        <ul>
          <li><a href="/t/todo">Topic: Todo</a></li>
        </ul>
      </div>
    )
  }

}