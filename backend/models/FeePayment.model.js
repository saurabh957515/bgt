import sql from "../db/queryExecution.js";
import { v4 as uuidv4 } from "uuid";
class FeePayment {
  static async create(newFee) {
    try {
      const result = await sql("INSERT INTO fee_details SET ?", newFee);
      const updated_history = await sql(
        "INSERT INTO fee_update_history SET ?",
        {
          fee_details_id: newFee?.id,
          id: uuidv4(),
          amount: newFee?.current_amount,
        }
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    try {
      const query = `SELECT * FROM fee_details`;
      const result = await sql(query);
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async deleteByID(id) {
    try {
      const query = `DELETE FROM fee_details WHERE id = ?`;
      const result = await sql(query, [id]);
      return result?.afectedRows !== 0;
    } catch (error) {
      throw error;
    }
  }
  static async updateByID(newFee, id) {
    try {
      const query = `
        UPDATE fee_details 
        SET current_amount = ?, remaining_amount = ?, total_amount = ?
        WHERE id = ?
      `;
      const { current_amount, remaining_amount, total_amount } = newFee;
      const result = await sql(query, [
        current_amount,
        remaining_amount,
        total_amount,
        id,
      ]);
      const updated_history = await sql(
        "INSERT INTO fee_update_history SET ?",
        { fee_details_id: id, id: uuidv4(), amount: current_amount }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async findByFields(fields, sortDirection = "DESC") {
    try {
      const conditions = [];
      const values = [];
      const validSortDirections = ["ASC", "DESC"];
      const direction = validSortDirections.includes(
        sortDirection.toUpperCase()
      )
        ? sortDirection.toUpperCase()
        : "DESC";

      if (fields) {
        if (Object?.keys(fields)) {
          for (const [field, value] of Object.entries(fields)) {
            if (value !== undefined && value !== null) {
              conditions.push(`${field} LIKE ?`);
              values.push(`%${value}%`);
            }
          }
        }
      }

      const query = `
        SELECT * FROM fee_details 
        ${conditions.length ? "WHERE " + conditions.join(" AND ") : ""}
        ORDER BY created_at ${direction}
      `;
      const result = await sql(query, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getEnum(table, column) {
    try {
      const query = `
        SELECT COLUMN_TYPE 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_NAME = ? 
        AND TABLE_SCHEMA = ? 
        AND COLUMN_NAME = ?`;

      const [result] = await sql(query, [table, "states", column]);

      if (!result.COLUMN_TYPE) {
        throw new Error("Column not found or it is not of ENUM type");
      }

      // Extract ENUM values from the result
      const enumValues = result["COLUMN_TYPE"]
        .match(/enum\((.*)\)/)[1]
        .split(",")
        .map((value) => value.replace(/'/g, ""));

      return enumValues;
    } catch (error) {
      throw error;
    }
  }
}
export default FeePayment;
