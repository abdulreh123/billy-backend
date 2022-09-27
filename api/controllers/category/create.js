bcrypt = require('bcrypt');
module.exports = {


  friendlyName: 'create category',


  description: 'create new category.',


  inputs: {
    name: {
      type: 'string',
      required: true,
    },
    userId: {
      type: 'number',
    },
    groupId: {
      type: 'number',
    },
  },

  exits: {
    success: {
      statusCode: 201,
      description: 'New category created',
    },
    error: {
      description: 'Something went wrong, try again',
    },
  },
  fn: async function (inputs, exits,env) {
    // All done.
    try {
      await sails.models.category.create({
        name: inputs.name,
        userId:inputs.userId,
        groupId:inputs.groupId
      });
      return exits.success({
        message: `${inputs.name} category created successfully`,
      });
    } catch (error) {
      return exits.error({
        message: 'Oops :) an error occurred',
        error: error.message,
      });
    }
  },

};
