'use strict';


/**
 * get courses based on categories
 * filter courses based on category
 *
 * category String category of courses that needs to be filtered
 * returns List
 **/
exports.getCourseByCategory = function(category) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "code" : "code",
  "instructor" : "instructor",
  "name" : "name",
  "category" : "category",
  "courseId" : 0
}, {
  "code" : "code",
  "instructor" : "instructor",
  "name" : "name",
  "category" : "category",
  "courseId" : 0
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * get courses based on instructor
 * filter courses by instructor
 *
 * instructor String instructor of courses that needs to be filtered
 * returns List
 **/
exports.getCourseByInstructor = function(instructor) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "code" : "code",
  "instructor" : "instructor",
  "name" : "name",
  "category" : "category",
  "courseId" : 0
}, {
  "code" : "code",
  "instructor" : "instructor",
  "name" : "name",
  "category" : "category",
  "courseId" : 0
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns course inventories by categories
 * Returns a map of categories to quantities
 *
 * returns Catalog
 **/
exports.getInventory = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "code" : "code",
  "instructor" : "instructor",
  "name" : "name",
  "category" : "category",
  "courseId" : 0
}, {
  "code" : "code",
  "instructor" : "instructor",
  "name" : "name",
  "category" : "category",
  "courseId" : 0
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

