const router = require('express').Router();
const favMovie = require('../db').import('../models/favoritemovie');
const commentTable = require("../db").import("../models/comments");

//CRUD (Create, Read, Update, Delete)

//GET
router.get('/favorites', (req, res) => {
    favMovie.findAll({
        where: {
            ID: req.user.id
        }
    })
        .then(movie => res.status(200).json({
            movie: movie
        }))
        .catch(err => res.status(500).json({
            error: err
        }))
});

//GET
router.get("/comments",(req,res)=>{
    commentTable.findAll({
        where:{
            movieId:req.body.movieId
        }
    })
    .then(comment=>{
        res.status(200).json({
            comment:comment
        })
    })
    .catch(err=>{
        res.status(500).json({
            err:err
        })
    })
})

//delete comment
router.delete("/deleteComment/:id",(req,res)=>{
    let id = req.params.id;
    commentTable.destroy({
        where:{
            id:id
        }
    })
    .then(data=>{
        res.status(200).json({
            message: "Successfully deleted"
        })
    })
})

//UPDATE
router.put("/commentUpdate/:id",(req,res)=>{
    let data = {
        comment: req.body.comment
    }
    commentTable.update(data,{
        where: {
            id: req.params.id
        }
    })
    .then(data=>{
        res.status(200).json({
            message: "Updated"
        })
    })
    .catch(err=>{
        res.status(500).json({
            err:err
        })
    })
})

//POSTING COMMENTS
router.post("/comments",(req,res)=>{
    commentTable.create({
        comment: req.body.comment,
        ownerId: req.user.id,
        movieId: req.body.movieId
    })
    .then(data=>{
        res.status(200).json({
            data: data
        })
    })
        

})

//POST
router.post('/favorites', (req, res) => {
    const movies = {
        poster:req.body.poster,
        movieTitle: req.body.movieTitle,
        genre: req.body.genre,
        popularity: req.body.popularity,
        releaseDate: req.body.releaseDate,
        runTime: req.body.runTime,
        description: req.body.description,
        ID: req.user.id
    }

    favMovie.create(movies)
        .then(movie => res.status(200).json({
            movie: movie
        }))
        .catch(err => res.status(500).json({
            error: err
        }))
})

//DELETE
router.delete('/:id', (req, res) => {
    favMovie.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(movie => res.status(200).json({
        movie: movie
    }))
    .catch(err => res.status(500).json({
        error: err
    }))
})



//UPDATE
router.put('/popularity/:id', (req, res) => {
    const data = {
        popularity: req.body.popularity
    }
    favMovie.update(data, {
        where: {
            id: req.params.id
        }
    })
    .then(movie => res.status(200).json({
        movie: movie
    }))
    .catch(err => res.status(500).json({
        error: err
    }))
})

module.exports = router;