import Joi from "joi";

export const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(1).required(),
    password: Joi.string().min(1).required(),
  });

  return schema.validate(user);
};
