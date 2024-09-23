import Joi from "joi";
import { v4 as uuidv4 } from "uuid";

const bankSchema = Joi.object({
  id: Joi.string().guid({ version: 'uuidv4' }).default(uuidv4).messages({
    "string.guid": "Invalid UUID format for ID.",
  }),
  account_holder_name: Joi.string().max(255).required().messages({
    "string.empty": "Account holder name is required.",
    "string.max": "Account holder name cannot exceed 255 characters.",
  }),
  account_number: Joi.string().pattern(/^\d{9,18}$/).required().messages({
    "string.empty": "Account number is required.",
    "string.pattern.base": "Account number must be between 9 and 18 digits.",
  }),
  bank_name: Joi.string().max(255).required().messages({
    "string.empty": "Bank name is required.",
    "string.max": "Bank name cannot exceed 255 characters.",
  }),
  branch_name: Joi.string().max(255).required().messages({
    "string.empty": "Branch name is required.",
    "string.max": "Branch name cannot exceed 255 characters.",
  }),
  ifsc_code: Joi.string().length(11).pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/).required().messages({
    "string.empty": "IFSC code is required.",
    "string.length": "IFSC code must be exactly 11 characters long.",
    "string.pattern.base": "IFSC code must be in the format XXXX0YYYYYY, where X is uppercase alphabetic and Y is alphanumeric.",
  }),
  
  
  account_type: Joi.string().valid('Savings', 'Current', 'Fixed Deposit').required().messages({
    "any.only": "Account type must be one of 'Savings', 'Current', or 'Fixed Deposit'.",
    "string.empty": "Account type is required.",
  }),
  branch_address: Joi.string().allow(null, '').max(1000).messages({
    "string.max": "Branch address cannot exceed 1000 characters.",
  }),
});

export default bankSchema;
