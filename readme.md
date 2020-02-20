# What is EDRF(Express Dynamic Routing Framework)?

EDRF is an Application API Development Framework - a toolkit - for people who build web sites using Node.js.  
Its goal is to help you to develop projects much faster than you could if you were writing code from scratch, by providing
a rich set of routing and libraries for commonly needed tasks, as well as a simple interface and logical structure to access these libraries.  
EDRF lets you creatively focus on your project by minimizing the amount of code needed for a given task.

## Release Information
This repo contains in-development code for future releases.  
V.0.1 was released on Feb 18th 2020.

## Server Requirements
Node.js version 6.0 or later is recommended.

## Main Features of EDRF
* Easy Routing based design pattern of javascript and database structure  
* Alias of directories and custom module path registration  
* Node.js ORM structure usage for RDBS using sequalize  
* Easy to use and possibility to extend  

## Basic concept of routing
The main principle of EDRF is it is much convenient to have folder structure of project by api endpoint.  
And sometimes developers find it is useless and boring to define routing of all endpoints one by one.  
This framework helps developers define endpoint eaily using file structure and names of functions.  
Below is example endpoint of this framework.  
* GET - api/book/comic
* GET - api/book/comic/my_comic
* GET - api/book/:miser
* GET - api/user/:id
* GET - api/user?id={ID}
* POST - api/book/comic
* POST - api/book/comic/my_comic
* POST - api/book/:miser/miser
* POST - api/user
* PUT - api/book/comic
* POST - api/user
* DELETE - api/book/comic
* DELETE - api/user/:id
