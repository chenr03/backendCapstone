let express = require('express');

let Routes = express.Router()

let courseController = require("../Controller/course")

// These routes are for my Courses Table

Routes.get("/courses", courseController.getAllCourses)
Routes.get("/course/:courseId", courseController.getSingleCourse)
Routes.post("/course", courseController.createCourse)
Routes.delete("/course/:courseId", courseController.deleteCourse)
Routes.put("/course/:courseId", courseController.updateCourse)


module.exports = Routes;
