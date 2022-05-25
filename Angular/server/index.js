const express = require('express'); 
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyparser = require('body-parser');
const mysql = require('mysql');
const multer = require('multer');

const upload = multer({storage: multer.memoryStorage()});

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
    let sqlInsert = `INSERT INTO user(name, surname, email, status, password,institution) 
    VALUES('${name}', '${surname}','${email}','0', '${password}','${institution}')`;

    db.query(sqlInsert, (err, result) => {
        if(err) {
            console.log(err);  
            res.send({
                message: "User could not be added."
             });
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


app.put('/user/edituser/:id', (req, res) => {

    let userId = req.params.id;

    let name = req.body.name; 
    let surname = req.body.surname; 
    let email = req.body.email; 
    let password = req.body.password; 
    let institution = req.body.institution; 

    let sqlUpdate = `UPDATE user SET name = '${name}', 
        surname = '${surname}', email = '${email}', password = '${password}',institution = '${institution}' 
        WHERE id = '${userId}' `;
   
   db.query(sqlUpdate, (err, result) => {

        if(err) {
            console.log(err);
        }else {
            res.send({
                message: "User updated Successfuly.."
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




function verifyToken(req, res, next) {

    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request');
    }

    let token = req.headers.authorization.split(' ')[1];
    if(token === 'null'){
        return res.status(401).send('Unauthorized request');
    }

    let payload = jwt.verify(token, 'secretKey');

    if(!payload){
        return res.status(401).send('Unauthorized request');
 
    }
    req.userId = payload.subject;
    next();
}

//User Authentication 

app.post('/login',  (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    let sqlQuery = `SELECT * FROM user WHERE email='${email}' AND password='${password}'`;

    db.query(sqlQuery, (err, user) =>{

        if(err){
            res.status(404).send('Invalid credantials entered. ')
        }else{
            let payload = {subject: user.id };
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({token});
        }

    })

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

app.get("/user/login", (req, res) => {

    let email = req.body.email; 
    let password = req.body.email; 

    var sqlGet = `SELECT * FROM user WHERE email = '${email}' AND password = '${password}'`;

    db.query(sqlGet, (err, result) => {
        if(err) 
        {
            console.log(err);
            res.send({message: "User Not Found"});
        }else {
            //Generate the web token
            
        }
    });
}); 



app.post('/supportingdoc/create', (req, res) => {

let id = req.body.id;
let userType = req.body.type;
let docType = req.body.id;
let status = 0;
    

    var sqlInsert = `INSERT INTO Application(id,User_Type,status,Doc_Type) VALUES('${id}', '${userType}','${status}','${docType}')`; 

    db.query(sqlInsert, (err, result) => {
        if(err) {
            console.log(err);
        }else{
            res.send({
                message: "File application created successufully"
            });
        }

    });


});


app.put('/user/activateuser/:id', (req, res) => {

    let userId = req.params.id;

    

    let sqlEdit = `UPDATE user SET status = 1 WHERE id = '${userId}'`;
    db.query(sqlEdit, (err, result) => {

        if(err) {
            console.log(err);
        }else {
            res.send({
                message: "User approved Successfuly.."
            })
        }
   });

   


});

//GRADES

app.get('/grades', (req, res) => {

    let sqlGet = `SELECT * FROM grade`;
    db.query(sqlGet, (err, result) => {

        if(err){
            res.send({message: "An error occured"});
        }else {
            res.send(result);
        }
    });

});

app.get('/grades/:id', (req, res) => {

    let description = req.params.id;
    let sqlGet = `SELECT * FROM grade WHERE description='${description}'`;
    db.query(sqlGet, (err, result) => {

        if(err){
            res.send({message: "An error occured"});
        }else {
            res.send(result);
        }
    });

});


app.post('/subject/add/:id', (req, res) => {

    let name = req.body.name;
    let gradeId = req.params.id;

    let dbInsert = `INSERT INTO subject(name, grade) VALUES('${name}', '${gradeId}')`;

    db.query(dbInsert, (err, result) => {
        if(err){
            console.log(err);
            res.send({message: "Insert was unsuccessful."});
        }else {
            res.send({message: "Data inserted successfully"});
        }
    });
});


app.get('/subjects/:id', (req, res) => {
    let gradeId = req.params.id;

    let sqlGet = `SELECT * FROM subject WHERE grade = '${gradeId}'`;

    db.query(sqlGet, (err, result) => {
        if(err){
            console.log(err);
            res.send({message: "Cannot get subjects"});
        }else {
            res.send(result);
        }
    });
});

app.delete('subjects/delele/:id', (req, res) => {

    let subjectId = req.params.id;
    let sqlDelete = `DELETE * FROM subject WHERE id = '${subjectId}'`

    db.query(sqlDelete, (err, result) => {
        if(err) {
            console.log(err);
            res.send({message: "Subject could not be deleted."})
        }else {
            res.send({message: "Subject deleted successfully."});
        }
    });

});

app.post('packages/create',(req, res) => {

    let grade = req.body.grade; 
    let description =req.body. description; 
    let price = req.body.price;
    let max_subjects = req.body.max_subjects;


    let sqlInsert = `INSERT INTO package(grade, description, price, max_subject_limit) VALUES ('${grade}',
    '${description}', '${price}', '${max_subjects}')`;

    db.query(sqlInsert, (err, result) => {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.send({message: "Package created successfully."});
        }
    })

} );

app.put('/packages/edit/:id', (req, res) => {

    let packId = req.params.id;

    let grade = req.body.grade; 
    let description =req.body. description; 
    let price = req.body.price;
    let max_subjects = req.body.max_subjects;

    let sqlEdit = `UPDATE package SET  grade='${grade}'description='${description}' price=${price} max_subject_limit=${max_subjects} WHERE id = '${packId}'`;
    db.query(sqlEdit, (err, result) => {

        if(err) {
            console.log(err);
        }else {
            res.send({
                message: "package updated"
            })
        }
   }); 
})

app.post('/packages/:id/addsubject', (req, res) => {
    
let sqlAdd = `INSERT INTO package_subject()`;

db.query(sqlAdd, (err, result) => {

}); 
});

app.get('/packages', (req, res) => {
    let sqlGet = `SELECT * FROM package`;

    db.query(sqlGet, (err, result) => {
        if(err){
            console.log(err);
            res.send({message: "Cannot get package"});
        }else{
            res.send(result);
        }

    }); 

});

app.get('/packages/:id', (req, res) => {
    let id = req.params.id;
    let sqlGet = `SELECT * FROM package WHERE id='${id}'`;
    console.log(typeof(id));
    db.query(sqlGet, (err, result) => {
        if(err){
            console.log(err);
            res.send({message: "Cannot get package"});
        }else{
            console.log(result);
            res.send(result);
        }
    }); 
});

app.post('/packages/assign/:id', (req, res) => {
    
let packageId = req.params.id;
let subjectId = req.body.subjectId; //Comes from the form. 

let sqlInsert = `INSERT INTO package_subject(pac_id, sub_id) VALUES('${packageId}','${subjectId}')`;

db.query(sqlInsert, (err, result) => {
    if(err) {
        res.send({message:"Assignment was unsuccessful"});
    }else {
        res.send({message:"Subjects assigned"});
    }
})

});

//Subjects
app.post('/assessments/create/:id', (req, res) => {

    let subjectId = req.params.id;
    let name = req.body.name;
    let term = req.body.term;
    let total = req.body.total;
    let term_weighting = req.body.term_weighting;
    let year_weighting = req.body.year_weighting;
    
    let sqlAdd = `INSERT INTO user(name, term, total, term_weighting, year_weighting, subject_id) 
    VALUES('${name}','${term}','${total}','${term_weighting}','${year_weighting}', '${subject_id}')`;

    db.query(sqlAdd, (err, result) => {

        if(err){
            res.send({message: "Assessment could not be added."})
        }else {
            res.send({message: "Assessment added."})
        }
    });

});

app.get('/assessments/:id', (req, res) => {
 let subjectId = req.params.id;

 let sqlGet = `SELECT * FROM assessment WHERE subject_id='${subjectId}'`;

 db.query(sqlGet, (err, result) => {
    if(err){
        console.log(err);
        res.send({message: "Cannot get subjects"});
    }else{
        res.send(result);
    }

}); 
});

app.post('/subject/upload',upload.single('document'), (req, res) => {

    //let file = req.file;
    //let documentName = file.filename;
    let document = req.file.buffer.toString('base64');

    console.log(req.file, "File From the client.");

    let sqlInsert = `INSERT INTO subject_doc(doc, name) VALUES('${document}','name')`;

    db.query(sqlInsert, (err, result) => {
        if(err){
            console.log(err);
            res.send({message: "An error occured."});
        }else {
            
            res.send({message: "Document Uploaded Successfully"});
        }
    });

});




app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})

