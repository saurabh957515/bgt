import University from "../models/University.model.js";
import { v4 as uuidv4 } from "uuid";
import universitySchema from "../validation/universtity.js";
export async function createUniversity(req, res) {
  if (!req.body) {
    return res.status(400).send({
      message: "Content cannot be empty!",
    });
  }
  const { error, value } = universitySchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.reduce((acc, err) => {
      acc[err.path.join(".")] = err.message;
      return acc;
    }, {});
    return res.status(400).send({ errors });
  }
  const newUniversity = {
    id: uuidv4(),
    institute_name: req?.body?.institute_name,
    country: req?.body?.country,
    course_detail: req?.body?.course_detail,
    city: req?.body?.city,
    stay_in_type: req?.body?.stay_in_type,
    stay_in_address: req?.body?.stay_in_address,
    inquiry_id: req?.body?.inquiry_id,
    admission_id: req?.body?.admission_id,
  };

  try {

    const admissionExists = await University?.findByFields({
      inquiry_id: newUniversity?.inquiry_id,
    });

    if (admissionExists?.length > 0) {
      res.status(300).send({
        message: "admission already exists bad request or malfunctioning",
      });
    }


    const result = await University.create(newUniversity);
    if (result?.error) {
      res.send({
        message: result?.error,
        status: "Failed",
      });
    } else {
      res.send({
        message: "University Added !",
        status: "success",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
}
export async function getUniversityDetails(req, res) {
  try {
    const result = await University?.findAll();
    res.send(result);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
}
export async function getByFilter(req, res) {
  try {
    const result = await University?.findByFields({});
    if (result?.error) {
      res.send({
        message: result?.error,
        status: "Failed",
      });
    } else {
      res.send(result);
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
}
export async function deleteUniversity(req, res) {
  try {
    const result = await University?.deleteByID(req.params.id);
    res.send({ Message: "Inquiry Removed!" });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
}
export async function updateUniversity(req, res) {
  try {
    const result = await University?.updateByID(req?.body, req.params.id);
    if (result?.error) {
      res.send({
        message: result?.error,
        status: "Failed",
      });
    } else {
      res.send({ message: "University Updated!", status: "success" });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
}
