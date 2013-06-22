/**
 * @author: youxiachai
 * @Date: 13-6-22
 * @version: 1.0
 * To change this template use File | Settings | File Templates.
 */
var username = process.env.BAE_ENV_AK;				// 用户名
var password = process.env.BAE_ENV_SK;				// 密码
var db_name = '';				// 数据库名，从云平台获取
module.exports = {
  username: username,
  passowrd: password,
  redisKey: db_name
};