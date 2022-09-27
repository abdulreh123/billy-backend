module.exports = {


  friendlyName: 'get category',


  description: 'get category',


  inputs: {

  },


  exits: {
    success: {
      description: 'successful',
    },
    notAUser: {
      statusCode: 404,
      description: 'not found',
    },
  },

  fn: async function (inputs, exits, env) {
    try {
      console.log('hi')
      const email = env.req.session?.authinfo?.emailAddress
      if (!email) {
        return exits.notAUser({
          error: `please log in`,
        });
      }
      const id =env.req.param('id')
      const category = await sails.models.category.findOne({
        weher:{id:id}
      });
      return exits.success({
        data: category,
      });

    } catch (error) {
      sails.log.error(error);
      if (error.isOperational) {
        return exits.operationalError({
          message: `Error getting users`,
          error: error.raw,
        });
      }
      return exits.error({
        message: `Error getting users `,
        error: error.message,
      });
    }

  }


};
