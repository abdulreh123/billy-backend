bcrypt = require('bcrypt');
module.exports = {


  friendlyName: 'create group',


  description: 'create new group.',


  inputs: {
    name: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      statusCode: 201,
      description: 'New group created',
    },
    error: {
      description: 'Something went wrong, try again',
    },
  },
  fn: async function (inputs, exits,env) {
    // All done.
    try {
      
      const id =env.req.session?.authinfo?.id
      await sails.models.group.create({
        name: inputs.name,
        groupHead:id
      });
      return exits.success({
        message: `${inputs.name} group created successfully`,
      });
    } catch (error) {
      return exits.error({
        message: 'Oops :) an error occurred',
        error: error.message,
      });
    }
  },

};
