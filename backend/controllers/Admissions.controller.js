import Admission from "../models/Admissions.model.js";
import Joi from "joi";
import { v4 as uuidv4 } from "uuid";
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

const admissionSchema = Joi.object({
  inquiry_id: Joi.string().max(36).required().messages({
    "any.required": "Inquiry ID is required.",
  }),
  name: Joi.string().max(255).required().messages({
    "string.empty": "Name is required.",
    "string.max": "Name cannot exceed 255 characters.",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Invalid email format.",
  }),
  contact_no: Joi.string()
    .pattern(/^[0-9]+$/) // Ensure only digits
    .max(12)
    .required()
    .messages({
      "string.empty": "Contact number is required.",
      "string.pattern.base": "Invalid contact number (must be numeric).",
      "string.max": "Contact number cannot exceed 12 characters.",
    }),
  alternate_no: Joi.string()
    .pattern(/^[0-9]*$/) // Ensure only digits or empty
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
  current_city: Joi.string().max(100).required().messages({
    "string.empty": "City is required.",
    "string.max": "City cannot exceed 100 characters.",
  }),
  telecaller_name: Joi.string().max(255).required().messages({
    "string.empty": "Telecaller name is required.",
    "string.max": "Telecaller name cannot exceed 255 characters.",
  }),
  visa_type: Joi.string()
    .valid(
      "Tourist Visa",
      "Student Visa",
      "Work Visa",
      "Employment Visa",
      "Business Visa",
      "Project Visa",
      "Research Visa",
      "Transit Visa",
      "Conference Visa",
      "Medical Visa"
    )
    .required()
    .messages({
      "any.only": "Visa type must be one of the specified options.",
      "string.empty": "Visa type is required.",
    }),
});

export async function createAdmission(req, res) {
  if (!req.body) {
    return res.status(400).send({
      message: "Content cannot be empty!",
    });
  }
  const { error } = admissionSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.reduce((acc, err) => {
      acc[err.path.join(".")] = err.message;
      return acc;
    }, {});
    return res.status(400).send({ errors });
  }

  const newAdmission = {
    id: uuidv4(),
    inquiry_id: req?.body?.inquiry_id,
    name: req?.body.name,
    email: req?.body.email,
    contact_no: req?.body.contact_no,
    alternate_no: req?.body.alternate_no,
    address: req?.body.address,
    date_of_birth: req?.body.date_of_birth,
    current_city: req?.body?.current_city,
    telecaller_name: req?.body?.telecaller_name,
    visa_type: req?.body?.visa_type,
  };

  try {
    const admissionExists = await Admission?.findByFields({
      inquiry_id: newAdmission?.inquiry_id,
    });

    if (admissionExists?.length > 0) {
      res.status(300).send({
        message: "admission already exists bad request or malfunctioning",
      });
    }

    const result = await Admission.create(newAdmission);

    if (result?.error) {
      res.send({
        message: result?.error,
        status: "Failed",
      });
    } else {
      res.send({
        message: "admission completed !",
        status: "success",
        admission_id: newAdmission?.id,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
}
export async function getAdmissionDetail(req, res) {
  try {
    const result = await Admission?.findAll();
    res.send(result);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
}

export async function getByFilter(req, res) {
  const { order, ...goodQuery } = req?.query;
  try {
    const result = await Admission?.findByFields(goodQuery, order);
    res.send(result);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
}

export async function deleteAdmission(req, res) {
  try {
    const result = await Admission?.deleteByID(req.params.id);
    res.send({ message: "Admission Removed!", status: "success" });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
}

export async function updateAdmission(req, res) {
  try {
    const result = await Admission?.updateByID(req?.body, req.params.id);

    if (result?.error) {
      res.send({
        message: result?.error,
        status: "Failed",
      });
    } else {
      res.send({ message: "Admission Details updated !", status: "success" });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
}
