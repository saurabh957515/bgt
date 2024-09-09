import FeePayment from "../models/FeePayment.model.js";
import { v4 as uuidv4 } from "uuid";
import feePaymentSchema from "../validation/feepayment.js";
import Inquiry from "../models/Inquiry.model.js";
export async function createFeePayment(req, res) {
  if (!req.body) {
    return res.status(400).send({
      message: "Content cannot be empty!",
    });
  }
  const { error, value } = feePaymentSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.reduce((acc, err) => {
      acc[err.path.join(".")] = err.message;
      return acc;
    }, {});
    return res.status(400).send({ errors });
  }
  const newFeePayment = {
    id: uuidv4(),
    current_amount: req?.body?.current_amount,
    remaining_amount: req?.body?.remaining_amount,
    total_amount: req?.body?.total_amount,
    inquiry_id: req?.body?.inquiry_id,
    admission_id: req?.body?.admission_id,
    bank_details_id: req?.body?.bank_details_id,
  };

  try {
    const admissionExists = await FeePayment?.findByFields({
      inquiry_id: newFeePayment?.inquiry_id,
    });

    if (admissionExists?.length > 0) {
      res.status(300).send({
        message: "admission already exists bad request or malfunctioning",
      });
    }

    const result = await FeePayment.create(newFeePayment);

    if (result?.error) {
      res.send({
        message: result?.error,
        status: "Failed",
      });
    } else {
      await Inquiry.deleteByID(req?.body?.inquiry_id);
      res.send({
        message: "Fee Details Added !",
        status: "success",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
}
export async function getFeePaymentDetails(req, res) {
  try {
    const result = await FeePayment?.findAll();
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
    const result = await FeePayment?.findByFields(goodQuery);
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
export async function deleteFeePayment(req, res) {
  try {
    const result = await FeePayment?.deleteByID(req.params.id);
    res.send({ Message: "FeePayment Removed!" });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
}
export async function updateFeePayment(req, res) {
  try {
    const result = await FeePayment?.updateByID(req?.body, req.params.id);
    if (result?.error) {
      res.send({
        message: result?.error,
        status: "Failed",
      });
    } else {
      res.send({ message: "Fee Details Updated!", status: "success" });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }
}
