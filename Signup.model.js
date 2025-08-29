const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Event = require('./Event.model.js');

const Signup = sequelize.define('Signup', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  artistName: { type: DataTypes.STRING, allowNull: false },
  contactEmail: { type: DataTypes.STRING, allowNull: false },
  genre: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT }, // New field for artist bio
  promoPhotos: { type: DataTypes.TEXT } // New field for photo URLs
}, { timestamps: true });

Signup.belongsTo(Event);
Event.hasMany(Signup);

module.exports = Signup;
