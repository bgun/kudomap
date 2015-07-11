'use strict';

import pg from 'pg';

module.exports = function(req, res, settings) {

  if(!settings || !settings.db_conn) {
    throw new Error('No connection string, you done fucked up');
  }

  pg.connect(settings.db_conn, function(err, client, done) {
    if(err) { throw err; }

    // TODO: validate req.params against a schema
    var q = `INSERT INTO shard_1.posts
             (title, content, topic_id)
             VALUES ($1, $2, $3)
             RETURNING *`;
    var values = [
      req.body.title,
      req.body.content,
      req.body.topic_id
    ];
    client.query(q, values, function(err, result) {
      done(); // release the client back to the pool

      if(err) {
        res.send({
          code: 1,
          error: err
        });
      } else {
        res.send({
          code: 0,
          post: result.rows[0]
        });
      }
    });
  });

}