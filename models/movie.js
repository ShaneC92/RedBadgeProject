module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define('movie', {
        poster:{
            type: DataTypes.STRING,
            allowNull:false,
            unique: true
        },
        movieTitle: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        popularity: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        releaseDate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        runTime: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        voting: {
            type: DataTypes.FLOAT,
            allowNull: true
        }
    })
    return Movie;
}