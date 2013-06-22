/**
 * @author: youxiachai
 * @Date: 13-6-22
 * @version: 1.0
 * To change this template use File | Settings | File Templates.
 */

var redisClient = require('./redisClient');
var sendResult = function(res, err, reply){
    if(reply){
        res.send(200,'' + reply);
    }else{
        res.send(200,"reply: " + reply);
    }
};

/**
 *
 * @param req
 * @param res
 */
exports.get = function (req, res){
    var key = req.params.key;
    var reply = sendResult.bind(null, res);
    redisClient.get(key, reply);
};

exports.hgetAll = function (req, res) {
  var key = req.params.key;
  var reply = sendResult.bind(null, res);
  redisClient.hgetAll(key, reply);
};
