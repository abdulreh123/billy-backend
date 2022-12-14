/**
 * User.js
 *
 * A user who can log in to this application.
 */
 'use strict';
 const Sequelize = require("Sequelize")
 module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    name: {
      type: Sequelize.STRING,
      required: true,
      maxLength: 200,
      example: 'levent 9'
    },


    groupHead: {
      type: Sequelize.INTEGER,
      required: true,
      description: 'head of the group',
    },



    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    // n/a

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    // n/a

  },

 options: {                                  // Options must exists (even if empty) in order to consider this model a Sequelize model
    tableName: 'groups',
    classMethods: {},
    instanceMethods: {},
    hooks: {},
    scopes: {},
  },
  associations: function() {
    sails.models.group.belongsToMany(sails.models.users, {through:'user_group',foreignKey: 'GroupId', as: 'users' });
    sails.models.group.hasMany(sails.models.category, {foreignKey: 'groupId', as: 'categories' });
  },
  // connection: 'NotDefaultModelsConnection'  
};