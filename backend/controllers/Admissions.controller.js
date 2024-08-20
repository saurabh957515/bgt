import Admission from "../models/Admissions.model.js";
export async function createAdmission(req, res) {
  if (!req.body) {
    return res.status(400).send({
      message: "Content cannot be empty!",
    });
  }
  const newAdmission = {
    name: req?.body.name,
    email: req?.body.email,
    contact_no: req?.body.contact_no,
    alternate_no: req?.body.alternate_no,
    address: req?.body.address,
    date_of_birth: req?.body.date_of_birth,
    is_acknowledged: req?.body?.is_acknowledged,
  };

  try {
    const result = await Admission.create(newAdmission);
    res.send({
      message: "admission completed !",
      status: "success",
      admission_id: result?.id,
    });
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
  try {
    const result = await Admission?.findByFields({});
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
    res.send({ message: "Admission Details updated !", status: "success" });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
}
