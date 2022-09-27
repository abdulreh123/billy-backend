module.exports = {


  friendlyName: 'Verify',


  description: 'Verify user.',


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
      const email = env.req.session?.authinfo?.emailAddress
      if (!email) {
        return exits.notAUser({
          error: `please log in`,
        });
      }
      const group = await sails.models.group.findAll({
        include: [
          {
            model: sails.models.users,
            as: 'users'
          },
          {
            model: sails.models.category,
            as: 'categories'
          }
        ]
      });
      return exits.success({
        data: group,
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
