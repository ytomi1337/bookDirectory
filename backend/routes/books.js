var express = require('express');
var router = express.Router();
var Book = require('../models/books');
const { Sequelize } = require('sequelize');

router.get('/', function(req, res, next) {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.count) || 10
    const orderKey = req.query.sortKey || 'id'
    const orderValue = req.query.sortValue || 'asc'


    if(Number(req.query.count) > 100){
        return next({message: 'Limit is to heigh', status: 400})
    }
    Book.findAll({
        offset: (page - 1  ) * limit,
        limit: limit,
        order: [ [orderKey, orderValue] ]
    })
    .then((books) => {
      res.send(books);
    });
});
//kom
router.post('/', function(req,res,next){
    Book.create({
        title: req.body.title,
        author: req.body.author,
        year: req.body.year
    }).then((book) => { res.send(book)})
})


router.delete('/', function(req,res,next){
    Book.destroy({    where:         {[Sequelize.Op.or]: [
        { title: req.query.title },
        { author: req.query.author },
        { year: req.query.year }
      ]}
     
     }).then(function() { res.send('ok')})
})



module.exports = router;
