const sequelize = require("../db");

module.exports = (sequelize,DataType) =>{
    let weekly = sequelize.define("Recommandation",{
        poster:{
            type:DataType.STRING,
            allowNull:false,
        },
        Genre: DataType.STRING,
        movieTitle: {
            type: DataType.STRING,
            allowNull: false,
            unique: true
        },
        popularity: {
            type: DataType.FLOAT,
            allowNull: false
        },
        releaseDate: {
            type: DataType.STRING,
            allowNull: false
        },
        runTime: {
            type: DataType.INTEGER,
            allowNull: true
        },
        description: {
            type: DataType.STRING,
            allowNull: true
        },
        voting: {
            type: DataType.FLOAT,
            allowNull:true
        }
    });
    return weekly;
}