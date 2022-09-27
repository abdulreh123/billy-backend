bcrypt = require('bcrypt');
module.exports = {


  friendlyName: 'update category',


  description: 'update category',


  inputs: {
    name: {
      type: 'string',
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
      description: 'category updated',
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
      await sails.models.category.update({
        name: inputs.name,
        userId:inputs.userId ,
        groupId:inputs.groupId
      },{where:{id:id}});
      return exits.success({
        message: ` category updated successfully`,
      });
    } catch (error) {
      return exits.error({
        message: 'Oops :) an error occurred',
        error: error.message,
      });
    }
  },

};
