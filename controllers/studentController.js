const db = require("../config/db")
const bcrypt=require('bcryptjs')

// Get all student list
const getStudents=async(req,res)=>{
    try{
        const data=await db.query('SELECT * FROM students')
         if(!data){
            return res.status(404).send({
                success:false,
                message:'No Records found'

            });
         }
        res.status(200).send({
            success:true,
            message:'All student Records',
            totalStudents:data[0].length,
            data:data[0],

        });
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in get all student API',
            error



        });
    }
}
// Get Student by id
const getStudentById=async(req,res)=>{
    try{
        const studentId=req.params.id
        if(!studentId){
            return res.status(404).send({
                success:false,
                message:'Invalid  or provide Student id'
            })

        }
        // const data=await db.query(`select * from student where id=`+studentId)--->direct query not used becoz cances for sql injection
        const data=await db.query(`select * from students where id=?`,[studentId])
        if(!data){
            return res.status(404).send({
                success:false,
                message:'no record found',
               

            })

        }
        res.status(200).send({
            success:true,
            student_detail:data[0],
        })

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Get Student by id API',
            error

        })

    }

}
// create student
const createStudent=async(req,res)=>{
    try{
        const {id,name,roll_no,fees,student_class,medium,username,password}=req.body

        if(!id||!name||!roll_no||!fees||!student_class||!medium){
            return res.status(500).send({
                success:false,
                message:'plz provide all fields '

            })
        }
        const hashpassword=bcrypt.hashSync(password,10)
        const data=await db.query(`insert into students (id,name,roll_no,fees,student_class,medium,username,password) values(?,?,?,?,?,?,?,?)`,[id,name,roll_no,fees,student_class,medium,username,hashpassword])
        if(!data){
            return res.status(404).send({ 
                success:false,
                message:'Error in insert query'
            })
        }
        res.status(201).send({
            success:true,
            message:'New Student record created',


        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in create student api',
            error

        })
        
    }
}
// update student
const updateStudent=async(req,res)=>{
    try{
        const studentId=req.params.id
        if(!studentId){
            return res.status(404).send({
                success:false,
                message:'Invalid id or provide id'
            })
        }
        const {name,roll_no,fees,student_class,medium}=req.body
        const data=await db.query(`update students set name=?,roll_no=?,fees=?,student_class=?,medium=? where id=?`,[name,roll_no,fees,student_class,medium,studentId])
        if(!data){
            return res.status(500).send({
                success:false,
                message:'Error in update data'
            })
        }
        res.status(200).send({
            success:true,
            message:'student details updated'
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in update student API',
            error
        })

    }
}
// delete student
const deleteStudent=async(req,res)=>{
    try{
        const studentId=req.params.id
        if(!studentId){
            return res.status(404).send({
                success:false,
                message : 'plz provide student id or valid student id'
            })

        }await db.query(`delete from students where id=?`,[studentId])
        res.status(200).send({
            success:true,
            message:'student deleted successfully'
        });


        }

    
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in delete student Api',
            error
        })
    }
}

module.exports={getStudents,getStudentById,createStudent,updateStudent,deleteStudent};