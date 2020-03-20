'use strict';


/**
 * Add a new course to the catalog
 *
 * body Course 
 * no response value expected for this operation
 **/
exports.addCourse = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Deletes a course
 *
 * courseId Long Course id to delete
 * no response value expected for this operation
 **/
exports.deleteCourse = function(courseId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Find course by ID
 * Returns a single course
 *
 * courseId Long ID of course to return
 * returns Course
 **/
exports.getCourseById = function(courseId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "code" : "code",
  "instructor" : "instructor",
  "name" : "name",
  "category" : "category",
  "courseId" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Updates a course in the catalog with new data
 *
 * body Course 
 * courseId Long ID of course that needs to be updated
 * no response value expected for this operation
 **/
exports.updateCourse = function(body,courseId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

