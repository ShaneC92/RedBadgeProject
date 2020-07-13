const router = require('express').Router()
const Movie = require('../db').import('../models/movie');
const comment = require("../db").import("../models/comments");

//GET
router.get('/movie', (req, res) => {
    Movie.findAll()
        .then(movie => res.status(200).json({
            movie: movie
        }))
        .catch(err => res.status(500).json({
            error: err
        }))
})

//UPDATE comment
router.put("/commentUpdate/:id",(req,res)=>{
    let data = {
        comment: req.body.comment
    }
    comment.update(data,{
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

//delete comment
router.delete("/deleteComment/:id",(req,res)=>{
    let id = req.params.id;
    comment.destroy({
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
//POSTING COMMENTS
router.post("/comments",(req,res)=>{
    let comment = {
        comment: req.body.comment,
        owerId: req.user.id,
        movieId: req.body.movieId
    }
    comment.create(comment)
        .then(comment=>{
            res.status(200).json({
                comment: comment
            })
        },(err)=>res.send(err,err.message))
        .catch(err=>{
            res.status(500).json({
                err:err
            })
        })

})

//GET
router.get("/comments",(req,res)=>{
    comment.findAll({
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


//POST
router.post('/movie', (req, res) => {
    const movies = {
        poster:req.body.poster,
        movieTitle: req.body.movieTitle,
        genre: req.body.genre,
        popularity: req.body.popularity,
        releaseDate: req.body.releaseDate,
        runTime: req.body.runTime,
        description: req.body.description,
        voting:req.body.voting
    }

    Movie.create(movies)
        .then(movie => res.status(200).json({
            movie: movie
        }))
        .catch(err => res.status(500).json({
            error: err
        }))
})


module.exports = router;