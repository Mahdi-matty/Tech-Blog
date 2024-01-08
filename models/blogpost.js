const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt");

class BlogPost extends Model {};

BlogPost.init({
    // add properites here, ex:
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
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
   user_id:{
    type: DataTypes.INTEGER,
    allowNull: false
   },
    blogDate:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
},{
    sequelize
});

module.exports=BlogPost