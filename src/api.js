'use strict';

import getFeatureById    from './api/getFeatureById.js';
import getFeaturesForMap from './api/getFeaturesForMap.js';

import getMapById        from './api/getMapById.js';

import getPostById       from './api/getPostById.js';
import getPostsForTopic  from './api/getPostsForTopic.js';
import createNewPost     from './api/createNewPost.js';

import getTopics         from './api/getTopics';
import getTopicById      from './api/getTopicById.js';
import getTopicByName    from './api/getTopicByName.js';
import createNewTopic    from './api/createNewTopic.js';

import getUserById       from './api/getUserById.js';

module.exports = {

  basePath: '/api',

  routes: [

    // Features
    {
      handler : getFeatureById,
      method  : 'GET',
      path    : '/feature/:feature_id'
    },
    {
      handler : getFeaturesForMap,
      method  : 'GET',
      path    : '/features/map/:map_id'
    },


    // Maps
    {
      handler : getMapById,
      method  : 'GET',
      path    : '/map/:map_id'
    },


    // Posts
    {
      handler : getPostById,
      method  : 'GET',
      path    : '/post/:post_id'
    },
    {
      handler : getPostsForTopic,
      method  : 'GET',
      path    : '/posts/topic/:topic_id'
    },
    {
      handler : createNewPost,
      method  : 'POST',
      path    : '/post/new'
    },


    // Topics
    {
      handler : getTopicByName,
      method  : 'GET',
      path    : '/topic/:name'
    },
    {
      handler : getTopics,
      method  : 'GET',
      path    : '/topics'
    },
    {
      handler : createNewTopic,
      method  : 'POST',
      path    : '/topic/new'
    },


    // Users
    {
      handler : getUserById,
      method  : 'GET',
      path    : '/user/:user_id'
    }

  ]

};