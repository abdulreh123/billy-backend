bcrypt = require('bcrypt');
jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'login',


  description: 'login user.',


  inputs: {
    emailAddress: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
    },
    password: {
      type: 'string',
      required: true,
      minLength: 7,
    },
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
  fn: async function (inputs, exits,env) {
    try {
      const user = await sails.models.users.findOne({ where: { emailAddress: inputs.emailAddress } });
      if (!user) {
        return exits.notAUser({
          error: `${inputs.emailAddress} not found`,
        });
      }
      const check = await bcrypt.compare(inputs.password, user.password);
      if (check) {
        const token = await jwt.sign({ id: user.id, emailAddress: user.emailAddress, password: user.password }, 'billyApp', {
          expiresIn: 36000,
        });
        env.req.session.authenticated = true;
        env.req.session.authinfo = user;
        return exits.success({
          message: `${user.emailAddress} is logged in`,
          data: user,
          token,
        });
      } else {
        exits.wrongPassword({ error: 'Wrong password' });
      }
    } catch (error) {
      sails.log.error(error);
      if (error.isOperational) {
        return exits.operationalError({
          message: `Error logging in user ${inputs.email}`,
          error: error.raw,
        });
      }
      return exits.error({
        message: `Error logging in user ${inputs.email}`,
        error: error.message,
      });
    }
  }
};
