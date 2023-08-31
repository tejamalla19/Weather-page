const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');
const axios=require('axios');

var serviceAccount = require("./database.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();


app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', function (req,res){
res.sendFile(__dirname + '/login.html') 
})
app.post('/onLogin',function(req,res){
    res.sendFile(__dirname+'/weatherpage.html')
})
app.get('/signup',function(req,res){
    res.sendFile(__dirname+'/signup.html')
})
app.post('/onSignup',function(req,res){
    const data = req.body;
const email = req.body.email;
    console.log(data)
    db.collection('user').where("email", "==", email).get()
    .then(querySnapshot => {
      if (!querySnapshot.empty) {
        res.send("error");
      } else {
        db.collection('user').add(data)
          .then(() => {
            res.send("Successfully signed up!"
            );
          })
          .catch(error => {
            console.error("Error adding data:", error);
            res.render('signup', { message: "An error occurred while signing up." });
          });
      }
    })
    .catch(error => {
        console.error("Error adding data:", error);
        res.render('signup', { message: "An error occurred while signing up." });
      });
}); 


app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });


  