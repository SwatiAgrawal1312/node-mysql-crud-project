const express=require('express');
const { getStudents, getStudentById, createStudent, updateStudent, deleteStudent } = require('../controllers/studentController.js');



// router object
const router=express.Router();
// routes

// Get all students list || get

router.get('/getall', getStudents)
// Get student by id
router.get('/get/:id', getStudentById)

// create student || POST
router.post('/create', createStudent)

// update student
router.put('/update/:id',updateStudent)

// Delete student || delete
router.delete('/delete/:id',deleteStudent)
// comment added
module.exports=router;