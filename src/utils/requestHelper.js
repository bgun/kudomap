'use strict';

import request from 'superagent';

export default class RequestHelper {

  constructor(options) {
    if(!options.baseUrl) {
      throw new Error("No baseURL for RequestHelper!");
    }
    this.baseUrl = options.baseUrl;
  }

  get(url, options) {

    var key = options.key;
    var final_url = this.baseUrl+url;

    return new Promise(function(resolve, reject) {
      request
        .get(final_url)
        .end(function(err, res) {
          if(err) { reject(err); }
          if(res && res.ok) {
            resolve(res.body[key]);
          } else {
            reject("requestHelper error");
          }
        });
    });

  }

}