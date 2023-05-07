const ObjectId = require('mongodb').ObjectId
module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        db.collection('books').find().toArray((err, result) => {
          if (err) {
            res.send(err)
          }else{
            res.render('profile.ejs', {
              user : req.user,
              books: result
            })
          }
    
        })
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout(() => {
          console.log('User has logged out!')
        });
        res.redirect('/');
    });

// book tracker routes ===============================================================
    app.post('/bookLogged', (req, res) => {
      db.collection('books').save({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        rating: req.body.rating,
        status: req.body.status
      }, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile')
      })
    })

    app.put('/bookUpdated', (req, res) => {
      console.log(req.body)
      const {title, author, genre, rating, status, id} = req.body
      console.log(id)
      db.collection('books').findOneAndUpdate({
        "_id":ObjectId(id) 
      }, {
        $set: {
          title: title,
          author: author,
          genre: genre,
          rating: rating,
          status: status
        }
      }, {
        // sort: { _id: -1 },
        returnOriginal : false
        // upsert: true //if record not found then create one
      }, (err, result) => {
        if (err) return res.send(err)
        console.log(result)
        res.send(result)
      })
  })

    app.delete('/bookDeleted', (req, res) => {
      const _id = ObjectId(req.body._id)
      db.collection('books').findOneAndDelete({
        _id
      }, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
