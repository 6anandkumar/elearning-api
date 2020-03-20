'use strict';

var utils = require('../utils/writer.js');
var Auth = require('../service/AuthService');
const JWT = require('jsonwebtoken');

module.exports.getToken = function getToken (req, res, next) {
  Auth.getToken()
    .then(function (response) {
      //Create a sample rest api client user
      const apiClient = {
        id: 1,
        username: "apiClient1",
        email: "apiclient1@example.com",
        password: "1234"
      }
      //create token for this client
      // using apiClient info
      // expires in 2h
      JWT.sign({apiClient}, 'secretkey', {expiresIn: '2h'}, (err, token) => {
        res.json({
          token
        })
      })

      //utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
