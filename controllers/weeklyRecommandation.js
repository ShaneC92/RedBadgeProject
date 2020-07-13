const router = require('express').Router();
//const router = require("./favmoviecontroller");
const weekly = require("../db").import("../models/weekly");


router.post("/postMovie",(req,res)=>{
    listOfMovies = {
        poster:req.body.poster,
        Genre: req.body.genre,
        movieTitle: req.body.movieTitle,
        popularity: req.body.popularity,
        releaseDate: req.body.releaseDate,
        runTime: req.body.runTime,
        description: req.body.description,
        voting:req.body.voting
    }
    weekly.create(listOfMovies)
        .then(data=>{
            res.status(200).json({
                data: data
            })
        })
        .catch(console.log);
    
})

//get all the movies from the table
router.get("/movies",(req,res)=>{
    weekly.findAll()
        .then(movies=>{
            res.status(200).json({
                movies:movies
            })
        })
        .catch(err=>res.status(500).json({
            err:err
        }))
})

//updating the movie list.
router.put("/movieLists",(req,res)=>{
    let data = {
        genre: req.body.genre,
        movieTitle: req.body.movieTitle,
        popularity: req.body.popularity,
        releaseDate: req.body.releaseDate,
        runTime: req.body.runTime,
        description: req.body.description
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

//deleting the movie list
router.delete("/movieList/:id",(req,res)=>{
    let id = req.params.id;
    weekly.destroy({
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

module.exports = router;
