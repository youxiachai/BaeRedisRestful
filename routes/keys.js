/**
 * @author: youxiachai
 * @Date: 13-6-22
 * @version: 1.0
 * To change this template use File | Settings | File Templates.
 */
var redisClient = require('./redisClient');

var sendResult = function(res, err, reply){
    if(reply){
        res.send(200,''+ reply);
    }else{
        res.send(200,"reply: " + reply);
    }
};

exports.del = function(req, res){

    console.log('del');

    var key = req.params.key;

    var reply = sendResult.bind(null, res);

    redisClient.del(key, reply);
};

exports.ttl = function(req, res){

    var key = req.params.key;

    var reply = sendResult.bind(null, res);

    console.log('ttl');

    redisClient.ttl(key, reply);

};