'use strict';

import React from 'react';

export default class PostItem extends React.Component {

  render() {

    return (
      <li className="post-item">{ this.props.post.title }</li>
    )

  }

}