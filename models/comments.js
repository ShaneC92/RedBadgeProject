module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define('comment', {
        comment: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        movieId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Comments;
}
