var express = require('express');
var connection = require('../lib/db.js');
var router = express.Router();
const { connect } = require('.');
const bcrypt = require("bcrypt");

const password = 'password';



// get the login page
router.get('/login', (req, res, next) => {
    if (req.session.adminloggedin === true) {
        res.redirect('/admindisplay',);


    } else {
        res.render('../views/login.ejs',
            {

                page_title: "Admin Login",
                username: '',
                password: ''
            })

    }

});


//authurize admin
router.post('/adminlogin', function (req, res, next) {


    var username = req.body.username;
    var password = req.body.password;
    const saltrounds = 10;


    bcrypt.genSalt(saltrounds, (err, salt) => {

        console.log(salt);
        bcrypt.hash(password, salt, (err, hash) => {
            console.log(hash);
            connection.query('SELECT * FROM admin WHERE username = ?', [username], function (err, rows, fields) {
                bcrypt.compare(hash, rows[0].password, (err, same) => {

                    if (err) throw err
                    console.log(err);
                    console.log(rows.length);
                     if (rows.length <= 0) {
                        res.redirect("/login");
                    } else if (same) {
                        req.session.adminloggedin = true;
                        req.session.username = rows[0].username;
                        res.redirect('/admindisplay');
                    }

                });
            });
        })
    });




});

// router.get('/adminlogout', function (req, res) {
//     req.session.destroy();
//     req.flash('success', 'Enter Your Login Credentials');
//     res.redirect('/adminlogin');
//   });


// *************************ALL CUSTOMER SEGMENT LOGIN ****************************************||


router.get('/clogin', (req, res, next) => {
    res.render('../views/customer-login.ejs',
        {

            page_title: "Customer Login",
            email: '',
            password: ''
        })



});

router.post('/customerlogin', function (req, res, next) {


    var email = req.body.email;
    var password = req.body.password;


    connection.query('SELECT * FROM customer WHERE email = ? AND BINARY password = ?', [email, password], function (err, rows, fields) {

        // connection.query("SELECT * FROM login WHERE  username = '"+ username  +"' AND BINARY password = '"+ password +"'", function(err, rows, fields) {
        if (err) throw err
        console.log(err);
        // if login is incorrect or not found
        console.log(rows.length);
        if (rows.length <= 0) {
            // req.flash('error', 'Invalid credentials Please try again!')
            res.redirect('/login');
        }
        else { // if login found
            //Assign session variables based on login credentials                
            req.session.custloggedin = true;


            req.session.email = rows[0].email;

            // console.log(req.session);
            res.redirect('/');

        }
    });



});


router.get('/adminlogout', function (req, res) {
    req.session.destroy();
    req.flash('success', 'Enter Your Login Credentials');
    res.redirect('/adminlogin');
});


module.exports = router




// req.session.first_name = rows[0].frst_nm;
// req.session.last_name = rows[0].last_nm;
// req.session.is_admin = rows[0].is_admin;

                // connection.query("SELECT * FROM login WHERE  username = '"+ username  +"' AND BINARY password = '"+ password +"'", function(err, rows, fields) {
