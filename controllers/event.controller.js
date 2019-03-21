

exports.homePage = (req, res) => {
    if (req.user) {
        let role = req.user.role;
        console.log(role);
        res.redirect(`/${role}/home`);
    }
    else {
        res.render('home', { success: req.flash('success') });
    }
}