const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt");

class BlogPost extends Model {};

BlogPost.init({
    // add properites here, ex:
    id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    title: {
         type: DataTypes.STRING,
         allowNull:false
    },
    content: {
        type: DataTypes.STRING,
        allowNull:false
   },
    date:{
        type:DataTypes.DATETIME,
        defaultValue: DataTypes.NOW,
    }
},{
    sequelize
});

module.exports=BlogPost