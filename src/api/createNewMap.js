'use strict';

import pg from 'pg';

module.exports = function(req, res, settings) {

  if(!settings || !settings.db_conn) {
    throw new Error('No connection string, you done fucked up');
  }

  pg.connect(settings.db_conn, function(err, client, done) {
    if(err) { throw err; }

    // TODO: validate req.params against a schema
    var q = `INSERT INTO shard_1.maps
             (name, default_lat, default_lon, default_zoom, creating_user_id, style)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`;
    var values = [
      req.body.name,
      req.body.default_lat,
      req.body.default_lon,
      req.body.default_zoom,
      req.body.creating_user_id,
      req.body.style
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