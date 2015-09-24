'use strict';

import React from 'react';
import _     from 'lodash';


export default class App extends React.Component {

  constructor(props) {
    super();
    /*
    this.settings = _.extend({
      // Settings that both client and server will need go here.
      // The client will have browser-specific tokens such as
      // Mapbox/Facebook access tokens, and the server will have
      // private constants like secret keys.
    }, app_settings);
    */
  }

  // defaults for various object types
  static defaults() {
    return {
      // all routes return an object of this form. These are the defaults.
      route_payload: {
        title: "ERROR NO TITLE",
        header: "",
        element: null
      }
    }
  }

  render() {

    let page = React.createElement(this.props.component, this.props.componentProps);

    return (
      <div id="app">
        { page }
      </div>
    );
  }

}