//handlebars routes //open

const router = require("express").Router();
router.get("/" , (req,res)=> {
    res.render("home")
})
router.get("/booklist", (req,res) =>{
    //book.findname.route //include books for author
})

module.exports = router