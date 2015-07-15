'use strict';

import pg from 'pg';

module.exports = function(req, res, settings) {

  if(!settings || !settings.db_conn) {
    throw new Error('No connection string, you done fucked up');
  }

  pg.connect(settings.db_conn, function(err, client, done) {
    if(err) { throw err; }

    // TODO: don't select *!
    var q = `SELECT * FROM shard_1.topics WHERE name = $1`;
    var values = [
      req.params.name
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
          topic: result.rows[0]
        });
      }

    });
  });

}