var express = require('express')
var connection  = require('../lib/db');
var router = express.Router();

// Gets the home page (index.ejs)


router.get('/', (req, res, next) => {
    if (req.session.adminloggedin === true || req.session.custloggedin === true){

        res.render('../views/index.ejs',
        {
            user_session: req.session,
            page_title: "Home Page",
            // user_f_name: req.session.frst_nm,
            // user_l_name: req.session.last_nm,
            // user_is_admin: req.session.is_admin

        });
        // console.log(req.session);
  }else{
    
    res.redirect('/falseindex');

  }
})
//This renders false dummy page of index. That does EXACTLY same as index but doesn't require a loggin as such when session is 
// up you default here.
router.get('/falseindex', (req, res, next) => {
    res.render('../views/falseindex.ejs',
    {
        page_title: "You are not logged in"
    });
})



// router.get('/project', function(req, res, next) {
      
//     connection.query('SELECT * FROM projectapp1.projects',function(err, rows, fields)     {
   
//        if (!err)
            
//        res.send(rows);
       
//    else 
//        console.log(err);
//    })
   
//    }); 
    


module.exports = router