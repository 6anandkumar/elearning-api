'use strict';

var utils = require('../utils/writer.js');
var Catalog = require('../service/CatalogService');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/Course.json');
//const adapter = new FileAsync('data/Course.json');


module.exports.getCourseByCategory = function getCourseByCategory (req, res, next, category) {
  console.log("inside getCourseByCategory");
  //console.log(Coursedb.get('courses').find({ category: category }).value());
  Catalog.getCourseByCategory(category)
    .then(function (response) {
      //find all courses belonging to the category
      var Coursedb = low(adapter);
      response = Coursedb.get('courses').filter({ category: category }).value();
      if(response != ''){
        utils.writeJson(res, JSON.stringify(response));
      }else{
        res.statusCode = 404;
        res.end("Course Category Not Found!");
      }
      
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCourseByInstructor = function getCourseByInstructor (req, res, next, instructor) {
  console.log("inside getCourseByInstructor");
  Catalog.getCourseByInstructor(instructor)
    .then(function (response) {
      //find all courses taught by a instructor
      var Coursedb = low(adapter);
      response = Coursedb.get('courses').filter({ instructor: instructor }).value();
      if(response != ''){
        utils.writeJson(res, JSON.stringify(response));
      }else{
        res.statusCode = 404;
        res.end("Instructor Not Found!");
      }
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getInventory = function getInventory (req, res, next) {
  console.log("inside getInventory");
  Catalog.getInventory()
    .then(function (response) {
      var Coursedb = low(adapter);
      response = JSON.stringify(Coursedb.get('courses').orderBy("courseId","asc").value());
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
