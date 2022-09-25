bcrypt = require('bcrypt');
module.exports = {


  friendlyName: 'Register',


  description: 'Register user.',


  inputs: {
    fullName: {
      type: 'string',
      required: true,
    },
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
      statusCode: 201,
      description: 'New user created',
    },
    emailAlreadyInUse: {
      statusCode: 400,
      description: 'Email already in use!',
    },
    error: {
      description: 'Something went wrong, try again',
    },
  },

  const :hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  },
  fn: async function (inputs, exits) {
    // All done.
    try {
      const newEmailAddress = inputs.emailAddress.toLowerCase();
      let newUser = await sails.models.users.create({
        fullName: inputs.fullName,
        emailAddress: newEmailAddress,
        password: await hashPassword(inputs.password),
      });
      return exits.success({
        message: `${newUser}}account created successfully`,
      });
    } catch (error) {
      if (error.code === 'E_UNIQUE') {
        return exits.emailAlreadyInUse({
          message: 'Oops :) an error occurred',
          error: 'This email already exits',
        });
      }
      return exits.error({
        message: 'Oops :) an error occurred',
        error: error.message,
      });
    }
  },

};
