const withAuth = (req, res, next) => {
  // If the user is not logged in this directs the user to the login page.
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    // If the user is logged in this allows the user to view, comment and vote on books.
    next();
  }
};

module.exports = withAuth;
