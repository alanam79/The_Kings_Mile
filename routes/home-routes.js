//handlebars routes //open
const router = require("express").Router();
const { Book } = require('../models');
const withAuth = require('../utils/auth')


router.get("/", async (req, res)=> {
    try {
        const dbBookData = await Book.findAll({
            include: [
                {
                    // model: Book,
                    attributes: [
                        'id',
                        'title',
                        'author',
                        'published_date',
                        'file_name',
                        'pages'
                    ],
                },
            ],
            raw: true,
        });

        const book = dbBookData.map({plain : true}) 

        res.render( 'book', { book });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/booklist", (req,res) =>{
    //book.findname.route //include books for author
})

module.exports = router