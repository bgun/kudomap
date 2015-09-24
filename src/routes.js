import HomeRoute  from './routes/HomeRoute.js';
import MapRoute   from './routes/MapRoute.js';
import PostRoute  from './routes/PostRoute.js';
import TopicRoute from './routes/TopicRoute.js';

export default {
  'feed' : { path: '/',                       controller: HomeRoute  },
  'map'  : { path: '/m/:map',                 controller: MapRoute   },
  'post' : { path: '/t/:topic/post/:post_id', controller: PostRoute  },
  'topic': { path: '/t/:topic',               controller: TopicRoute }
}