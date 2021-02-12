function isGuest(req, res, next) {
    if (req.user) {
       res.redirect("/products");
       return;
    }

    next();

}

module.exports = isGuest;