import Joi from "joi";
import { v4 as uuidv4 } from "uuid";

const feeDetailsSchema = Joi.object({
  id: Joi.string().guid({ version: 'uuidv4' }).default(uuidv4).messages({
    "string.guid": "Invalid UUID format for ID.",
  }),
  admission_id: Joi.string().guid({ version: 'uuidv4' }).allow(null).messages({
    "string.guid": "Invalid UUID format for Admission ID.",
  }),
  inquiry_id: Joi.string().guid({ version: 'uuidv4' }).allow(null).messages({
    "string.guid": "Invalid UUID format for Inquiry ID.",
  }),
  bank_details_id: Joi.string().guid({ version: 'uuidv4' }).allow(null).messages({
    "string.guid": "Invalid UUID format for Bank Details ID.",
  }),
  current_amount: Joi.number().precision(2).min(0).required().messages({
    "number.base": "Current amount must be a number.",
    "number.precision": "Current amount must have up to 2 decimal places.",
    "number.min": "Current amount must be at least 0.",
    "any.required": "Current amount is required.",
  }),
  remaining_amount: Joi.number().precision(2).min(0).required().messages({
    "number.base": "Remaining amount must be a number.",
    "number.precision": "Remaining amount must have up to 2 decimal places.",
    "number.min": "Remaining amount must be at least 0.",
    "any.required": "Remaining amount is required.",
  }),
  total_amount: Joi.number().precision(2).min(0).required().messages({
    "number.base": "Total amount must be a number.",
    "number.precision": "Total amount must have up to 2 decimal places.",
    "number.min": "Total amount must be at least 0.",
    "any.required": "Total amount is required.",
  }),
  updated_at: Joi.date().default(() => new Date()).messages({
    "date.base": "Invalid date format for updated_at.",
  })
});

export default feeDetailsSchema;
