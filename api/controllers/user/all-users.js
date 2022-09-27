module.exports = {


  friendlyName: 'Verify',


  description: 'Verify user.',


  inputs: {

  },


  exits: {
    success: {
      description: 'Login successful',
    },
    notAUser: {
      statusCode: 404,
      description: 'User not found',
    },
    wrongPassword: {
      statusCode: 404,
      description: 'Wrong password',
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
      const user = await sails.models.users.findAll({
        include: [
          {
            model: sails.models.group,
            as: 'groups'
          }
        ]
      });
      return exits.success({
        data: user,
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
