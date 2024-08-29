
function ensureAuthenticated(req, res, next) {
    if (req.session.empId) {
      return next();
    } else {
      res.redirect('/employee/login');
    }
  }
  
  function ensureAdmin(req, res, next) {
    if (req.session.empRole === 'admin') {
      return next();
    } else {
      res.status(403).send('Forbidden : Admins can only access employee details');
    }
  }

  module.exports = {
    ensureAuthenticated,
    ensureAdmin
  };
  