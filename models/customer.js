const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Customer.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue:() =>  uuidv4()
    },
    first_name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    hash: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customer',
  });
  Customer.prototype.setPassword = function (password) {
    // Creating a unique salt for a particular user 
    this.salt = crypto.randomBytes(16).toString('hex'); 
  
    // Hashing user's salt and password with 1000 iterations, 
     
    this.hash = crypto.pbkdf2Sync(password, this.salt,  
    1000, 64, `sha512`).toString(`hex`); 
  }
  Customer.prototype.isValidPassword = function (password) { 
    var hash = crypto.pbkdf2Sync(password,  
    this.salt, 1000, 64, `sha512`).toString(`hex`); 
    console.log('hash: ', hash)
    console.log('hashfound: ', this.hash)
    return this.hash === hash; 
}; 

  return Customer;
};