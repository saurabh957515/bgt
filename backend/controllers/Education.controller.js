import Education from "../models/Education.model.js";
import { v4 as uuidv4 } from "uuid";
import { educationSchema } from "../validation/education.js";
import Inquiry from "../models/Inquiry.model.js";
export async function createEducation(req, res) {
  if (!req.body) {
    return res.status(400).send({
      message: "Content cannot be empty!",
    });
  }
  const { error, value } = educationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.reduce((acc, err) => {
      acc[err.path.join(".")] = err.message;
      return acc;
    }, {});
    return res.status(400).send({ errors });
  }
  const newEducation = {
    id: uuidv4(),
    admission_id: req.body?.admission_id,
    inquiry_id: req?.body?.inquiry_id,
    course_details: req?.body?.course_details,
    city: req?.body?.city,
    state: req?.body?.state ,
    passing_year: req?.body?.passing_year,
    name_of_institute: req?.body?.name_of_institute,
    percentage_cgpa: req?.body?.percentage_cgpa,
    is_employed: req?.body?.is_employed,
    current_company: req?.body?.current_company,
    current_designation: req?.body?.current_designation,
    current_monthly_salary: req?.body?.current_monthly_salary,
    total_experience_years: req?.body?.total_experience_years,
    // past_rejection_country_name: req?.body?.past_rejection_country_name,
    ielts_score: req?.body?.ielts_score,
    business_name: req?.body?.business_name,
    business_type: req?.body?.business_type,
    business_start_date: req?.body?.business_start_date,
    employed_type: req?.body?.employed_type,
    // place_of_birth: req?.body?.place_of_birth,
    // gender: req?.body?.gender,
    // current_nationality: req?.body?.current_nationality,
  };

  try {
    const admissionExists = await Education?.findByFields({
      inquiry_id: newEducation?.inquiry_id,
    });

    if (admissionExists?.length > 0) {
      res.status(300).send({
        message: "admission already exists bad request or malfunctioning",
      });
    }

    const result = await Education.create(newEducation);
    if (result?.error) {
      res.send({
        message: result?.error,
        status: "Failed",
      });
    } else {
      const updateInquiry = await Inquiry.updateProgressCountByID(
        newEducation?.inquiry_id,
        "2"
      );
      res.send({
        message: "education added !",
        status: "success",
        inserted_id: result?.id,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
}
export async function getEducationDetails(req, res) {
  try {
    const result = await Education?.findAll();
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
    const result = await Education?.findByFields(goodQuery);
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
export async function deleteEducation(req, res) {
  try {
    const result = await Education?.deleteByID(req.params.id);
    res.send({ Message: "Inquiry Removed!" });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
}
export async function updateEducation(req, res) {
  try {
    const result = await Education?.updateByID(req?.body, req.params.id);
    if (result?.error) {
      res.send({
        message: result?.error,
        status: "Failed",
      });
    } else {
      res.send({ message: "education updated!", status: "success" });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
}
