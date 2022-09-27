bcrypt = require('bcrypt');
module.exports = {


  friendlyName: 'update group',


  description: 'update group.',


  inputs: {
    name: {
      type: 'string',
    },
    groupHead: {
      type: 'number',
    },
  },

  exits: {
    success: {
      statusCode: 201,
      description: 'group updated',
    },
    error: {
      description: 'Something went wrong, try again',
    },
  },
  fn: async function (inputs, exits,env) {
    // All done.
    try {
      const email = env.req.session?.authinfo?.emailAddress
      if (!email) {
        return exits.notAUser({
          error: `please log in`,
        });
      }
      
      const id =env.req.param('id')
      await sails.models.group.update({
        name: inputs.name,
        groupHead:inputs.groupHead
      },{where:{id:id}});
      return exits.success({
        message: `${inputs.name} group updated successfully`,
      });
    } catch (error) {
      return exits.error({
        message: 'Oops :) an error occurred',
        error: error.message,
      });
    }
  },

};
