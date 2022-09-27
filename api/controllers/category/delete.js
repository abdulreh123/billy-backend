bcrypt = require('bcrypt');
module.exports = {


  friendlyName: 'delete category',


  description: 'delete category.',


  inputs: {
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
      await sails.models.category.destroy({where:{id:id}});
      return exits.success({
        message: `category deleted successfully`,
      });
    } catch (error) {
      return exits.error({
        message: 'Oops :) an error occurred',
        error: error.message,
      });
    }
  },

};
