/**
 * @author: youxiachai
 * @Date: 13-6-22
 * @version: 1.0
 * To change this template use File | Settings | File Templates.
 */


//var config = require('../config');
var redis = require("redis");
var redisClient;
if(!process.env.NODE_ENV){
    // 密码
    // 数据库名，从云平台获取
    var redisPort = process.env.BAE_ENV_ADDR_REDIS_PORT;
    var redisIP = process.env.BAE_ENV_ADDR_REDIS_IP;
    var db_name = '';
    var redisClient = redis.createClient(redisPort, redisIP);
    var username = process.env.BAE_ENV_AK;				// 用户名
    var password = process.env.BAE_ENV_SK;
    redisClient.auth(username + '-' + password + '-' + db_name);
}else{
    redisClient = redis.createClient();
    redisClient.on("ready", function(){
        console.log("ready");
    });

    redisClient.on("connect", function () {
        console.log("connect");
    });

    redisClient.on("error", function (err) {
        console.log("Error" + err);
    });

    redisClient.on("end", function() {
        console.log("end");
    });

    redisClient.on("drain", function () {
        console.log("drain");
    });

    redisClient.on("idle", function () {
        console.log("idle");
    });
}

module.exports = redisClient;