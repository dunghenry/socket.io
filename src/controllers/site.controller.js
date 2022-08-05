class siteController{
    static getHomePage(req, res){
        return res.render('index', { title: "Home Page" })
    }
    static getAboutPage(req, res){
        return res.render('about', { title: "About Page" })
    }
}

module.exports = siteController;