import Admission from "../models/Admissions.model.js";
import Joi from "joi";
import Inquiry from "../models/Inquiry.model.js";
import { v4 as uuidv4 } from "uuid";
import { upload } from "../multerConfig.js";
import { saveFile } from "./Files.controller.js";
const currentDate = new Date();
const maxAdmissionDate = new Date();
maxAdmissionDate.setFullYear(currentDate.getFullYear() + 1); // One year in the future
async function saveFileAndGetId(file) {
  const filePath = file.path;
  const fileId = await saveFile({
    fileName: file.filename,
    filePath: filePath,
    mimeType: file.mimetype,
  });
  return fileId;
}
const minAdmissionDate = new Date();
minAdmissionDate.setFullYear(currentDate.getFullYear() - 1);

const minDateOfBirth = new Date(
  currentDate.getFullYear() - 50,
  currentDate.getMonth(),
  currentDate.getDate()
);
const maxDateOfBirth = new Date(
  currentDate.getFullYear() - 10,
  currentDate.getMonth(),
  currentDate.getDate()
);

const admissionSchema = Joi.object({
  inquiry_id: Joi.string().max(36).required().messages({
    "any.required": "Inquiry ID is required.",
  }),
  first_name: Joi.string().max(255).required().messages({
    "string.empty": "First Name is required.",
    "string.max": "Last Name cannot exceed 255 characters.",
  }),
  last_name: Joi.string().max(255).required().messages({
    "string.empty": "Last Name is required.",
    "string.max": "Last Name cannot exceed 255 characters.",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Invalid email format.",
  }),
  zip_code: Joi.string()
    .pattern(/^[0-9]{5,10}$/)
    .required()
    .messages({
      "string.empty": "ZipCode number is required.",
      "string.pattern.base":
        "Invalid ZipCode (must be numeric, between 5 and 10 digits).",
      "string.min": "ZipCode must be at least 5 characters.",
      "string.max": "ZipCode cannot exceed 10 characters.",
    }),
  date_of_admission: Joi.date()
    .max(maxAdmissionDate)
    .min(minAdmissionDate)
    .required()
    .messages({
      "date.base": "Invalid date format for date of admission.",
      "date.min": "Date of admission must be at least one year ago.",
      "date.max":
        "Date of admission cannot be more than one year in the future.",
      "any.required": "Date of admission is required.",
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
  current_city: Joi.string()
    .pattern(/^[a-zA-Z\s]+$/)
    .max(100)
    .required()
    .messages({
      "string.empty": "City is required.",
      "string.base": "City must be a string.",
      "string.pattern.base": "City must contain only alphabetic characters.",
      "string.max": "City cannot exceed 100 characters.",
    }),
  current_state: Joi.string()
    .pattern(/^[a-zA-Z\s]+$/)
    .max(100)
    .required()
    .messages({
      "string.empty": "State is required.",
      "string.base": "State must be a string.",
      "string.pattern.base": "State must contain only alphabetic characters.",
      "string.max": "State cannot exceed 100 characters.",
    }),
  current_nationality: Joi.string().max(100).required().messages({
    "string.empty": "Current Nationality is required.",
    "string.max": "Current Nationality cannot exceed 100 characters.",
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
  gender: Joi.string().valid("male", "female", "others").required().messages({
    "any.only": "Gender must be one of 'male', 'female', or 'others'.",
    "string.empty": "Gender is required.",
  }),
  passport_number: Joi.string().alphanum().min(6).max(15).required().messages({
    "string.empty": "Passport number is required.",
    "string.min": "Passport number must be at least 6 characters long.",
    "string.max": "Passport number must be at most 15 characters long.",
    "string.alphanum": "Passport number must only contain letters and numbers.",
  }),
  passport_expirydate: Joi.date().greater("now").required().messages({
    "date.base": "Passport expiry date must be a valid date.",
    "date.greater": "Passport expiry date must be in the future.",
    "date.empty": "Passport expiry date is required.",
  }),
});

export async function createAdmission(req, res) {
  upload(req, res, async function (err) {
    if (err) {
      console.log(err);

      let errorMessage = "File upload failed";
      const errors = {};
      if (err.message) {
        if (err.message.includes("Only .jpeg and .png images are allowed")) {
          errors["photo_document"] =
            "Invalid image format. Only JPEG and PNG are allowed for photos.";
        } else if (err.message.includes("Only PDF files are allowed")) {
          errors["adharcard_document"] =
            "Invalid document format. Only PDF files are allowed for the adharcard and certification documents.";
        } else if (err.message.includes("File too large")) {
          errors["certification_document"] =
            "File too large. Photos must be less than 500KB, and documents must be less than 2MB.";
        }
      }

      return res.status(400).send({ errors: errors });
    }

    const files = req.files;
    const requiredDocuments = [
      "photo_document",
      "adharcard_document",
      "certification_document",
    ];
    const missingFiles = requiredDocuments.filter(
      (doc) => !files[doc] || files[doc].length === 0
    );

    const {
      photo_document,
      adharcard_document,
      certification_document,
      ...newBody
    } = req?.body;

    const { error } = admissionSchema.validate(newBody, { abortEarly: false });
    let combinedErrors = {};

    // If there are validation errors, combine them into the combinedErrors object
    if (error) {
      const schemaErrors = error.details.reduce((acc, err) => {
        acc[err.path.join(".")] = err.message;
        return acc;
      }, {});

      combinedErrors = { ...combinedErrors, ...schemaErrors }; // Merge schema errors
    }

    // If there are missing files, add those errors to the combinedErrors object
    if (missingFiles.length > 0) {
      const missingFilesObject = missingFiles.reduce((acc, doc) => {
        acc[doc] = `${doc} is required`;
        return acc;
      }, {});

      combinedErrors = { ...combinedErrors, ...missingFilesObject };
    }

    if (Object.keys(combinedErrors).length > 0) {
      return res.status(400).send({
        errors: combinedErrors,
      });
    }
    try {
      const photoDocumentId = await saveFileAndGetId(files.photo_document[0]);
      const adharcardDocumentId = await saveFileAndGetId(
        files.adharcard_document[0]
      );
      const certificationDocumentId = await saveFileAndGetId(
        files.certification_document[0]
      );

      const newAdmission = {
        id: uuidv4(),
        inquiry_id: req.body.inquiry_id,
        email: req.body.email,
        first_name: req?.body?.first_name,
        last_name: req?.body?.last_name,
        contact_no: req.body.contact_no,
        alternate_no: req.body.alternate_no,
        address: req.body.address,
        date_of_birth: req.body.date_of_birth,
        current_city: req.body.current_city,
        telecaller_name: req.body.telecaller_name,
        visa_type: req.body.visa_type,
        date_of_admission: req.body.date_of_admission,
        gender: req.body.gender,
        zip_code: req.body.zip_code,
        current_state: req.body.current_state,
        current_nationality: req.body.current_nationality,
        passport_number: req.body.passport_number,
        passport_expirydate: req.body.passport_expirydate,
        photo_document: photoDocumentId,
        adharcard_document: adharcardDocumentId,
        certification_document: certificationDocumentId,
        fee_status:req.body.fee_status || 'remaining'
      };
      const emailExists = await Admission.findByFields({
        email: newAdmission.email,
      });
      if (emailExists.length > 0) {
        return res
          .status(400)
          .send({ errors: { email: "This Email Already Exists" } });
      }

      const admissionExists = await Admission.findByFields({
        inquiry_id: newAdmission.inquiry_id,
      });
      if (admissionExists.length > 0) {
        return res.status(400).send({
          message: "Admission already exists for this inquiry ID.",
        });
      }
      const result = await Admission.create(newAdmission);
      if (result.error) {
        return res.status(500).send({
          message: result.error,
          status: "Failed",
        });
      }

      await Inquiry.updateProgressCountByID(newAdmission.inquiry_id, "1");

      res.status(200).send({
        message: "Admission completed successfully!",
        status: "success",
        admission_id: newAdmission.id,
      });
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "An error occurred while creating the admission.",
      });
    }
  });
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
export async function getAllDetails(req, res) {
  const { order, ...goodQuery } = req?.query;

  try {
    const result = await Admission?.getAllDetails(goodQuery, order);
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
