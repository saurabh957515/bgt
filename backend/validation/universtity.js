import Joi from "joi";
import { v4 as uuidv4 } from "uuid";

const universitySchema = Joi.object({
  id: Joi.string().guid({ version: 'uuidv4' }).default(uuidv4).messages({
    "string.guid": "Invalid UUID format for ID.",
  }),
  institute_name: Joi.string().max(255).required().messages({
    "string.empty": "Institute name is required.",
    "string.max": "Institute name cannot exceed 255 characters.",
  }),
  country: Joi.string().max(255).required().messages({
    "string.empty": "Country is required.",
    "string.max": "Country cannot exceed 255 characters.",
  }),
  course_detail: Joi.string().max(255).required().messages({
    "string.empty": "Course detail is required.",
    "string.max": "Course detail cannot exceed 255 characters.",
  }),
  city: Joi.string().max(255).required().messages({
    "string.empty": "City is required.",
    "string.max": "City cannot exceed 255 characters.",
  }),
  stay_in_type: Joi.string().valid('PG', 'Hostel', 'Family').required().messages({
    "any.only": "Stay-in type must be one of 'PG', 'Hostel', or 'Family'.",
    "string.empty": "Stay-in type is required.",
  }),
  stay_in_address: Joi.string().allow(null, '').max(1000).messages({
    "string.max": "Stay-in address cannot exceed 1000 characters.",
  }),
  inquiry_id: Joi.string().guid({ version: 'uuidv4' }).allow(null).messages({
    "string.guid": "Invalid UUID format for Inquiry ID.",
  }),
  admission_id: Joi.string().guid({ version: 'uuidv4' }).allow(null).messages({
    "string.guid": "Invalid UUID format for Admission ID.",
  }),
  created_at: Joi.date().default(() => new Date()).messages({
    "date.base": "Invalid date format for created_at.",
  }),
  updated_at: Joi.date().default(() => new Date()).messages({
    "date.base": "Invalid date format for updated_at.",
  })
});

export default universitySchema;
