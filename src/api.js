'use strict';

import getFeatureById    from './api/getFeatureById.js';
import getFeaturesForMap from './api/getFeaturesForMap.js';

import getMapById        from './api/getMapById.js';

import getPostById       from './api/getPostById.js';
import getPostsForTopic  from './api/getPostsForTopic.js';

import getTopicById      from './api/getTopicById.js';
import getTopicByName    from './api/getTopicByName.js';

import getUserById       from './api/getUserById.js';

module.exports = {

  basePath: '/api',

  routes: [

    // Features
    {
      handler : getFeatureById,
      path    : '/feature/:feature_id'
    },
    {
      handler : getFeaturesForMap,
      path    : '/features/map/:map_id'
    },


    // Maps
    {
      handler : getMapById,
      path    : '/map/:map_id'
    },


    // Posts
    {
      handler : getPostById,
      path    : '/post/:post_id'
    },
    {
      handler : getPostsForTopic,
      path    : '/posts/topic/topic_id'
    },


    // Topics
    {
      handler : getTopicById,
      path    : '/topic/:topic_id'
    },
    {
      handler : getTopicByName,
      path    : '/topic/'
    },


    // Users
    {
      handler : getUserById,
      path    : '/user/:user_id'
    }
  ]

};