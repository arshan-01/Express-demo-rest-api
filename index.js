const Joi = require('joi');
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const courses = [
    {id: 1,name:"course 1"},
    {id: 2,name:"course 2"},
    {id: 3,name:"course 3"}
]
app.use(express.json())

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/api/courses", function (req, res) {
  res.send(courses);
});

app.get("/api/courses/:id", function (req, res) {
    const course = courses.find((single)=>single.id===parseInt(req.params.id))
    if(!course) return res.status(404).send('Course is not available');
    res.send(course);
});



app.post("/api/courses", function (req, res) {

    const {error} = validateCourse(req.body)
if(error)  return res.status(400).send(error.details[0].message);

    const course ={
        id: courses.length + 1,
        name:req.body.name
    }
    courses.push(course)
    res.send(course);
});



app.put("/api/courses/:id", function (req, res) {
    const course = courses.find((single)=>single.id===parseInt(req.params.id))
    if(!course) return res.status(404).send('Course is not available');
    
    const {error} = validateCourse(req.body)
if(error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);
});



app.delete("/api/courses/:id", function (req, res) {
    const course = courses.find((single)=>single.id===parseInt(req.params.id))
    if(!course) return res.status(404).send('Course is not available');
    
    const index = courses.indexOf(course);
    courses.splice(index,1)
    res.send(course);
});



function validateCourse(course) {
    const schema = Joi.object(
        { name: Joi.string().min(3).required(),
 });
 return schema.validate(course);

}


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
