import Joi from "joi";

// Joi validation schema for creating or updating a note
export const validateNote = (note) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  });
  return schema.validate(note);
};
