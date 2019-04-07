var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    cookies: JSON.stringify(req.cookies, null, 4),
    signedCookies: JSON.stringify(req.signedCookies, null, 4),
    session: JSON.stringify(req.session, null, 4),
  });
});

router.post('/cookie', function(req, res, next) {
  const randomNumber = Math.random().toString();
  const cookieName = `coockie-${randomNumber}`;
  const cookieValue = randomNumber;
  res.cookie(cookieName, cookieValue, { maxAge: 900000, httpOnly: true });
  res.redirect('/')
});

router.post('/signedCookie', function(req, res, next) {
  const randomNumber = Math.random().toString();
  const cookieName = `signed-coockie-${randomNumber}`;
  const cookieValue = randomNumber;
  res.cookie(cookieName, cookieValue, { maxAge: 900000, httpOnly: true, signed: true });
  res.redirect('/')
});

router.post('/session', function(req, res, next) {
  const randomNumber = Math.random().toString();
  const sessionKey = `signed-coockie-${randomNumber}`;
  const sessionValue = randomNumber;
  req.session[sessionKey] = sessionValue
  req.session.save(() => {
    res.redirect('/')
  })
});


module.exports = router;
