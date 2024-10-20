import Bank from "../models/Bank.model.js";
import { v4 as uuidv4 } from "uuid";
import bankSchema from "../validation/bankdetails.js";
export async function createBank(req, res) {
  if (!req.body) {
    return res.status(400).send({
      message: "Content cannot be empty!",
    });
  }
  const { error, value } = bankSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.reduce((acc, err) => {
      acc[err.path.join(".")] = err.message;
      return acc;
    }, {});
    return res.status(400).send({ errors });
  }
  const newBank = {
    id: uuidv4(),
    account_holder_name: req?.body.account_holder_name,
    account_number: req?.body.account_number,
    bank_name: req?.body.bank_name,
    branch_name: req?.body.branch_name,
    ifsc_code: req?.body.ifsc_code,
    account_type: req?.body.account_type,
    branch_address: req?.body.branch_address,
  };

  try {
    const added_Bank = await Bank.create(newBank);
    res.send({
      message: "New Bank Added !",
      added_Bank: added_Bank,
      status: "success  ",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Bank",
    });
  }
}
export async function getBank(req, res) {
  try {
    const result = await Bank?.findAll();
    res.send(result);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while getting Bank.",
    });
  }
}
export async function getByFilter(req, res) {
  const { order, ...goodQuery } = req?.query; 
  let newQuery=goodQuery?.first_name ? {account_holder_name:goodQuery?.first_name,created_at:goodQuery?.date}:{created_at:goodQuery?.date}
  try {
    const result = await Bank?.findByFields(newQuery,order);
    res.send(result);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while filtering bank",
    });
  }
}
export async function deleteBank(req, res) {
  try {
    const result = await Bank?.deleteByID(req.params.id);
    if (result) {
      res.send({ message: "Bank Removed !", status: "success" });
    } else {
      res.send({ message: "Bank not removed !", status: "failer" });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
}
export async function updateBank(req, res) {
  const { id, created_at, updated_at, micr_code, ...filteredBody } = req.body;
  const { error, value } = bankSchema.validate(filteredBody, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.reduce((acc, err) => {
      acc[err.path.join(".")] = err.message;
      return acc;
    }, {});
    return res.status(400).send({ errors });
  }

  try {
    const result = await Bank?.updateByID(req?.body, req.params.id);
    res.send({ message: "Bank Updated!", status: "success" });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
}

export async function getBankTypes(req, res) {
  try {
    res.send({
      Savings: "Savings",
      Current: "Current",
      "Fixed Deposit": "Fixed Deposit",
      "Recurring Deposit": "Recurring Deposit",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while sending bank types.",
    });
  }
}
