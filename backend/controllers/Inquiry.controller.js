import Inquiry from "../models/Inquiry.model.js";
import Joi from "joi";
const currentDate = new Date();
const minDateOfBirth = new Date(
  currentDate.getFullYear() - 50,
  currentDate.getMonth(),
  currentDate.getDate()
); // No more than 50 years ago
const maxDateOfBirth = new Date(
  currentDate.getFullYear() - 10,
  currentDate.getMonth(),
  currentDate.getDate()
); // At least 10 years ago
const inquirySchema = Joi.object({
  name: Joi.string().max(255).required().messages({
    "string.empty": "Name is required.",
    "string.max": "Name cannot exceed 255 characters.",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Invalid email format.",
  }),
  contact_no: Joi.string()
    .pattern(/^[0-9]+$/)
    .max(12)
    .required()
    .messages({
      "string.empty": "Contact number is required.",
      "string.pattern.base": "Invalid contact number (must be numeric).",
      "string.max": "Contact number cannot exceed 12 characters.",
    }),
  alternate_no: Joi.string()
    .pattern(/^[0-9]*$/)
    .max(12)
    .optional()
    .messages({
      "string.empty": "Alternate number is required.",
      "string.pattern.base": "Invalid alternate number (must be numeric).",
      "string.max": "Alternate number cannot exceed 12 characters.",
    }),
    address: Joi.string().max(500).required().messages({
      "string.empty": "Address is required.",
      "string.max": "Address cannot exceed 500 characters.",
    }),
  date_of_birth: Joi.date()
    .min(minDateOfBirth)
    .max(maxDateOfBirth)
    .required()
    .messages({
      "date.base": "Invalid date format for date of birth.",
      "date.min": "Date of birth must be no more than 50 years ago.",
      "date.max": "Date of birth must be at least 10 years ago.",
      "any.required": "Date of birth is required.",
    }),
    interested_country: Joi.string().max(255).required().messages({
      "string.empty": "Interested country is required.",
      "string.max": "Interested country cannot exceed 255 characters.",
    }),
    course_detail: Joi.string().max(255).required().messages({
      "string.empty": "Course detail is required.",
      "string.max": "Course detail cannot exceed 255 characters.",
    }),
    city: Joi.string().max(100).required().messages({
      "string.empty": "City is required.",
      "string.max": "City cannot exceed 100 characters.",
    }),
});

export async function createInquiry(req, res) {
  if (!req.body) {
    return res.status(400).send({
      message: "Content cannot be empty!",
    });
  }

  const { error } = inquirySchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.reduce((acc, err) => {
      acc[err.path.join(".")] = err.message;
      return acc;
    }, {});
    return res.status(400).send({ errors });
  }
  const newInquiry = {
    name: req?.body.name,
    email: req?.body.email,
    contact_no: req?.body.contact_no,
    alternate_no: req?.body.alternate_no,
    address: req?.body.address,
    date_of_birth: req?.body.date_of_birth,
    interested_country: req?.body.interested_country,
    course_detail: req?.body?.course_detail,
    city: req?.body?.city,
  };

  try {
    const added_Inquiry = await Inquiry.create(newInquiry);
    res.send({
      message: "New Inquiry Added !",
      added_Inquiry: added_Inquiry,
      status: "success  ",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
}
export async function getInquiry(req, res) {
  try {
    const result = await Inquiry?.findAll();
    res.send(result);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
}
export async function getByFilter(req, res) {
  try {
    const result = await Inquiry?.findByFields({});
    res.send(result);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
}
export async function deleteInquiry(req, res) {
  try {
    const result = await Inquiry?.deleteByID(req.params.id);
    if (result) {
      res.send({ message: "Inquiry Removed !", status: "success" });
    } else {
      res.send({ message: "Inquiry not removed !", status: "failer" });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
}
export async function updateInquiry(req, res) {
  const { id, created_at, updated_at, date, ...filteredBody } = req.body;
  const { error } = inquirySchema.validate(filteredBody, { abortEarly: false });
  if (error) {
    const errors = error.details.reduce((acc, err) => {
      acc[err.path.join(".")] = err.message;
      return acc;
    }, {});
    return res.status(400).send({ errors });
  }
  try {
    const result = await Inquiry?.updateByID(req?.body, req.params.id);
    res.send({ message: "Inquiry Updated!", status: "success" });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
}
