'use strict';

import pg from 'pg';

module.exports = function(req, res, settings) {

  if(!settings || !settings.db_conn) {
    throw new Error('No connection string, you done fucked up');
  }

  pg.connect(settings.db_conn, function(err, client, done) {
    if(err) { throw err; }

    var default_limit = 10;
    var q = `SELECT posts.id AS post_id, posts.title, posts.created_at
             FROM shard_1.posts
             LEFT JOIN shard_1.topics ON topics.id = posts.topic_id
             WHERE topics.name = $1 ORDER BY posts.created_at LIMIT $2`;
    var values = [
      req.params.topic_name,
      req.params.limit || default_limit
    ];

    client.query(q, values, function(err, result) {
      //call `done()` to release the client back to the pool
      done();

      if(err) {
        console.error('error running query', err);;
        res.send({
          code: 1,
          error: 'Error running query: '+err
        });
      } else {
        res.send({
          code: 0,
          posts: result.rows
        });
      }
    });
  });

}