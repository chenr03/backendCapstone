let connection = require("../Utilities/database");


//1
let getAllCourses =

    function(request, response){
        console.log("GET /courses")

        // lets user see what's inside the courses table

        // what kind of query do we send to get all the courses in the database

        let sql = "SELECT * FROM Course";

            // GETS all courses by selecting courseId,
            // courseName, Hole1Score, Hole 2 Score, etc.

        connection.query(sql, function(error, rows){
            //console.log('bilbo')
            if(error){
                console.log("List of courses failed", error)
                response.sendStatus(500); // our fault

            } else {
                response.json(rows); // this GETS all course from table
            }
        });

    };

//2
let getSingleCourse =

    function(request, response){
        console.log("GET /course/:courseId");

        let courseId = request.params.courseId;

        // if courseId is falsy
        if(!courseId) {
            response.send(400); // clients fault
            return;
        }

        let sql = "SELECT * FROM Course where courseId = ?";

        let params = [courseId]

        connection.query(sql, params, function(error, rows){
            if(error){
                console.log("Failed to get a course from the database", error);
                response.sendStatus(500); // our fault
            } else {
                if(rows.length > 1){
                    console.log("Returned more than 1 row for courseId", courseId);
                    response.sendStatus(500); // again this is still our fault
                } else if (rows.length === 0){
                    response.json(null);
                } else {
                    response.json(rows[0])
                }
            }
        });
    };



//3
let createCourse =

    function(request, response){
        console.log("POST /course");


        //these columns in the table is the contract between express and the database
        let sql = `INSERT INTO Course 
                    (courseName, Hole1, Hole2, Hole3, Hole4, Hole5, Hole6, Hole7, Hole8, Hole9, Hole10, 
                     Hole11, Hole12, Hole13, Hole14, Hole15, Hole16, Hole17, Hole18) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`; //inserts into courses object table
        let params = [
            request.body.courseName,
            request.body.Hole1,
            request.body.Hole2,
            request.body.Hole3,
            request.body.Hole4,
            request.body.Hole5,
            request.body.Hole6,
            request.body.Hole7,
            request.body.Hole8,
            request.body.Hole9,
            request.body.Hole10,
            request.body.Hole11,
            request.body.Hole12,
            request.body.Hole13,
            request.body.Hole14,
            request.body.Hole15,
            request.body.Hole16,
            request.body.Hole17,
            request.body.Hole18
        ];

        connection.query(sql, params, function(error, rows){
            if(error){
                console.log("Failed to create a course", error);
                response.sendStatus(500); // our fault
            } else {
                console.log("Course Created Successfully", rows); // created a course in the database
                response.json(rows);
            }
        });
    };


//4
let deleteCourse =

    function(request, response){
        console.log("DELETE /course/:courseId");

        let courseId = request.params.courseId; // because the courseId is a path param
        let sql = "DELETE FROM Course WHERE courseId = ?"
        let params = [courseId];

        console.log("request.body", request.body);

        connection.query(sql, params, function(error, rows){
            if(error){
                console.log("Failed to Delete Course", error);
                response.sendStatus(500); // our fault on server side
            } else {
                console.log("Course Deleted", rows)
                response.json(rows);
            }
        });

    };


//5
let updateCourse =

    function(request, response){
        console.log("PUT /course/:courseId");

        //these columns in the table is the contract between express and the database
        let courseId = request.params.courseId; // coming from the path parameter
        if(!courseId) {
            response.sendStatus(400); // client error.
            return;
        }

        let sql = "UPDATE Course SET courseName = ?, Hole1 = ?, Hole2 = ?, Hole3 = ?, Hole4 = ?, Hole5 = ?, Hole6 = ?, Hole7 = ?, Hole8 = ?, Hole9 = ?, Hole10 = ?, Hole11 = ?, Hole12 = ?, Hole13 = ?, Hole14 = ?, Hole15 = ?, Hole16 = ?, Hole17 = ?, Hole18 = ? WHERE courseId = ?";
        let params = [
            request.body.courseName,
            request.body.Hole1,
            request.body.Hole2,
            request.body.Hole3,
            request.body.Hole4,
            request.body.Hole5,
            request.body.Hole6,
            request.body.Hole7,
            request.body.Hole8,
            request.body.Hole9,
            request.body.Hole10,
            request.body.Hole11,
            request.body.Hole12,
            request.body.Hole13,
            request.body.Hole14,
            request.body.Hole15,
            request.body.Hole16,
            request.body.Hole17,
            request.body.Hole18,
            courseId
        ];

        connection.query(sql, params, function(error, rows){
            if(error){
                console.log("Failed to Update Course", error);
                response.sendStatus(500); // this is because there was an error on our side
            } else {
                console.log("Course Updated Successfully", rows);
                response.sendStatus(200); // sent successfully
            }
        });
    };



module.exports = {getAllCourses, getSingleCourse, createCourse, deleteCourse, updateCourse};