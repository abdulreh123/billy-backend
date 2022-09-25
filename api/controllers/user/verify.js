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

  fn: async function (inputs,exits,env) {
    try {
      const email =env.req.session?.authinfo?.emailAddress
      if (!email) {
        return exits.notAUser({
          error: `please log in`,
        });
      }
      const user = await sails.models.users.findOne({ where: { emailAddress: email } });
      if (user) {
        const token = await jwt.sign({ id: user.id, emailAddress: user.emailAddress, password: user.password }, "billyApp", {
          expiresIn: 36000,
        });
        return exits.success({
          message: `${user.emailAddress} is logged in`,
          data: user,
          token,
        });
      } else {
       exits.notAUser({
          error: `User not found`,
        });
      }
    } catch (error) {
      sails.log.error(error);
      if (error.isOperational) {
        return exits.operationalError({
          message: `Error logging in user`,
          error: error.raw,
        });
      }
      return exits.error({
        message: `Error logging in user `,
        error: error.message,
      });
    }

  }


};
