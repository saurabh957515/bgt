import Joi from 'joi';

export const educationSchema = Joi.object({
  admission_id: Joi.string().length(36).allow(null).messages({
    "string.length": "Admission ID must be a 36-character string.",
  }),
  inquiry_id: Joi.string().length(36).allow(null).messages({
    "string.length": "Inquiry ID must be a 36-character string.",
  }),
  highest_qualification: Joi.string().max(255).required().messages({
    "string.max": "Highest qualification cannot exceed 255 characters.",
    "any.required": "Highest qualification is required.",
  }),
  passing_year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required().messages({
    "number.base": "Passing year must be a number.",
    "number.min": "Passing year must be no earlier than 1900.",
    "number.max": `Passing year cannot be later than ${new Date().getFullYear()}.`,
    "any.required": "Passing year is required.",
  }),
  name_of_institute: Joi.string().max(255).required().messages({
    "string.max": "Name of institute cannot exceed 255 characters.",
    "any.required": "Name of institute is required.",
  }),
  percentage_cgpa: Joi.number().precision(2).greater(0).max(100).required().messages({
    "number.base": "Percentage/CGPA must be a number.",
    "number.greater": "Percentage/CGPA must be greater than 0.",
    "number.max": "Percentage/CGPA cannot exceed 100.",
    "any.required": "Percentage/CGPA is required.",
  }),
  is_employed: Joi.number().integer().valid(0, 1).required().messages({
    "number.base": "Is employed must be a number.",
    "any.only": "Is employed must be either 0 or 1.",
    "any.required": "Employment status is required.",
  }),
  current_company: Joi.string().max(255).allow(null).messages({
    "string.max": "Current company cannot exceed 255 characters.",
  }),
  current_designation: Joi.string().max(255).allow(null).when('is_employed', {
    is: 1,
    then: Joi.string().max(255).allow(null).when('employed_type', {
      is: 'job',
      then: Joi.string().max(255).required().messages({
        "string.max": "Current designation cannot exceed 255 characters.",
        "any.required": "Current designation is required if employed type is job.",
      }),
    }),
    otherwise: Joi.string().max(255).allow(null),
  }),
  current_monthly_salary: Joi.number().precision(2).min(0).allow(null).when('is_employed', {
    is: 1,
    then: Joi.number().precision(2).min(0).when('employed_type', {
      is: 'job',
      then: Joi.number().precision(2).min(0).required().messages({
        "number.base": "Current monthly salary must be a number.",
        "number.min": "Current monthly salary must be at least 0.",
        "any.required": "Current monthly salary is required if employed type is job.",
      }),
    }),
    otherwise: Joi.number().precision(2).min(0).allow(null),
  }),
  total_experience_years: Joi.number().precision(1).min(0).allow(null).when('is_employed', {
    is: 1,
    then: Joi.number().precision(1).min(0).required().messages({
      "number.base": "Total experience years must be a number.",
      "number.min": "Total experience years must be at least 0.",
      "any.required": "Total experience years is required if employed.",
    }),
    otherwise: Joi.number().precision(1).min(0).allow(null),
  }),
  past_rejection_country_name: Joi.string().max(255).allow(null).messages({
    "string.max": "Past rejection country name cannot exceed 255 characters.",
  }),
  ielts_score: Joi.number().precision(1).min(0).max(9).allow(null).messages({
    "number.base": "IELTS score must be a number.",
    "number.min": "IELTS score must be at least 0.",
    "number.max": "IELTS score cannot exceed 9.",
  }),
  business_name: Joi.string().max(255).allow(null).when('employed_type', {
    is: 'business',
    then: Joi.string().max(255).required().messages({
      "string.max": "Business name cannot exceed 255 characters.",
      "any.required": "Business name is required if employed type is business.",
    }),
    otherwise: Joi.string().max(255).allow(null),
  }),
  business_type: Joi.string().max(255).allow(null).when('employed_type', {
    is: 'business',
    then: Joi.string().max(255).required().messages({
      "string.max": "Business type cannot exceed 255 characters.",
      "any.required": "Business type is required if employed type is business.",
    }),
    otherwise: Joi.string().max(255).allow(null),
  }),
  business_start_date: Joi.date().allow(null).messages({
    "date.base": "Business start date must be a valid date.",
  }),
  employed_type: Joi.string().valid('business', 'job').allow(null).when('is_employed', {
    is: 1,
    then: Joi.string().valid('business', 'job').required().messages({
      "any.only": "Employed type must be either 'business' or 'job'.",
      "any.required": "Employed type is required if employed.",
    }),
    otherwise: Joi.string().valid('business', 'job').allow(null),
  }),
  place_of_birth: Joi.string().max(255).allow(null).messages({
    "string.max": "Place of birth cannot exceed 255 characters.",
  }),
  gender: Joi.string().valid('male', 'female', 'others').allow(null).messages({
    "any.only": "Gender must be one of 'male', 'female', or 'others'.",
  }),
  current_nationality: Joi.string().max(255).allow(null).messages({
    "string.max": "Current nationality cannot exceed 255 characters.",
  }),
});
