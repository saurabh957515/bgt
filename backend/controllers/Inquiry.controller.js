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
  try {
    const result = await Inquiry?.updateByID(req?.body, req.params.id);
    res.send({ message: "Inquiry Updated!" ,status:"success" });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
}
