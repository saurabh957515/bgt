import Inquiry from "../models/Inquiry.model.js";
export async function createInquiry(req, res) {
  if (!req.body) {
    return res.status(400).send({
      message: "Content cannot be empty!",
    });
  }

  const newInquiry = {
    name: req?.body.name,
    email: req?.body.email,
    contact_no: req?.body.contact_no,
    alternate_no: req?.body.alternate_no,
    address: req?.body.address,
    date_of_birth: req?.body.date_of_birth,
  };

  try {
    const result = await Inquiry.create(newInquiry);
    res.send(result);
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
    res.send({ Message: "Inquiry Removed!" });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
}
export async function updateInquiry(req, res) {
  try {
    const result = await Inquiry?.updateByID(req?.body, req.params.id);
    console.log(result);
    res.send({ Message: "Inquiry Removed!" });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
}
