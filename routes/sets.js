/**
 * @author: youxiachai
 * @Date: 13-6-22
 * @version: 1.0
 * To change this template use File | Settings | File Templates.
 */
var redisClient = require('./redisClient');

/**
 *
 * @param res
 * @param setObj
 */
var setOptions = function (res, setObj) {

    switch (setObj.options.toLowerCase()) {
        case 'ex':
            var seconds = parseInt(setObj.args);
            if(seconds){
                redisClient.setex(setObj.key,  seconds, setObj.value ,function(err,reply){
                    if(err){
                        res.send(500,'redis'+ setObj.options +'status:' + err);
                    }else{
                        res.send(200,'redis'+ setObj.options +'status:' + reply);

                    }
                });
            }else{
                res.send(403,'redis +'+ setObj.options+ 'status:' +'not run');
            }
            break;
        case 'px':
            //bae 不支持
            var milliseconds = parseInt(setObj.args);
            if(milliseconds){
                redisClient.set([setObj.key, setObj.value, "PX", milliseconds], function(err, reply){
                        res.send(500,'redis'+ setObj.options +'status:' + reply);

                });
            }else{
                res.send(403,'redis +'+ setObj.options+ 'status:' +'not run');
            }
            break;
        case 'nx':
            redisClient.setnx(setObj.key, setObj.value, function(err, reply){
                    if(err){
                        res.send(500,'redis '+ setObj.options +' status:' + err);
                    }else{
                        res.send(200,'redis '+ setObj.options +' status:' + reply);
                    }

            });
            break;
        case 'xx':
            //bae 不支持
            redisClient.set([setObj.key, setObj.value, "XX"], function(err, reply){
                    if(err){
                        res.send(500,'redis'+ setObj.options +'status:' + err);
                    }else{
                        res.send(200,'redis'+ setObj.options +'status:' + reply);
                    }
            });
            break;
        default :
            res.send(403,'redis default status:' +'not run');
            break;
    }
}
/**
 *
 * @param req
 * @param res
 */
exports.set = function (req, res){

    var setObj = {
        key:  req.params.key,
        value: req.body.value,
        options: req.params.options,
        args: req.params.args
    };

    if(setObj.options){
        setOptions(res, setObj);
    }else{
        redisClient.set(setObj.key, setObj.value, function(err,reply){
                if(err){
                    res.send(200,'' + err);
                }else{
                    res.send(200,'' + reply);
                }
        });
    }
};