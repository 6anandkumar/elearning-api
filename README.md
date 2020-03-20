

# E-Learning API

  

## Overview

This is the API implementation of the E-learning app developed for PayPal VAP mini-project 1 

  

### Running the server

To run the server, run:

  

```

npm start

```

  

To view the Swagger UI interface:

  

```

open http://localhost:8080/docs

```

  
  ## API Reference
  
  This API reference is organized by resource type. Each resource type has one or more data representations and one or more methods.

### Resource types

## Courses

| Method| HTTP Request| Description|
|------------|----------|-------------|
| addCourse| POST /course| Add a new course to the catalog|
| getCourseById| GET /course/{courseId}| Find course by ID|
| updateCourse| PUT /course/{courseId}| Updates a course in the catalog with new data|
| deleteCourse| DELETE /course/{courseId}| Deletes a course|

## Users

| Method| HTTP Request| Description|
|------------|----------|-------------|
| addUser| POST /user| Create user|
| getUserByName| GET /user/{username}| Get user by user name|
| updateUser| PUT /user/{username}| Update user|
| deleteUser| DELETE /user/{username}| Deletes a user|

## Catalog

| Method| HTTP Request| Description|
|------------|----------|-------------|
| getInventory| GET /catalog/inventory| Returns course inventory|
| getCourseByCategory| GET /catalog/category/{category}| Returns courses based on categories|
| getCourseByInstructor| GET /catalog/instructor/{instructor}| Returns courses based on instructor|

## Auth

| Method| HTTP Request| Description|
|------------|----------|-------------|
| getToken| GET /auth/gettoken| Returns authorization token|
