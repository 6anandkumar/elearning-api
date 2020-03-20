'use strict';

var utils = require('../utils/writer.js');
var Course = require('../service/CourseService');

const JWT = require('jsonwebtoken');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/Course.json');
//const adapter = new FileAsync('data/Course.json');


module.exports.addCourse = function addCourse (req, res, next, body) {
  console.log("Adding Course");
  Course.addCourse(body)
    .then(function (response) {
      if(verifyToken(req,res)){
        var Coursedb = low(adapter);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 201;
        var response = Coursedb.get('courses')
          .push({ courseId: (Coursedb.get('lastId') + 1), name: body.name, code: body.code, category: body.category, instructor: body.instructor })
          .write()
        Coursedb.update('lastId', n => n + 1)
          .write()
        Coursedb.update('totalCourses', n => n + 1)
          .write()
        utils.writeJson(res, response);
      }      
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteCourse = function deleteCourse (req, res, next, courseId) {
  console.log("Deleting Course");
  Course.deleteCourse(courseId)
    .then(function (response) {
      console.log("inside delCourse .then")
      if(verifyToken(req,res)){
        var Coursedb = low(adapter);
        response = Coursedb.get('courses').find({ courseId: courseId }).value();
        if(response){
          response = Coursedb.get('courses')
            .remove({ courseId: courseId })
            .write()
          Coursedb.update('totalCourses', n => n - 1)
            .write()
          utils.writeJson(res, response);
        }else{
          res.statusCode = 404;
          res.end("Course Not Found!");
        }
      }
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCourseById = function getCourseById (req, res, next, courseId) {
  console.log("Getting course by id");
  Course.getCourseById(courseId)
    .then(function (response) {
      var Coursedb = low(adapter);
      response = Coursedb.get('courses').find({ courseId: courseId }).value();
      if(response){
        utils.writeJson(res, JSON.stringify(response));
      }else{
        res.statusCode = 404;
        res.end("Course Not Found!");
      }
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateCourse = function updateCourse (req, res, next, body, courseId) {
  console.log("Updating course");
  Course.updateCourse(body, courseId)
    .then(function (response) {
      if(verifyToken(req,res)){
        var Coursedb = low(adapter);
        response = Coursedb.get('courses').find({ courseId: courseId }).value();
        if(response){
          Coursedb.get('courses')
            .find({ courseId: courseId })
            .assign({ courseId: courseId, name: body.name, code: body.code, category: body.category, instructor: body.instructor })
            .write()
          utils.writeJson(res, response);
        }else{
          res.statusCode = 404;
          res.end("Course Not Found!");
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