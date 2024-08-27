function ensureAuthenticated(req, res, next) {
    if (req.session.userId) {
      return next();
    } else {
      res.redirect('/employee/login');
    }
  }
  
  function ensureAdmin(req, res, next) {
    if (req.session.userRole === 'admin') {
      return next();
    } else {
      res.status(403).send('Forbidden');
    }
  }
  
  module.exports = {
    ensureAuthenticated,
    ensureAdmin
  };
  
