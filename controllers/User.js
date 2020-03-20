'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

const JWT = require('jsonwebtoken');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/User.json');
//const adapter = new FileAsync('data/User.json');

module.exports.addUser = function addUser (req, res, next, body) {
  console.log("Adding User");
  User.addUser(body)
    .then(function (response) {
      if(verifyToken(req,res)){
        var Userdb = low(adapter);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 201;
        var response = Userdb.get('users')
          .push({ userID: (Userdb.get('lastId') + 1), username: body.username, firstName: body.firstName, lastName: body.lastName, email: body.email, utype: body.utype })
          .write()
          Userdb.update('lastId', n => n + 1)
          .write()
          Userdb.update('totalUsers', n => n + 1)
          .write()
        utils.writeJson(res, response);
      }
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUser = function deleteUser (req, res, next, username) {
  console.log("Deleting User");
  User.deleteUser(username)
    .then(function (response) {
      if(verifyToken(req,res)){
        var Userdb = low(adapter);
        response = Userdb.get('users').find({ username: username }).value();
        if(response){
          response = Userdb.get('users')
            .remove({ username: username })
            .write()
            Userdb.update('totalUsers', n => n - 1)
            .write()
          utils.writeJson(res, response);
        }else{
          res.statusCode = 404;
          res.end("User Not Found!");
        }
      }
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserByName = function getUserByName (req, res, next, username) {
  console.log("Getting user by name");
  User.getUserByName(username)
    .then(function (response) {
      var Userdb = low(adapter);
      response = Userdb.get('users').find({ username: username }).value();
      if(response){
        utils.writeJson(res, JSON.stringify(response));
      }else{
        res.statusCode = 404;
        res.end("User Not Found!");
      }
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateUser = function updateUser (req, res, next, body, username) {
  console.log("Updating user");
  User.updateUser(body, username)
    .then(function (response) {
      if(verifyToken(req,res)){
        var Userdb = low(adapter);
        response = Userdb.get('users').find({ username: username }).value();
        if(response){
          Userdb.get('users')
            .find({ username: username })
            .assign({ username: body.username, firstName: body.firstName, lastName: body.lastName, email: body.email, utype: body.utype })
            .write()
          utils.writeJson(res, response);
        }else{
          res.statusCode = 404;
          res.end("User Not Found!");
        }
      }
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Token Format
// Authorization: Bearer <access_token>

function verifyToken(req, res){
  //Get header value
  var bearerHeader = req.headers['authorization'];
  //check if bearer is undefined
  if(typeof bearerHeader !== 'undefined'){
    var bearer = bearerHeader.split(' ');
    //get the token from array
    var bearerToken = bearer[1];
    //console.log(bearerToken);
    req.token = bearerToken;
    var decoded = JWT.verify(req.token, 'secretkey');
    console.log("token verified");
    return true; //token verified
  }else{
    //Forbidden
    res.sendStatus(403);
  }
}