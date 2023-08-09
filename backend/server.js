//Define necessary lib
import express from "express";
import mysql from "mysql2";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();
app.use(cookieParser());
//it allows us to send any json file using a client
app.use(express.json());
app.use(cors());
//to image accessible
app.use(express.static('public'))


app.get('/logout', (req, res) => {
  // Cookie'yi temizle
  res.clearCookie('token');
 // res.json(cookieParser.JSONCookie);
  // İşlem tamamlandı mesajını dön
 res.json({ message: 'Logout successful' });
});


//connect mysql db
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "19Hunat.",
    database: "employee"
})


//ıf there is a auth problem
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '19Hunat.';




//bu sayfa çalıştığında ekrana res değerni ayzar
app.get("/", (req, res) => {
    res.json("hello this backend");
})

//Login page
app.post('/login', (req, res) => {
    //İd yi ana sayfaya aktarmak için çektik
    const sql = "SELECT `id` FROM `employee`.`admin` WHERE `email` = (?)  AND `password` = (?) ";
    const values = [
        req.body.email,
        req.body.password
    ]
    db.query(sql, [...values], (err, data) => {
        if (err) return res.json(err);
        if (data.length > 0) {
            return res.json(data);
        }
        // else {
        //     return res.json("No data");
        // }

    })
})

//Get admin name
app.post('/home/:id', (req,res)=>{

    const que="SELECT `name` FROM `employee`.`employee` WHERE (`id` = (?))";
    db.query(que,[req.params.id],(err,data)=>{
        if (err) return res.json(err);
        else return res.json(data)
    })

})

//Home detail info  Get active dep??
app.post('/homeDetail/:id', (req,res)=>{
const que="SELECT * FROM `employee`.`team` JOIN `employee`.`department` USING (`teamid`) WHERE (`employee`.`department`.`teamid`=(?)) "
//const que=  "SELECT * FROM `employee`.`team` WHERE (`adminid`=(?))"
db.query(que,[req.params.id],(err,data)=>{
        if (err) return res.json(err);
         return res.json(data)
    })

})

//All Employee List
app.post('/employeeTable',(req,res)=>{
    const que="SELECT * FROM `employee`.`employee`"
    db.query(que,(err,data)=>{
        if (err) return res.json(err);
         return res.json(data)
    })
})

//Spesific Mem İnfo
app.post('/SpeMem/:id',(req,res)=>{
    const que="SELECT * FROM `employee`.`employee`  WHERE (`employee`.`id`=(?)) "
    db.query(que,[req.params.id],(err,data)=>{
        if (err) return res.json(err);
         return res.json(data)
    })

})
app.post('/SpeTeam/:id',(req,res)=>{
    const que="SELECT * FROM `employee`.`team`  WHERE (`team`.`teamid`=(?)) "
    db.query(que,[req.params.id],(err,data)=>{
        if (err) return res.json(err);
         return res.json(data)
    })
})

//Department Cards
app.post('/cardComp',(req,res)=>{
    const que="SELECT * FROM `employee`.`department`"
    db.query(que,(err,data)=>{
        if (err) return res.json(err);
         return res.json(data)
    })
})

//Team Page
app.post('/teamData/:id',(req,res)=>{
    //const que="SELECT `teamid` FROM `employee`.`team` WHERE (`adminid`=(?)) ";
    const que="SELECT * FROM `employee`.`employee` JOIN `employee`.`team` USING (`teamid`) WHERE (`employee`.`employee`.`teamid`=(?)) "
    db.query(que,[req.params.id],(err,data)=>{
        if (err) return res.json(err);
         return res.json(data)
    })

})
//Teammem delete
//Delete data
app.delete("/teammem/:id", (req, res) => {
    const que = "DELETE FROM `employee`.`employee`  WHERE (`id` = (?));"
    const que2="DELETE FROM `employee`.`admin` WHERE (`id` = (?));"
    db.query(que, [req.params.id], (err, data) => {
        if (err) return res.json(err);
        //return res.json("Has been deleted succesfully");
        db.query(que2, [req.params.id], (err, data) => {
            if (err) return res.json(err);
            //return res.json("Has been deleted succesfully");
        })
    }
    
    )
})

// Otomatik id ataasında sorun var
//Add data
//We test from postman
app.post("/books", (req, res) => {
    const que = "INSERT INTO `employee`.`books` (`ıd`, `title`, `desc`, `cover`) VALUES (?)"
    //  const values=[3,"title from backend","dec from backend","cover pic from backend"]
    const values = [
        req.body.id,
        req.body.title,
        req.body.desc,
        req.body.cover
    ]
    db.query(que, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Added succesfully");
    })
})
//Add new one
app.post("/employees", (req, res) => {
    const que = "INSERT INTO `employee`.`employee` (`name`, `surname`, `telNum`, `email`, `salary`, `age`, `job`, `teamid`,`id`)VALUES (?)"
    //  const values=[3,"title from backend","dec from backend","cover pic from backend"]
    const values = [
        req.body.name,
        req.body.surname,
        req.body.telNum,
        req.body.email,
        req.body.salary,
        req.body.age,
        req.body.job,
        req.body.teamid,
        req.body.id
    ]
    db.query(que, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Added succesfully");
    })
})
//Update Mem
app.put("/employee/:id", (req, res) => {
    const que = "UPDATE `employee`.`employee` SET `name` = ?, `surname` = ?, `telNum` = ? ,`email`= ? ,`salary` = ?,`age` = ?,`job` = ?,`teamid` = ? WHERE (`id` =( ?));"

    const values = [
        req.body.name,
        req.body.surname,
        req.body.telNum,
        req.body.email,
        req.body.salary,
        req.body.age,
        req.body.job,
        req.body.teamid
    ]

    db.query(que, [...values, req.params.id], (err, data) => {
        if (err) return res.json(err);
        return res.json("Has been updated succesfully");
    })
})

//Update data
app.put("/books/:id", (req, res) => {
    const bookid = req.params.id;
    //  console.log(bookid)
    const que = "UPDATE `employee`.`books` SET `title` = ?, `desc` = ?, `cover` = ? WHERE (`ıd` = ?);"

    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
    ]

    db.query(que, [...values, bookid], (err, data) => {
        if (err) return res.json(err);
        return res.json("Has been updated succesfully");
    })
})



app.listen(8800, () => {
    console.log("connect the backend")
})