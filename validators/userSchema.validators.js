const Joi = require("joi")

const userSchema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    no_hp: Joi.string().min(3).max(12).required(),
    no_rek: Joi.string().min(3).max(16).required(),
    password: Joi.string().min(3).max(255).required(),
  });
  

  module.exports = userSchema