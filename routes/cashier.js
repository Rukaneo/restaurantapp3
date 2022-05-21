var express = require('express');
var connection = require('../lib/db.js');
var router = express.Router();
const { connect } = require('.');


router.get('/admindisplay', (req, res, next) =>{

    connection.query('SELECT * FROM restaurantapp3.orders ORDER by id',function(err, rows, fields)     {

        if(err){
            //req.flash('error', err); 
            res.render('../views/admin-display.ejs',
            {
                page_title: "Project List",
                data: '',
                user_session: req.session
            });   
        }else{
            
            res.render('../views/admin-display.ejs',
            {
                page_title: "Project List",
                data: rows,
                user_session: req.session
            });
        }                          
         });
   



});


router.get('/admindisplay/edit/:id', function(req, res, next) {
      
    connection.query('SELECT * FROM restaurantapp3.orders WHERE id='+ req.params.id, function(err,row)     {
    
           if(err){
               //req.flash('error', err); 
               res.render('../views/admin-edit.ejs',
               {
                   page_title: "Admin Editor",
                   data: ''
               });   
           }else{
               
            res.render('../views/admin-edit.ejs',
            {
                    page_title: "Admin Editor",
                    data: row
               });
           }
                               
            });
           
       });


       //**************************TO EDIT THE ORDERS ***************************/

       router.post('/admin/update', function(req, res, next) {
      

        let sqlQuery = "UPDATE restaurantapp3.orders SET cust_email ='" + req.body.cust_email + 
                                            "', date ='" + req.body.date + 
                                            "', main_dsh ='" +  req.body.main_dsh + 
                                            "', side_dsh  ='" + req.body.side_dsh +
                                            "', drink ='" + req.body.drink +  
                                            "', order_con ='" + req.body.order_con + 
                                            "', order_nm ='" + req.body.order_nm + 
                                            "' WHERE id = " + req.body.id;
    
        connection.query(sqlQuery, function(err,rows)     {
        
                   //req.flash('error', err); 
                   res.redirect('/admindisplay');   
                   next();                
                });
               
           });


module.exports = router;