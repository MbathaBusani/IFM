const express = require('express'); 
const cors = require('cors');
const bodyparser = require('body-parser');
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "newuser", 
    password: "Uncoded@db",
    database: "mydb"
});

const app = express();

app.use(cors());
app.use(bodyparser.json());


app.get('/users', (req, res) => {

    var sqlQuery = "SELECT * FROM user";

    db.query(sqlQuery, (error, result) => {
      res.send(result);
        
    });

});

app.get('/user/:id', (req, res) => {

    let userId = req.params.id; 

    let sqlQuery = `SELECT * FROM user WHERE id = ${userId}`; 

    db.query(sqlQuery, (err, result) => {

    
   if(err) {
            console.log(err);
        }
        if(result.length > 0 ){
            
            res.send({
                message: 'User Found',
                data: result
            });
        }else {
            res.send({
                message: 'User Not Found',});
        } 

    });

});

app.post('/user/adduser', (req, res) => {

    let name = req.body.name; 
    let surname = req.body.surname; 
    let email = req.body.email; 
    let password = req.body.password; 
    let institution = req.body.institution; 

    console.log("Name: " + name);
    let sqlInsert = `INSERT INTO user(name, surname, email, password,institution) 
    VALUES('${name}', '${surname}','${email}', '${password}','${institution}')`;

    db.query(sqlInsert, (err, result) => {
        if(err) {
            console.log(err);
        }
            res.send({
               message: "User added."
            });
        
    })

});

//Returns a single user
app.get('user/:id', (req, res) => {

    var id = req.params.id;
    var sqlGet = `SELECT * FROM user WHERE id='${id}'`;

    db.query(sqlGet, (err, result) => {
        if(err)
        {
            console.log(err);
            res.send({message: "User not found."});
        }
        else{
            res.send(result);
        }
    });

});


app.post('/user/edituser/:id', (req, res) => {

    let userId = req.params.id;

    let name = req.body.name; 
    let surname = req.body.surname; 
    let email = req.body.email; 
    let password = req.body.password; 
    let institution = req.body.institution; 

    let sqlUpdate = `UPDATE user SET name = '${name}', 
        surname = '${surname}', email = '${email}', password = '${password}',institution = '${institution}' 
        WHERE id = ${userId} `;
   
   db.query(sqlUpdate, (err, result) => {

        if(err) {
            console.log(err);
        }else {
            res.send({
                message: "User updated Successfuly."
            })
        }
   });

});


app.delete("/user/deleteuser/:id", (req, res) => {

   let userId = req.params.id;
    
 let sqlDelete = "DELETE FROM user WHERE id=?";

 db.query(sqlDelete,userId, (err, result) => {
    if(err) {
        console.log(err);
    }else{
        res.send({
        message: "User has been deleted."
        });
    }

 });

});



//Subject 

app.post('/subject/savedoc', (req, res) => {

    let document = req.body.doc;
    

    var sqlInsert = `INSERT INTO subject_doc(doc, name) VALUES('${document}', 'memo')`; 

    db.query(sqlInsert, (err, result) => {
        if(err) {
            console.log(err);
        }else{
            res.send({
                message: "File uploaded successufully"
            });
        }

    });


});


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})

