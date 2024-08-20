import Education from "../models/Education.model.js";
export async function createEducation(req, res) {
  if (!req.body) {
    return res.status(400).send({
      message: "Content cannot be empty!",
    });
  }
  const newAdmission = {
    admission_id: req.body?.admission_id,
    highest_qualification: req?.body?.highest_qualification,
    passing_year: req?.body?.passing_year,
    name_of_institute: req?.body?.name_of_institute,
    percentage_cgpa: req?.body?.percentage_cgpa,
    is_employed: req?.body?.is_employed,
    current_company: req?.body?.current_company,
    current_designation: req?.body?.current_designation,
    current_monthly_salary: req?.body?.current_monthly_salary,
    total_experience_years: req?.body?.total_experience_years,
    country_interested: req?.body?.country_interested,
    visa_type: req?.body?.visa_type,
    past_rejection_country_name: req?.body?.past_rejection_country_name,
    ielts_score: req?.body?.ielts_score,
    telecaller_name: req?.body?.telecaller_name,
  };

  try {
    const result = await Education.create(newAdmission);
    res.send({
      message: "education added !",
      status: "success",
      inserted_id: result?.id,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
}
export async function getEducationDetails(req, res) {
  try {
    const result = await Education?.findAll();
    console.log("hello result");

    res.send(result);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
}
export async function getByFilter(req, res) {
  try {
    const result = await Education?.findByFields({});
    res.send(result);
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
    res.send({ message: "education updated!", staus: "success" });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
}
