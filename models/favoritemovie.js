module.exports = (sequelize, DataTypes) => {
    const favMovie = sequelize.define('favorites', {
        poster:{
            type:DataTypes.STRING,
            allowNull:false
        },
        movieTitle: {
            type: DataTypes.STRING,
            allowNull: false
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
        ID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return favMovie;
}