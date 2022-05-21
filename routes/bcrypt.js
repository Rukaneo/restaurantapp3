const bcrypt = require("bcrypt");
const saltrounds = 10;
const password = 'password';

bcrypt.genSalt (saltrounds, (err, salt) => {
// return salt
console.log (salt);
    bcrypt.hash(password, salt, (err, hash) => {
        //return ash
        console.log(hash);
    })

});


// bcrypt.genSalt(saltRounds, function(err, salt) {
//     bcrypt.hash(password, salt, function(err, hash) {
//     // returns hash
//     console.log(hash);
//     });
//   });

app.post("/signup", (req, res) => {
    epoch = new Date().getMilliseconds().toString(16);
    hash(req.body.user_password, epoch).then((hashbrowns) => { //Yum!
      connection.query(
        `INSERT INTO users (user_username, user_password, user_email) VALUES ('${req.body.user_username}', '${hashbrowns}', '${req.body.user_email}')`,
        (err) => {
          if (err) res.status(409).send(false);
          else res.send(true);
        }
      );
    });
  });
  