'use strict';

import React from 'react';
import Parse from 'parse';
import _     from 'lodash';


export default class App extends React.Component {

  constructor(props) {
    super();
  }

  componentDidMount() {
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